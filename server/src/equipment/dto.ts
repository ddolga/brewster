import {createZodDto} from "nestjs-zod";
import {createEquipmentSchema, updateEquipmentSchema} from "brewster-types";

export class CreateEquipmentDto extends createZodDto(createEquipmentSchema) {}
export class UpdateEquipmentDto extends createZodDto(updateEquipmentSchema) {}
