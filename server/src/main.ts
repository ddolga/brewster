import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {patchNestJsSwagger} from "nestjs-zod";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    patchNestJsSwagger();

    const config = new DocumentBuilder()
        .setTitle('Brewster')
        .setDescription('Brewster REST API')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app,config);
    SwaggerModule.setup('api',app,document);


    await app.listen(3000);
}

bootstrap();
