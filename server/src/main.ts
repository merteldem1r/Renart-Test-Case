import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { useContainer } from "class-validator";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  app.setGlobalPrefix("api/v1");

  const corsOrigins = process.env.CORS_ORIGIN?.split(",") || [
    "https://renart-test-case.vercel.app",
    "http://localhost:3000",
    "http://localhost:5173",
  ];

  const corsConfig = {
    origin: process.env.NODE_ENV === "development" ? true : corsOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Accept",
      "Accept-Language",
      "Content-Type",
      "Authorization",
      "X-Request-Time",
      "X-CSRF-TOKEN",
      "X-Environment",
    ],
    exposedHeaders: ["Content-Length", "Content-Type"],
    maxAge: 600,
  };

  console.log("CORS Configuration:", {
    environment: process.env.NODE_ENV,
    origins: corsConfig.origin,
    corsOriginEnv: process.env.CORS_ORIGIN,
  });

  await app.register(cors, corsConfig);
  await app.register(helmet);
  await app.register(rateLimit, {
    max: 300,
    timeWindow: "1 minute",
    allowList: (req) => req.raw.method === "OPTIONS",
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: false,
      disableErrorMessages: process.env.NODE_ENV === "production",
    }),
  );

  if (process.env.NODE_ENV === "development") {
    const config = new DocumentBuilder()
      .setTitle("API Documentation")
      .setDescription("API description")
      .setVersion("1.0")
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("doc", app, document);
  }

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen({ port: Number(process.env.PORT) || 3000, host: "0.0.0.0" });
}

bootstrap();
