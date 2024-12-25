import cors from "cors";
import express from "express";

import { env } from "@/config/environment";
import { pino } from "pino";
import { graphqlRouter } from "@/graphql/route";

import type { Express, Request, Response } from "express";

const logger = pino({ name: "server start" });
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN }));

app.use("/", graphqlRouter);

export { app, logger };
