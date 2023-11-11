import {z} from 'zod';

export const brewlogSchema = z.object({
  date:z.date(),
  grind:z.number(),
  doze:z.number(),
  coffee:z.string(),
  brew_time:z.number(),
  preinfusion:z.boolean(),
  tP:z.number().optional(),
  tI:z.number().optional(),
  doze_out:z.number(),
  comment:z.string()
})
