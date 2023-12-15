import {z} from "zod";
import {basketTypeSchema, typeOfStuffSchema} from "brewster-types";

export type BasketTypeType = z.infer<typeof basketTypeSchema>
export type TypeOfStuff = z.infer<typeof typeOfStuffSchema>;
