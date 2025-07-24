import { z } from "zod";

const numericField = () =>
  z.coerce
    .number({
      required_error: "Rating required",
      invalid_type_error: "Rating must be number",
    })
    .int("Whole number")
    .min(1, "Min 1")
    .max(100, "Max 100"); // Valida números

// Esquema completo
export const PlayerAttributesValidator = {
  schema: z.object({
    pace: numericField(),
    shooting: numericField(),
    passing: numericField(),
    defending: numericField(),
    dribbling: numericField(),
    physical: numericField(),
  }),
  defaultValues: {
    pace: "",
    shooting: "",
    passing: "",
    defending: "",
    dribbling: "",
    physical: "",
  },
};
