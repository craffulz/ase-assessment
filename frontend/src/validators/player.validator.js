import { z } from "zod";

export const PlayerValidator = {
  schema: z.object({
    name: z.string().min(1, "Must complete").max(100, "Max 100 characters"),

    position: z.string().min(1, "Must complete").max(50, "Max 50 characters"),

    age: z.coerce.number({ 
      required_error: "Must complete",
      invalid_type_error: "Must be a number"
    }).min(16, ">= 16").max(50, "<= 50"),

    team: z.string().min(1, "Must complete").max(100, "Max 100 characters"),

    nationality: z
      .string()
      .min(1, "Must complete")
      .max(50, "Max 50 characters"),

    height: z.coerce.number({ 
      required_error: "Must complete",
      invalid_type_error: "Must be a number"
    }).min(150, ">= 150 cm").max(220, "<= 220 cm"),

    weight: z.coerce.number({ 
      required_error: "Must complete",
      invalid_type_error: "Must be a number"
    }).min(50, ">= 50 kg").max(120, "<= 120 kg"),

    goals: z.coerce.number({ 
      required_error: "Must complete",
      invalid_type_error: "Must be a number"
    }).min(0, ">= 0"),

    assists: z.coerce.number({ 
      required_error: "Must complete",
      invalid_type_error: "Must be a number"
    }).min(0, ">= 0"),

    appearances: z.coerce.number({ 
      required_error: "Must complete",
      invalid_type_error: "Must be a number"
    }).min(0, ">= 0"),

    contract_salary: z.coerce.number({ 
      required_error: "Must complete",
      invalid_type_error: "Must be a number"
    }).min(0, ">= 0"),

    contract_end: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "YYYY-MM-DD"),

    market_value: z.coerce.number({ 
      required_error: "Must complete",
      invalid_type_error: "Must be a number"
    }).min(0, ">= 0"),
  }),

  defaultValues: {
    name: "",
    position: "",
    age: "",
    team: "",
    nationality: "",
    height: "",
    weight: "",
    goals: 0,
    assists: 0,
    appearances: 0,
    contract_salary: 0,
    contract_end: "",
    market_value: 0,
  },
};
