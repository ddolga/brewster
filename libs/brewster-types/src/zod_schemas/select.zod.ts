import {z} from "zod";

export const selectSchema = z.object({
    sourceId: z.string(),
    label: z.string()
})
