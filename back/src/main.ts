import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(
      { 'origin':'http://localhost:80' }
    );
    
  const config = new DocumentBuilder()
  .setTitle('Gestion des Associations')
  .setDescription('Descriptions des APIs de la gestion des associations')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'mail',
      queueOptions: {
        durable: false
      },
    },
  });
  await app.listen(3000);
  app.use(helmet());
}
bootstrap();