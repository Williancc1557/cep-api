import { logger } from "../utils/pino";
import env from "./config/env";

const bootstrap = async () => {
  const app = (await import("./config/app")).default;
  app.listen(env.port, () =>
    logger.info(`Server started with http://localhost:${env.port}`)
  );
};

bootstrap().then(() => {
  logger.info("api made by willian");
});
