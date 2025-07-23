import { z } from "zod";

export const upiPaymentSchema = z.object({
  upiID: z
    .string()
    .min(2, "Enter your UPI ID")
    .regex(/^[\w.-]{2,256}$/, "Enter a valid UPI id"),
});
