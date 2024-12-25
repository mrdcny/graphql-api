import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import expressPlayground from "graphql-playground-middleware-express";
import resolvers from "@/graphql/resolvers";
import schema from "@/graphql/schema/schema";

import type { Router, Request, Response } from "express";

export const graphqlRouter: Router = express.Router();

graphqlRouter.get("/playground", expressPlayground({ endpoint: "/graphql" }));

graphqlRouter.use(
  "/graphql",
  createHandler({
    schema,
    rootValue: resolvers,
    context: (req: Request, res: Response): any => ({
      token: req.headers.authorization || "",
    }),
  }),
);
