import { env } from "@/common/utils/config";
import { app, logger } from "@/server";
import mongoose from "mongoose";

mongoose.connect(env.DB_URL);
const dbConnection = mongoose.connection;

dbConnection.once("connected", () => {
  logger.info(`Mongoose connection established to ${env.DB_URL}`); //TODO: Update logger to exclude actual DB URL
});

dbConnection.on("error", (err: Error) => {
  logger.error(`Mongoose connection error: ${err}`);
});

const server = app.listen(env.PORT, () => {
  const { NODE_ENV, HOST, PORT } = env;
  logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
});

const onCloseSignal = () => {
  logger.info("sigint received, shutting down");
  server.close(() => {
    logger.info("server closed");
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
};

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
