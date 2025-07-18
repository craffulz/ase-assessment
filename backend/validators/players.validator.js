import { body } from "express-validator";

export const playerValidator = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name is required"),

  body("position")
    .isString()
    .withMessage("Position must be a string")
    .notEmpty()
    .withMessage("Position is required"),

  body("age").optional().isInt().withMessage("Age must be an integer"),

  body("team")
    .isString()
    .withMessage("Team must be a string")
    .notEmpty()
    .withMessage("Team is required"),

  body("nationality")
    .isString()
    .withMessage("Nationality must be a string")
    .notEmpty()
    .withMessage("Nationality is required"),

  body("height")
    .isInt()
    .withMessage("Height must be an integer")
    .notEmpty()
    .withMessage("Height is required"),

  body("weight")
    .isInt()
    .withMessage("Weight must be an integer")
    .notEmpty()
    .withMessage("Weight is required"),

  body("goals").optional().isInt().withMessage("Goals must be an integer"),

  body("assists").optional().isInt().withMessage("Assists must be an integer"),

  body("appearances")
    .optional()
    .isInt()
    .withMessage("Appearances must be an integer"),

  body("contract_salary")
    .optional()
    .isNumeric()
    .withMessage("Contract salary must be a number"),

  body("contract_end")
    .optional()
    .isISO8601()
    .withMessage("Invalid contract end date format"),

  body("market_value")
    .optional()
    .isNumeric()
    .withMessage("Market value must be a number"),
];
