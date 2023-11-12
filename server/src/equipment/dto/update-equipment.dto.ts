import { createZodDto } from 'nestjs-zod/dto';
import { equipmentSchema } from 'brewster-types';

const partialDto = equipmentSchema.partial();

export class UpdateEquipmentDto extends createZodDto(partialDto) {}
