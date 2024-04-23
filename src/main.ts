import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ exposedHeaders: ["x-access-token"], credentials: true });
  app.use(graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  await app.listen(3000);
}
bootstrap();
