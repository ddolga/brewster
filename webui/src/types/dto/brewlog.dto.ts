import {z} from "zod";
import {
    createBrewlogSchema, detailBrewlogSchema,
    summaryBrewlogSchema, templateBrewlogSchema,
    updateBrewlogSchema
} from "brewster-types"


export type BrewlogSummaryDto = z.infer<typeof summaryBrewlogSchema>

export type BrewlogDetailDto = z.infer<typeof detailBrewlogSchema>

export type CreateBrewlogDto = z.infer<typeof createBrewlogSchema>

export type UpdateBrewlogDto = z.infer<typeof updateBrewlogSchema>

export type TemplateBrewlogDto = z.infer<typeof templateBrewlogSchema>