import { z } from "zod";

const PlayerSchema = z.object({
  name: z
    .string()
    .min(1, "Name cannot be empty")
    .max(100, "Max 100 characters"),

  position: z
    .string()
    .min(1, "Position cannot be empty")
    .max(50, "Max 50 characters"),

  age: z
    .number()
    .int("Whole number")
    .min(16, "Min 16 years")
    .max(60, "Max 60 years"),

  team: z
    .string()
    .min(1, "Team cannot be empty")
    .max(100, "Max 100 characters"),

  nationality: z
    .string()
    .min(1, "Nationality cannot be empty")
    .max(50, "Max 50 characters"),

  height: z
    .number()
    .int("Whole number in cms")
    .min(150, "Min 150 cm")
    .max(220, "Max 220 cm"),

  weight: z
    .number()
    .int("Whole number in kg")
    .min(50, "Min 50 kg")
    .max(120, "Max 120 kg"),

  goals: z.number().int("Whole number").min(0, "Min 0 goals"),

  assists: z.number().int("Whole number").min(0, "Min 0 assists"),

  appearances: z.number().int("Whole number").min(0, "Min 0 appearances"),

  contract_salary: z.number().int("Whole number").min(0, "Min 0 salary"),

  contract_end: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format: YYYY-MM-DD"),

  market_value: z.number().int("Whole number").min(0, "Min 0 value"),
});
