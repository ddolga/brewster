import {z, ZodNumber} from "zod";
import dayjs from "dayjs";

const rnd = <T extends ZodNumber>(schema: T, places: number = 2) => {
    const multi = 10 ** places;
    return z.preprocess((val: unknown) => Math.round(Number(val) * multi) / multi, schema)
}

const dateSchema = z.coerce.date();

const hasId = z.object({_id: z.string()})

export type BasketTypeType = 'single' | 'double'
export const brewlogSchema = z.object({
    _id: z.string(),
    date: dateSchema.min(dayjs('01/01/2023').toDate()), // date coffee made
    grinderSetting: rnd(z.number().positive().describe('grind setting specific to the grinder used')),
    grindSize: rnd(z.number().min(400).max(1900)).optional().describe('grind size in microns'),
    doze_in: rnd(z.number().min(7).max(25)).describe('amount of coffee in grams added to grinder'),
    doze_out: rnd(z.number().min(6).max(26).positive().describe('amount of coffee in grams that came out of grinder')),
    doze_used: rnd(z.number().min(6).max(26).positive().describe('amount of coffee put in the portafilter')),
    coffee: z.string().describe('name of coffee'),
    roaster: z.string().optional().describe('coffee roaster/distributor'),
    origin: z.string().optional().describe('where coffee comes from'),
    decaff: z.boolean().describe('is decaf'),
    brew_time: rnd(z.number().positive().max(60).describe('pull time in seconds (not including preinfusion)')),
    preinfusion: z.boolean().describe('preinfusion used'),
    tP: z.number().positive().max(20).optional().describe('preinfusion pause'),
    tI: z.number().positive().max(10).optional().describe('preinfusion duration'),
    coffee_out: rnd(z.number().min(6).max(50)).describe('grams of coffee produced'),
    basketType: z.enum(["single", "double"]),
    basketSize: z.number().int().min(7).max(24),
    discarded: z.boolean().describe('not drinkable'),
    drinkType: z.enum(["espresso", "latte", "cappuccino"]),
    sweetness: z.number().int().min(1).max(10).optional(),
    body: z.number().int().min(1).max(10).optional(),
    acidity: z.number().int().min(1).max(10).optional(),
    flavors: z.string().array().optional(),
    finish: z.string().array().optional(),
    comment: z.string()
});

export const createBrewlogSchema = brewlogSchema.omit({_id: true});

export const updateBrewlogSchema = hasId.merge(createBrewlogSchema.partial());
