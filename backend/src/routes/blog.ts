import { createBlogInput } from "@__rkg__/medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization");
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : "";
  try {
    const user = await verify(token, c.env.JWT_SECRET);
    c.set("userId", user.id as string);
    await next();
  } catch (error) {
    c.status(401);
    return c.json({
      message: "Unauthorized: Please login first",
    });
  }
});

blogRouter.post("/", async (c) => {
  const body = await c.req.json();
  const authorId = c.get("userId");

  const { success, data } = createBlogInput.safeParse(body);

  if (!success) {
    c.status(400);
    return c.json({ message: "Title and content are required" });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.create({
      data: {
        title: data.title,
        content: data.content,
        authorId: Number(authorId),
      },
    });

    return c.json({ id: blog.id });
  } catch (error) {
    console.error("Error creating blog:", error);
    c.status(500);
    return c.json({ message: "Failed to create blog post" });
  }
});

blogRouter.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();

  const { success, data } = createBlogInput.safeParse(body);

  if (!success) {
    c.status(400);
    return c.json({ message: "Title and content are required" });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.update({
      where: {
        id: Number(id),
      },
      data: {
        title: data.title,
        content: data.content,
      },
    });

    return c.json({ id: blog.id });
  } catch (error) {
    console.error("Error updating blog:", error);
    c.status(404);
    return c.json({ message: "Blog post not found or update failed" });
  }
});

blogRouter.delete("/:id", async (c) => {
  const id = c.req.param("id");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    await prisma.blog.delete({
      where: {
        id: Number(id),
      },
    });

    return c.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    c.status(404);
    return c.json({ message: "Blog post not found or could not be deleted" });
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.blog.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        createdAt: true,
        author: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    return c.json({ blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    c.status(500);
    return c.json({ message: "Failed to fetch blog posts" });
  }
});

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        content: true,
        title: true,
        createdAt: true,
        author: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    if (!blog) {
      c.status(404);
      return c.json({ message: "Blog post not found" });
    }

    return c.json({ blog });
  } catch (error) {
    console.error("Error fetching blog:", error);
    c.status(500);
    return c.json({ message: "Error fetching blog post" });
  }
});
