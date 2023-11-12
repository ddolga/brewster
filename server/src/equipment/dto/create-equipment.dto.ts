import { createZodDto } from 'nestjs-zod';
import { equipmentSchema } from 'brewster-types';

const createDto = equipmentSchema.omit({ _id: true });

export class CreateEquipmentDto extends createZodDto(createDto) {}
