import { z } from "zod";

export const brewlogSchema = z.object({
  _id: z.string(),
  date: z.date(),
  grind: z.number(),
  doze_in: z.number(),
  doze_out: z.number(),
  coffee: z.string(),
  decaff: z.boolean(),
  brew_time: z.number(),
  preinfusion: z.boolean(),
  tP: z.number().optional(),
  tI: z.number().optional(),
  coffee_out: z.number().min(6).max(25),
  basketType: z.enum(["single", "double"]),
  basketSize: z.number().min(7).max(21),
  discarded: z.boolean(),
  drinkType: z.enum(["espresso", "latte", "cappuccino"]),
  sweetness: z.number(),
  body: z.number(),
  acidity: z.number(),
  flavors: z.string().array(),
  finish: z.string().array(),
  comment: z.string()
});
