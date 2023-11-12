import { z } from "zod";

export const equipmentSchema = z.object({
  _id: z.string(),
  model: z.string(),
  make: z.string(),
  note:z.string(),
  type: z.enum(["brewer", "grinder", "basket", "scale", "tamper"])
});
