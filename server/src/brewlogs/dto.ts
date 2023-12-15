import "zod";
import {createZodDto} from "nestjs-zod";
import {brewlogSchema} from "brewster-types";

const createBrewlogSchema = brewlogSchema.omit({_id: true});
export const updateBrewlogSchema = brewlogSchema.partial();

export class CreateBrewlogDto extends createZodDto(createBrewlogSchema) {
}

export class UpdateBrewlogDto extends createZodDto(updateBrewlogSchema) {
}
