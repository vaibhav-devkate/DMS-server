import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Median')
  .setDescription('The Median API description')
  .setVersion('0.1')
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

app.enableCors({
  origin: 'http://localhost:3000',
});



  await app.listen(8000);
}
bootstrap();