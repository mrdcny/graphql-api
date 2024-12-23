import cors from "cors";
import express from "express";
import type { Express, Request, Response } from "express";
import { pino } from "pino";
import { env } from "@/common/utils/config";
import schema from "@/schema";
import resolvers from "@/resolvers/resolver";

const logger = pino({ name: "server start" });
const app: Express = express();

import { createHandler } from "graphql-http/lib/use/express";
import expressPlayground from "graphql-playground-middleware-express";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN }));

app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

app.use(
  "/graphql",
  createHandler({
    schema,
    rootValue: resolvers,
    context: (req: Request, res: Response): any => ({
      token: req.headers.authorization || "",
    }),
  }),
);

export { app, logger };
