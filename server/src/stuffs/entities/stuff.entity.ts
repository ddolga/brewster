import {createZodDto} from "nestjs-zod";
import {stuffsSchema} from "brewster-types";

export class Stuff extends createZodDto(stuffsSchema){}
