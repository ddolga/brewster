import "zod";
import {createZodDto} from "nestjs-zod";
import {
    brewlogSchema,
    createBrewlogSchema,
    summaryBrewlogSchema,
    updateBrewlogSchema
} from "brewster-types";

export class DetailBrewlogDto extends createZodDto(brewlogSchema){}

export class SummaryBrewlogDto extends createZodDto(summaryBrewlogSchema){}

export class CreateBrewlogDto extends createZodDto(createBrewlogSchema) {
}

export class UpdateBrewlogDto extends createZodDto(updateBrewlogSchema) {
}
