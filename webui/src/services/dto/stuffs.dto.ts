import {createStuffsDto, stuffsSchema} from "brewster-types";
import {z} from "zod";


const stuffsSummarySchema = stuffsSchema;

export type StuffsSummaryDto = z.infer<typeof stuffsSummarySchema>

export type CreateStuffsDto = z.infer<typeof createStuffsDto>;

export type UpdateSuffsDto = z.infer<typeof createStuffsDto>;
