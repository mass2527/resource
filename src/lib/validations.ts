import { z } from "zod";

export const resourcePatchSchema = z.object({
  name: z.string().min(1),
});
