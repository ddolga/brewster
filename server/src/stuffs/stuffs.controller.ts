import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StuffsService } from './stuffs.service';
import { CreateStuffDto } from './dto/create-stuff.dto';
import { UpdateStuffDto } from './dto/update-stuff.dto';
import {ApiTags} from "@nestjs/swagger";

@ApiTags("stuffs")
@Controller('stuffs')
export class StuffsController {
  constructor(private readonly stuffsService: StuffsService) {}


  @Get()
  findAll() {
    return this.stuffsService.findAll();
  }

  @Get('sample')
  sampleData(){
    return this.stuffsService.sampleData();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stuffsService.findOne(id);
  }

  @Post()
  create(@Body() createStuffDto: CreateStuffDto) {
    return this.stuffsService.create(createStuffDto);
  }

  @Patch()
  update(@Body() updateStuffDto: UpdateStuffDto) {
    return this.stuffsService.update(updateStuffDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stuffsService.remove(id);
  }
}
