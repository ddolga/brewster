import { brewlogSchema } from 'brewster-types';
import { createZodDto } from 'nestjs-zod';

const createSchema = brewlogSchema.omit({ _id: true });

export class CreateBrewlogDto extends createZodDto(createSchema) {}
