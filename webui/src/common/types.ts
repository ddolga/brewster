import {z} from "zod";
import {basketTypeSchema} from "brewster-types";

export type BasketTypeType = z.infer<typeof basketTypeSchema>
