import {z} from "zod";
import {
    brewlogLookupSchema,
    brewlogSchema,
    createBrewlogSchema,
    summaryBrewlogSchema,
    updateBrewlogSchema
} from "brewster-types"


export type BrewlogSummaryDto = z.infer<typeof summaryBrewlogSchema>

export type BrewlogDetailDto = z.infer<typeof brewlogLookupSchema>

export type CreateBrewlogDto = z.infer<typeof createBrewlogSchema>

export type UpdateBrewlogDto = z.infer<typeof updateBrewlogSchema>
