import cors from "cors";
import express, { type Express } from "express";
import { pino } from "pino";
import { env } from "@/common/utils/config";
import schema from "@/schema";
import resolvers from "@/resolvers/resolver";

const logger = pino({ name: "server start" });
const app: Express = express();

import { createHandler } from "graphql-http/lib/use/express";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN }));

app.use(
  "/graphql",
  createHandler({
    schema,
    rootValue: resolvers,
    context: (req: any, res: any): any => ({
      token: req.headers.authorization || "",
    }),
  }),
);

export { app, logger };

/**
 * TODO:
 * 1. Add Authentication on GraphQL Queries & Mutation == > DONE
 * 2. Axie Smart Contract Interaction ==> DONE
 * 3. Add user validation on authentication
 * 4. Interfaces and types for data handling
 * 5. Initialize GIT
 * 6. README
 *
 */
