import { z } from "zod";
import { awards2026 } from "@/data/louies2026";

export const nominationSchema = z.object({
  name: z.string().trim().min(1).max(160),
  email: z.string().trim().email().max(200),
  website: z.string().max(0).optional(),
  favoriteKyxLead: z.enum(["Dan", "Jack", "Rachel"]).optional(),
  nominations: z.array(z.object({
    awardId: z.string().refine(id => awards2026.some(a => a.id === id), "Unknown award"),
    nominee: z.string().trim().min(1).max(200),
    organization: z.string().trim().max(200),
    reason: z.string().trim().min(1).max(2000),
  })).min(1).max(200),
});
export type NominationInput = z.infer<typeof nominationSchema>;
