import {z, ZodNumber} from "zod";
import dayjs from "dayjs";
import {embeddedStuffsSchema, lookupSchema} from "./stuffs.zod";

const rnd = <T extends ZodNumber>(schema: T, places: number = 2) => {
    const multi = 10 ** places;
    return z.preprocess((val: unknown) => Math.round(Number(val) * multi) / multi, schema)
}

const dateSchema = z.coerce.date();

const hasId = z.object({_id: z.string()})

const drinkTypes = ["Americano", "Cappuccino", "Espresso", "Flat White", "Latte"] as const;

export const drinkTypeSchema = z.enum(drinkTypes);

export const basketTypeSchema = z.enum(['Single', 'Double']);

export const brewlogSchema = z.object({
    _id: z.string(),
    date: dateSchema.min(dayjs('01/01/2023').toDate()), // date coffee made
    grinderSetting: rnd(z.number().positive().describe('grind setting specific to the grinder used')),
    grindSize: rnd(z.number().min(400).max(1900)).optional().describe('grind size in microns'),
    doze_in: rnd(z.number().min(7).max(25)).describe('amount of coffee in grams added to grinder'),
    doze_out: rnd(z.number().min(6).max(26).positive().describe('amount of coffee in grams that came out of grinder')),
    doze_used: rnd(z.number().min(6).max(26).positive().describe('amount of coffee put in the portafilter')),
    brew_time: rnd(z.number().positive().max(60).describe('pull time in seconds (not including preinfusion)')),
    preinfusion: z.boolean().describe('preinfusion used'),
    tP: z.number().positive().max(20).optional().describe('preinfusion pause'),
    tI: z.number().positive().max(10).optional().describe('preinfusion duration'),
    coffee_out: rnd(z.number().min(6).max(50)).describe('grams of coffee produced'),
    discarded: z.boolean().describe('not drinkable'),
    drinkType: drinkTypeSchema,
    sweetness: z.number().int().min(1).max(10).optional(),
    body: z.number().int().min(1).max(10).optional(),
    acidity: z.number().int().min(1).max(10).optional(),
    flavors: z.string().array().optional(),
    finish: z.string().array().optional(),
    basket: embeddedStuffsSchema,
    coffee: embeddedStuffsSchema,
    comment: z.string()
});


export const summaryBrewlogSchema = brewlogSchema.pick({
    _id: true, date: true,coffee:true, brew_time: true, drinkType: true, doze_used: true
})
export const detailBrewlogSchema = brewlogSchema;
export const brewlogLookupSchema = brewlogSchema.extend({date: z.string(), coffee: lookupSchema, basket: lookupSchema})

export const createBrewlogSchema = brewlogLookupSchema.omit({_id: true});
export const updateBrewlogSchema = brewlogLookupSchema.partial();
export const templateBrewlogSchema = brewlogSchema.omit({_id:true})
