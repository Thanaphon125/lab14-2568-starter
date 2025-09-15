import { z } from "zod";

// Zod Schema
export const marathonSchema = z
  .object({
    fname: z
      .string()
      .min(3, { message: "First name must have at least 3 letters" }),
    lname: z.string().min(5, { message: "Last name must have at least 5 letters" }),
    plan: z.enum(["funrun", "mini", "half", "full"], {
      message: "Select a plan",
    }),
    gender: z.enum(["male", "female"], { message: "Select gender" }),
    agree: z.boolean().default(false),
    email: z.string().email("Invalid email"),
    haveCoupon: z.boolean().default(false),
    couponCode: z.string().optional(),
    password: z
      .string()
      .min(6, { message: "Password must contain at least 6 characters" })
      .max(12, { message: "Password must not exceed 12 characters" }),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
   
    if (data.haveCoupon) {
      if (!data.couponCode?.trim()) {
        ctx.addIssue({
          path: ["couponCode"],
          code: z.ZodIssueCode.custom,
          message: "Please enter coupon code",
        });
      } else if (data.couponCode.trim() !== "CMU2025") {
        ctx.addIssue({
          path: ["couponCode"],
          code: z.ZodIssueCode.custom,
          message: "Invalid coupon code",
        });
      }
    }

   
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: z.ZodIssueCode.custom,
        message: "Password does not match",
      });
    }
  });

export type MarathonForm = z.infer<typeof marathonSchema>;
