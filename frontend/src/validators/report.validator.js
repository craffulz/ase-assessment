import { z } from "zod";

export const ScoutReportsValidator = {
  schema: z.object({
    match_date: z
      .string({
        required_error: "Match date required",
        invalid_type_error: "Date must be text",
      })
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Format: YYYY-MM-DD"),

    overall_rating: z.coerce
      .number({
        required_error: "Rating required",
        invalid_type_error: "Rating must be number",
      })
      .int("Whole number")
      .min(1, "Min rating: 1")
      .max(100, "Max rating: 100"),

    strengths: z
      .string({
        required_error: "Strengths required",
        invalid_type_error: "Strengths must be text",
      })
      .min(1, "Strengths cannot be empty")
      .optional(),

    weaknesses: z
      .string({
        required_error: "Weaknesses required",
        invalid_type_error: "Weaknesses must be text",
      })
      .min(1, "Weaknesses cannot be empty")
      .optional(),

    recommendation: z
      .string({
        required_error: "Recommendation required",
        invalid_type_error: "Recommendation must be text",
      })
      .min(1, "Recommendation cannot be empty")
      .max(50, "Max 50 characters")
      .optional(),
  }),

  defaultValues: {
    match_date: "",
    overall_rating: "",
    strengths: "",
    weaknesses: "",
    recommendation: "",
  },
};
