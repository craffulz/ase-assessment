import { body } from "express-validator";

export const reportsValidator = [
  
  body("player_id")
    .isInt()
    .withMessage("Player ID must be an integer")
    .notEmpty()
    .withMessage("Player ID is required"),


  body("scout_id")
    .isInt()
    .withMessage("Scout ID must be an integer")
    .notEmpty()
    .withMessage("Scout ID is required"),

  
  body("match_date")
    .isISO8601()
    .withMessage("Invalid date format (use YYYY-MM-DD)")
    .notEmpty()
    .withMessage("Match date is required"),

 
  body("overall_rating")
    .isInt({ min: 1, max: 10 })
    .withMessage("Rating must be integer between 1-10")
    .notEmpty()
    .withMessage("Rating is required"),


  body("strengths")
    .optional()
    .isString()
    .withMessage("Strengths must be a string"),

 
  body("weaknesses")
    .optional()
    .isString()
    .withMessage("Weaknesses must be a string"),

 
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
