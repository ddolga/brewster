import {z} from "zod";
import {brewlogSchema} from "brewster-types"

export const brewlogSummarySchema = brewlogSchema
    .extend({date: z.string().datetime()})

export const createBrewlogSchema = brewlogSummarySchema.omit({_id:true});

export const updateBrewlogSchema = brewlogSummarySchema.partial();


export type BrewlogSummaryDto = z.infer<typeof brewlogSummarySchema>

export type CreateBrewlogDto = z.infer<typeof createBrewlogSchema>

export type UpdateBrewlogDto = z.infer<typeof updateBrewlogSchema>
