import {createZodDto} from "nestjs-zod";
import {updateStuffsSchema} from "brewster-types";

export class UpdateStuffDto extends createZodDto(updateStuffsSchema) {}
