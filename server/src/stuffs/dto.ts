import {createZodDto} from "nestjs-zod";
import {createStuffsSchema, updateStuffsSchema} from "brewster-types";

export class CreateStuffDto extends createZodDto(createStuffsSchema){}
export class UpdateStuffDto extends createZodDto(updateStuffsSchema) {}
