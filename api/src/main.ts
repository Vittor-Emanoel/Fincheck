import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import "dotenv/config";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: "https://fincheck-cloud.vercel.app/",
  });

  await app.listen(3333);
}
bootstrap();
