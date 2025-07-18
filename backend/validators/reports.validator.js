import { body } from "express-validator";

export const reportsValidator = [
  // player_id (requerido, entero)
  body("player_id")
    .isInt()
    .withMessage("Player ID must be an integer")
    .notEmpty()
    .withMessage("Player ID is required"),

  // scout_id (requerido, entero)
  body("scout_id")
    .isInt()
    .withMessage("Scout ID must be an integer")
    .notEmpty()
    .withMessage("Scout ID is required"),

  // match_date (requerido, fecha válida)
  body("match_date")
    .isISO8601()
    .withMessage("Invalid date format (use YYYY-MM-DD)")
    .notEmpty()
    .withMessage("Match date is required"),

  // overall_rating (requerido, entero 1-10)
  body("overall_rating")
    .isInt({ min: 1, max: 10 })
    .withMessage("Rating must be integer between 1-10")
    .notEmpty()
    .withMessage("Rating is required"),

  // strengths (opcional, texto)
  body("strengths")
    .optional()
    .isString()
    .withMessage("Strengths must be a string"),

  // weaknesses (opcional, texto)
  body("weaknesses")
    .optional()
    .isString()
    .withMessage("Weaknesses must be a string"),

  // recommendation (opcional, texto con valores específicos)
  body("recommendation")
    .optional()
    .isString()
    .withMessage("Recommendation must be a string")
    .isIn([
      "Sign immediately",
      "Strongly recommend",
      "Recommend",
      "Not recommended",
      "Reject",
    ])
    .withMessage("Invalid recommendation value"),
];
