import { createZodDto } from 'nestjs-zod';
import { brewlogSchema } from 'brewster-types';

export class Brewlog extends createZodDto(brewlogSchema) {}
