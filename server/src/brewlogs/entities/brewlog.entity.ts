import { createZodDto } from 'nestjs-zod';
import {z} from "zod";
import { brewlogSchema } from 'brewster-types';

export class Brewlog extends createZodDto(brewlogSchema) {}
