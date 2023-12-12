import {createZodDto} from "nestjs-zod";
import {createStuffsDto} from "brewster-types";

export class CreateStuffDto extends createZodDto(createStuffsDto){}
