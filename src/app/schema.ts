import { z } from "zod";

export const OxperplexResponse = z.object({
  content: z.string(),
  sources: z.array(z.string()),
  images: z.array(z.string()),
});
