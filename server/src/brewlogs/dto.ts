import "zod";
import {createZodDto} from "nestjs-zod";
import {createBrewlogSchema, updateBrewlogSchema} from "brewster-types";

export class CreateBrewlogDto extends createZodDto(createBrewlogSchema) {
}

export class UpdateBrewlogDto extends createZodDto(updateBrewlogSchema) {
}
