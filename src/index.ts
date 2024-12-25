import { env } from "@/config/environment";
import { app, logger } from "@/server";

import db from "@/db";

const server = app.listen(env.PORT, () => {
  const { NODE_ENV, PORT } = env;
  logger.info(`Server (${NODE_ENV}) running on port: ${PORT} `);
});

const onCloseSignal = () => {
  logger.info("sigint received, shutting down");
  server.close(() => {
    logger.info("server closed");
    db.close();
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref();
};

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
