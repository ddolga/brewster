import {createZodDto} from "nestjs-zod";
import {updateStuffsDto} from "brewster-types";

export class UpdateStuffDto extends createZodDto(updateStuffsDto) {}
