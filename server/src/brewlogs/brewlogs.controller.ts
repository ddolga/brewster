import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BrewlogsService } from './brewlogs.service';
import { CreateBrewlogDto } from './dto/create-brewlog.dto';
import { UpdateBrewlogDto } from './dto/update-brewlog.dto';
import {ApiTags} from "@nestjs/swagger";

@ApiTags('brewlogs')
@Controller('brewlogs')
export class BrewlogsController {
  constructor(private readonly brewlogsService: BrewlogsService) {}

  @Post()
  create(@Body() createBrewlogDto: CreateBrewlogDto) {
    return this.brewlogsService.create(createBrewlogDto);
  }

  @Get()
  findAll() {
    return this.brewlogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brewlogsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrewlogDto: UpdateBrewlogDto) {
    return this.brewlogsService.update(id, updateBrewlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brewlogsService.remove(id);
  }
}
