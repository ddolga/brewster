import {z} from "zod";
import {embeddedStuffsSchema, selectSchema, typeOfStuffSchema} from "brewster-types";

export type TypeOfStuff = z.infer<typeof typeOfStuffSchema>;

export type EmbeddedStuffs = z.infer<typeof embeddedStuffsSchema>;

export type Select = z.infer<typeof selectSchema>
