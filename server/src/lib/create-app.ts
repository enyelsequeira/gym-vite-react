import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";
import { defaultHook } from "stoker/openapi";

import type { AppBindings, AppOpenAPI } from "@/lib/types";
import { pinoLogger } from "@/middlewares/pino-logger";
import { cors } from "hono/cors";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  });
}

export default function createApp() {
  const app = createRouter();
  app.use(serveEmojiFavicon("📝"));
  app.use();
  app.use(
    "/*",
    cors({
      origin: ["http://localhost:5173"], // Allow your frontend origin
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
      allowHeaders: ["Content-Type", "Authorization"], // Allowed headers
      exposeHeaders: ["Content-Length"], // Headers that can be exposed to the client
      maxAge: 600, // How long the results of a preflight request can be cached in seconds
      credentials: true, // Allow cookies to be sent with requests
    })
  );

  app.notFound(notFound);
  app.onError(onError);
  return app;
}

export function createTestApp<R extends AppOpenAPI>(router: R) {
  return createApp().route("/", router);
}
