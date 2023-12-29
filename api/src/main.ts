import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import "dotenv/config";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: "*",
  });

  const port = await app.listen(process.env.PORT, "0.0.0.0");

  console.log(port);
}
bootstrap();
