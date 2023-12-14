import {createZodDto} from "nestjs-zod";
import {createStuffsSchema} from "brewster-types";

export class CreateStuffDto extends createZodDto(createStuffsSchema){}
