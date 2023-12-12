import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {BrewlogsModule} from './brewlogs/brewlogs.module';
import {MongoModule} from "./mongo/mongo.module";
import {ConfigModule} from "@nestjs/config";
import { StuffsModule } from './stuffs/stuffs.module';

@Module({
    imports: [BrewlogsModule, StuffsModule, MongoModule, ConfigModule.forRoot({isGlobal: true}), StuffsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
