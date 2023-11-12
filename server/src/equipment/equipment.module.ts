import { Module } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentController } from './equipment.controller';
import {MongoModule} from "../mongo/mongo.module";

@Module({
  imports:[MongoModule],
  controllers: [EquipmentController],
  providers: [EquipmentService]
})
export class EquipmentModule {}
