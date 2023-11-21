import {z, ZodNumber} from "zod";
import dayjs from "dayjs";


const rnd = <T extends ZodNumber>(schema: T, places: number = 2) => {
    const multi = 10 ** places;
    return z.preprocess((val: unknown) => Math.round(Number(val) * multi) / multi, schema)
}

const dateSchema = z.coerce.date();

const hasId = z.object({_id: z.string()})
export const brewlogSchema = z.object({
    _id: z.string(),
    date: dateSchema.min(dayjs('01/01/2023').toDate()),
    grinderSetting: rnd(z.number().gte(0)),
    grindSize: rnd(z.number().min(400).max(1900)),
    doze_in: rnd(z.number().gte(7)),
    doze_out: rnd(z.number().gte(0)),
    coffee: z.string(),
    decaff: z.boolean(),
    brew_time: rnd(z.number().gte(0)),
    preinfusion: z.boolean(),
    tP: z.number().gte(0).optional(),
    tI: z.number().gte(0).optional(),
    coffee_out: rnd(z.number().min(6).max(25)),
    basketType: z.enum(["single", "double"]),
    basketSize: z.number().int().min(7).max(21),
    discarded: z.boolean(),
    drinkType: z.enum(["espresso", "latte", "cappuccino"]),
    sweetness: z.number().int().max(10),
    body: z.number().max(10),
    acidity: z.number().int().max(10),
    flavors: z.string().array(),
    finish: z.string().array(),
    comment: z.string()
});

export const createBrewlogSchema = brewlogSchema.omit({_id: true});

export const updateBrewlogSchema = hasId.merge(createBrewlogSchema.partial());
