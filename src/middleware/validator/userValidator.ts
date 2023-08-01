import { query, param, body } from "express-validator";
import User from "../../model/userModel";

export const createUserValidator = [
  body("name").notEmpty().withMessage("Please enter your name"),
  body("email")
    .notEmpty()
    .withMessage("Please enter your email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .custom((email, { req }) => {
      return User.findOne({ email }).then((user) => {
        if (user) {
          return Promise.reject("Email is already in use");
        }
        return true;
      });
    }),
  body("password")
    .notEmpty()
    .withMessage("Please enter your password")
    .isStrongPassword()
    .withMessage("Please enter a valid password")
    .custom((password, { req }) => {
      if (password !== req.body.confirmPassword) {
        return Promise.reject("Passwords do not match");
      }
      return true;
    }),
];

export const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("please enter your email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .custom((email, { req }) => {
      return User.findOne({ email }).then((user) => {
        if (!user) {
          return Promise.reject("Email is not found");
        }
        return true;
      });
    }),
  body("password")
    .notEmpty()
    .withMessage("please enter your password")
    .isLength({ min: 8, max: 32 })
    .withMessage("Password must be between 8 and 32 characters")
    .isStrongPassword()
    .withMessage("Please enter your strong password"),
];
