import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { signinInput, signupInput } from "@__rkg__/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Invalid inputs",
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.create({
      data: {
        username: body.username,
        name: body.name,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.text("Invalid");
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
    return c.text("Invalid");
  }
});

userRouter.post("/signin", async (c) => {
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Invalid inputs",
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: body.username,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403);
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
    c.status(411);
    return c.text("Invalid credentials");
  }
});

userRouter.post("/logout", async (c) => {
  const authHeader = c.req.header("authorization");
  console.log("authHeader", authHeader);
  try {
    const user = await verify(authHeader || "", c.env.JWT_SECRET);
    if (!user) {
      c.status(403);
      return c.text("Invalid credentials");
    }
    c.status(200);
    return c.text("Logged out successfully");
  } catch (error) {
    c.status(403);
    return c.text("You are not logged in");
  }
});
