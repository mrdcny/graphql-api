import cors from "cors";
import express from "express";
import expressPlayground from "graphql-playground-middleware-express";
import resolvers from "@/graphql/resolvers";
import schema from "@/graphql/schema/schema";

import { env } from "@/config/environment";
import { pino } from "pino";
import { createHandler } from "graphql-http/lib/use/express";

import type { Express, Request, Response } from "express";

const logger = pino({ name: "server start" });
const app: Express = express();

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
