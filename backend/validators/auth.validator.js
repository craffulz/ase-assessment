import { body } from "express-validator";

export const registerValidator = [
  body("email")
    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail()
    .notEmpty()
    .withMessage("Email is required")
    .isLength({ max: 255 })
    .withMessage("Email must be less than 255 characters"),

  body("password_hash")
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .isLength({ max: 255 })
    .withMessage("Password too long"),

  body("name")
    .isString()
    .withMessage("Name must be a string")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 100 })
    .withMessage("Name must be less than 100 characters"),
];

export const loginValidator = [
  body("email")
    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail()
    .notEmpty()
    .withMessage("Email is required"),

  body("password").notEmpty().withMessage("Password is required"),
];
