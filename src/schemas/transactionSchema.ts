import { z } from "zod";

export const transactionSchema = z.object({
  amount: z
    .number({
      error: "Amount must be a number",
    })
    .finite("Amount must be a finite number")
    .positive("Amount must be greater than 0")
    .max(1_000_000, "Amount cannot exceed $1,000,000")
    .refine(
      (value) => Number.isInteger(value * 100),
      "Amount can have at most 2 decimal places",
    ),

  type: z.enum(["income", "expense"]),

  category: z
    .string()
    .trim()
    .min(1, "Category is required")
    .max(50, "Category cannot exceed 50 characters"),

  date: z
    .string()
    .min(1, "Date is required")
    .refine((value) => !Number.isNaN(Date.parse(value)), "Enter a valid date"),

  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(200, "Description cannot exceed 200 characters"),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;
