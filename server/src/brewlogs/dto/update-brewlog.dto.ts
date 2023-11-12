import { brewlogSchema } from 'brewster-types';
import { createZodDto } from 'nestjs-zod';

const updateSchema = brewlogSchema.partial();

export class UpdateBrewlogDto extends createZodDto(updateSchema) {}
