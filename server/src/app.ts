import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveEmojiFavicon } from "stoker/middlewares";
import { pinoLogger } from "@/middlewares/pino-logger";
import authorsApp from "@/routes/authors/authors";

const booksApp = new Hono()
  .get("/", (c) => c.json({ result: "list books" }))
  .post("/", (c) => c.json({ result: "create a book" }, 201))
  .get("/:id", (c) => c.json({ result: `get ${c.req.param("id")}` }));

const mainRoute = new Hono().get("/", (c) => c.text("HELLO NODE JS"));
const app = new Hono()
  .use(
    "*",
    cors({
      origin: "http://localhost:5173", // Allow your frontend's origin
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
      allowHeaders: ["Content-Type", "Authorization"], // Allowed headers
      exposeHeaders: ["Content-Length"], // Expose headers to client
      credentials: true, // Allow credentials (cookies, authorization headers)
    })
  )
  .use(serveEmojiFavicon("📝"))
  .use(pinoLogger());

const routes = app
  .route("/", mainRoute)
  .route("/books", booksApp)
  .route("/authors", authorsApp);

// .route("/", mainRoute)
// .route("/authors", authorsApp)
// // .route("/books", booksApp)
// .notFound(notFound)
// .onError(onError);

export type AppType = typeof routes;

export default app;

// import configureOpenAPI from "@/lib/configure-open-api";
// import createApp from "@/lib/create-app";
// import index from "@/routes/index.route";
// import tasks from "@/routes/tasks/tasks.index";

// const app = createApp();

// configureOpenAPI(app);

// const routes = [index, tasks] as const;

// routes.forEach((route) => {
//   app.route("/", route);
// });

// export type AppType = (typeof routes)[number];

// export default app;
