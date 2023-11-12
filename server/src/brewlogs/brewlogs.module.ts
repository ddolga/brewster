import { Module } from '@nestjs/common';
import { BrewlogsService } from './brewlogs.service';
import { BrewlogsController } from './brewlogs.controller';
import {MongoModule} from "../mongo/mongo.module";

@Module({
  imports:[MongoModule],
  controllers: [BrewlogsController],
  providers: [BrewlogsService],
})
export class BrewlogsModule {}
