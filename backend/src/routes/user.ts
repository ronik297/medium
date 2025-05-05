import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { signinInput, signupInput } from "@__rkg__/medium-common";
import bcrypt from "bcryptjs";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();
  const { success, data } = signupInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ message: "Invalid inputs" });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        username: data.username,
        name: data.name,
        password: hashedPassword,
      },
    });

    if (!user) {
      c.status(403);
      return c.text("Error creating user");
    }

    const jwt = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );

    return c.text(jwt);
  } catch (error) {
    console.log("error", error);
    c.status(500);
    return c.json({
      message: "Internal server error. Please try again later.",
    });
  }
});

userRouter.post("/signin", async (c) => {
  const body = await c.req.json();
  const { success, data } = signinInput.safeParse(body);

  if (!success) {
    c.status(400);
    return c.json({ message: "Invalid inputs" });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.findUnique({
      where: { username: data.username },
    });

    if (!user) {
      c.status(401);
      return c.text("Invalid credentials");
    }

    const isPasswordCorrect = await bcrypt.compare(
      data.password,
      user.password
    );

    if (!isPasswordCorrect) {
      c.status(401);
      return c.text("Invalid credentials");
    }

    const jwt = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );

    return c.text(jwt);
  } catch (error) {
    console.log("error", error);
    c.status(500);
    return c.json({
      message: "Internal server error. Please try again later.",
    });
  }
});

userRouter.post("/logout", async (c) => {
  const authHeader = c.req.header("authorization");
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : "";

  try {
    const user = await verify(token, c.env.JWT_SECRET);
    if (!user) {
      c.status(401);
      return c.text("Invalid credentials");
    }
    c.status(200);
    return c.text("Logged out successfully");
  } catch (error) {
    c.status(401);
    return c.text("Error logging out: " + error);
  }
});

userRouter.get("/me", async (c) => {
  const authHeader = c.req.header("authorization");
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : "";

  try {
    const isAuthenticated = await verify(token, c.env.JWT_SECRET);

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const user = await prisma.user.findUnique({
      where: { id: Number(isAuthenticated.id) },
      select: { username: true, name: true },
    });

    if (!user) {
      c.status(404);
      return c.text("User not found");
    }

    return c.json(user);
  } catch (error) {
    c.status(401);
    return c.text("Invalid or expired token");
  }
});

userRouter.put("/setting", async (c) => {
  const authHeader = c.req.header("authorization");
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : "";

  try {
    const isAuthenticated = await verify(token, c.env.JWT_SECRET);
    const body = await c.req.json();
    const { success, data } = signupInput.safeParse(body);

    if (!success) {
      c.status(400);
      return c.json({ message: "All fields are required" });
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const existingUser = await prisma.user.findUnique({
      where: { username: data.username },
    });

    if (existingUser && existingUser.id !== Number(isAuthenticated.id)) {
      c.status(409); // Conflict
      return c.text("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const updatedUser = await prisma.user.update({
      where: { id: Number(isAuthenticated.id) },
      data: {
        username: data.username,
        name: data.name,
        password: hashedPassword,
      },
    });

    return c.json({
      user: updatedUser,
      message: "User data updated successfully",
    });
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.text("Error updating user data");
  }
});

userRouter.delete("/delete", async (c) => {
  const authHeader = c.req.header("authorization");
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : "";
  try {
    const isAuthenticated = await verify(token, c.env.JWT_SECRET);
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    await prisma.user.delete({
      where: { id: Number(isAuthenticated.id) },
    });

    return c.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.text("Error deleting user");
  }
});
