import {z} from "zod";

export const notEmptyString = z.string().trim().min(1,'Field cannot be empty');