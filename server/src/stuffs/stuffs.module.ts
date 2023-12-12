import { Module } from '@nestjs/common';
import { StuffsService } from './stuffs.service';
import { StuffsController } from './stuffs.controller';
import {MongoModule} from "../mongo/mongo.module";

@Module({
  imports:[MongoModule],
  controllers: [StuffsController],
  providers: [StuffsService],
})
export class StuffsModule {}
