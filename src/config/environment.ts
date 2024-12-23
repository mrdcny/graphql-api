import dotenv from "dotenv";
import { cleanEnv, port, str, testOnly } from "envalid";

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ devDefault: testOnly("test"), choices: ["development", "production", "test"] }),
  PORT: port({ devDefault: testOnly(8080) }),
  CORS_ORIGIN: str({ devDefault: testOnly("http://localhost:8080") }),
  DB_URL: str(),
  JWT_SECRET_KEY: str(),
  INFURA_ENDPOINT: str(),
});
