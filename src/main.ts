import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config  = new DocumentBuilder()
  .setTitle('Library API')
  .setDescription('an API documantation that have all the possible responses')
  .addBearerAuth()
  .build()

  const Document = SwaggerModule.createDocument(app,config)

  SwaggerModule.setup('api', app, Document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
