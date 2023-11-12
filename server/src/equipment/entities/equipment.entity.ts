import { createZodDto } from 'nestjs-zod';
import { equipmentSchema } from 'brewster-types';

export class Equipment extends createZodDto(equipmentSchema) {}
