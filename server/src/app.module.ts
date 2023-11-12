import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {BrewlogsModule} from './brewlogs/brewlogs.module';
import {EquipmentModule} from './equipment/equipment.module';
import {MongoModule} from "./mongo/mongo.module";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [BrewlogsModule, EquipmentModule, MongoModule, ConfigModule.forRoot({isGlobal: true})],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
