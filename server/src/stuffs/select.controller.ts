import {Controller, Get, Param, Query} from "@nestjs/common";
import {SelectService } from "./select.service";
import {ApiTags} from "@nestjs/swagger";
import {TypeOfStuff} from "../types/types";

@ApiTags('stuffs')
@Controller('stuffs/select')
export class SelectController {

    constructor(private readonly service: SelectService) {
    }

    @Get('/:type')
    getSelect(@Param('type') type: TypeOfStuff) {
        return this.service.getSelection(type);
    }


}
