import mongoose from "mongoose";

import { logger } from "@/server";
import { env } from "@/config/environment";

mongoose.connect(env.DB_URL);
const dbConnection = mongoose.connection;

dbConnection.once("connected", () => {
  logger.info("MongoDB Connection established.");
});

dbConnection.on("error", (err: Error) => {
  logger.error(`Mongoose connection error: ${err}`);
});

export default dbConnection;
