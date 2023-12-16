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

// schema for embeddig stuffs in logs
export const embeddedStuffsSchema = stuffsSchema.omit({_id:true})
    .extend({sourceId:z.string()})

// summary for embedded stuffs in logs
export const lookupSchema = z.object({
    sourceId: z.string(),
    label: z.string()
})

export const createStuffsSchema = stuffsSchema.omit({_id:true})

export const updateStuffsSchema = stuffsSchema.partial();
