import { Module } from '@nestjs/common';
import { StuffsService } from './stuffs.service';
import { StuffsController } from './stuffs.controller';
import {MongoModule} from "../mongo/mongo.module";
import {SelectController} from "./select.controller";
import {SelectService} from "./select.service";

@Module({
  imports:[MongoModule],
  controllers: [StuffsController,SelectController],
  providers: [StuffsService,SelectService],
})
export class StuffsModule {}
