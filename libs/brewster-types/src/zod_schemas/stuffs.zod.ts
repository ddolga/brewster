import {z} from "zod";
import {notEmptyString} from "./common.zod";

const typeOfStuffs = ["Brewer", "Coffee", "Grinder", "Basket", "Scale", "Tamper"] as const;
export const typeOfStuffSchema = z.enum(typeOfStuffs);

export const stuffsSchema = z.object({
    _id: z.string(),
    type: typeOfStuffSchema,
    model: notEmptyString,
    make: notEmptyString,
    origin: z.string().optional(),
    basketSize: z.number().int().max(24).optional(),
    basketType:z.enum(['Single','Double']).optional(),
    description: z.string().optional(),
    decaff:z.boolean().optional()
});

export const createStuffsSchema = stuffsSchema.omit({_id: true});

export const updateStuffsSchema = stuffsSchema.partial();
