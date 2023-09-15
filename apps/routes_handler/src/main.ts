import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as YAML from 'json-to-pretty-yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Institution')
    .setDescription('The Institution API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('./oepnapi.json', JSON.stringify(document));

  const data = YAML.stringify(document);
  fs.writeFile('openapi.yaml', data, (err) => {
    if (err) console.log(err);
    else {
      console.log('swagger.yaml file has been updated successfully\n');
    }
  });
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
