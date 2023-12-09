import {z} from "zod";
import {brewlogSchema, createBrewlogSchema, updateBrewlogSchema} from "brewster-types"

export const brewlogSummarySchema = brewlogSchema
    .extend({date: z.string().datetime()})

export type BrewlogSummaryDto = z.infer<typeof brewlogSummarySchema>

export type CreateBrewlogDto = z.infer<typeof createBrewlogSchema>

export type UpdateBrewlogDto = z.infer<typeof updateBrewlogSchema>
