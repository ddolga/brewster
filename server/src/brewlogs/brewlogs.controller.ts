import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {BrewlogsService} from './brewlogs.service';
import {ApiTags} from "@nestjs/swagger";
import {CreateBrewlogDto, UpdateBrewlogDto} from "./dto";

@ApiTags('brewlogs')
@Controller('brewlogs')
export class BrewlogsController {
    constructor(private readonly brewlogsService: BrewlogsService) {
    }

    @Post()
    create(@Body() createBrewlogDto: CreateBrewlogDto) {
        return this.brewlogsService.create(createBrewlogDto);
    }

    @Get()
    findAll() {
        return this.brewlogsService.findAll();
    }

    @Get('sample')
    sampleData() {
        return this.brewlogsService.sampleData();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.brewlogsService.findOne(id);
    }

    @Get('new/:id')
    getNewTemplate(@Param('id') id: string) {
        return this.brewlogsService.getNewTemplate(id);
    }

    @Patch()
    update(@Param('id') id: string, @Body() updateBrewlogDto: UpdateBrewlogDto) {
        return this.brewlogsService.update(updateBrewlogDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.brewlogsService.remove(id);
    }
}
