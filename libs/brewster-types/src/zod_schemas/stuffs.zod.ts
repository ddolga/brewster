import {z} from "zod";

export const stuffsSchema = z.object({
    _id: z.string(),
    model: z.string(),
    make: z.string(),
    origin: z.string(),
    type: z.enum(["brewer", "coffee", "grinder", "basket", "scale", "tamper"]),
    description: z.string(),
});

export const createStuffsDto = stuffsSchema.omit({_id: true});

export const updateStuffsDto = stuffsSchema.partial();
