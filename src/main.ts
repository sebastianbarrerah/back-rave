import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import { AppModule } from "./app.module"
import * as helmet from "helmet"
import {} from "helmet" 
import * as compression from "compression"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Configuración global de pipes para validación
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  // Middleware de seguridad
  // app.use(helmet())

  // Compresión de respuestas
  app.use(compression())

  // Configuración de CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle("Sistema de Facturación API")
    .setDescription("API para el sistema de facturación electrónica")
    .setVersion("1.0")
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api/docs", app, document)

  // Prefijo global para todas las rutas
  app.setGlobalPrefix("api")

  await app.listen(process.env.PORT || 3001)
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
