import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import "dotenv/config";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3333);
}
bootstrap();
