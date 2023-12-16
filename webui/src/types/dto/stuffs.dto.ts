import {z} from "zod";
import {createStuffsSchema, stuffsSchema, updateStuffsSchema} from "brewster-types";


const stuffsSummarySchema = stuffsSchema;

export type StuffsSummaryDto = z.infer<typeof stuffsSummarySchema>

export type CreateStuffsDto = z.infer<typeof createStuffsSchema>;

export type UpdateSuffsDto = z.infer<typeof updateStuffsSchema>;
