import { param, body } from 'express-validator';
import express from 'express';
import bcrypt from 'bcrypt';
import User from '../../model/userModel';

interface IUserRequest extends express.Request {
  user: any;
}

export const createUserValidator = [
  body('name').notEmpty().withMessage('Please enter your name'),
  body('email')
    .notEmpty()
    .withMessage('Please enter your email')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .custom((email) => {
      return User.findOne({ email }).then((user) => {
        if (user) {
          return Promise.reject('Email is already in use');
        }
        return true;
      });
    }),
  body('password')
    .notEmpty()
    .withMessage('Please enter your password')
    .isStrongPassword()
    .withMessage('Please enter a valid password')
    .custom((password, { req }) => {
      if (password !== req.body.confirmPassword) {
        return Promise.reject('Passwords do not match');
      }
      return true;
    }),
];

export const loginValidator = [
  body('email')
    .notEmpty()
    .withMessage('please enter your email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .custom((email) => {
      return User.findOne({ email }).then((user) => {
        if (!user) {
          return Promise.reject('Email is not found');
        }
        return true;
      });
    }),
  body('password')
    .notEmpty()
    .withMessage('please enter your password')
    .isLength({ min: 8, max: 32 })
    .withMessage('Password must be between 8 and 32 characters')
    .isStrongPassword()
    .withMessage('Please enter your strong password'),
];

export const verifyUserEmail = [
  body('verification_token')
    .notEmpty()
    .withMessage('verification token is required')
    .isNumeric()
    .withMessage('verification token must be numeric'),
  body('email')
    .notEmpty()
    .withMessage('please enter your email')
    .isEmail()
    .withMessage('please enter a valid email'),
];

export const userChangePassword = [
  param('id')
    .notEmpty()
    .withMessage('please enter your id ')
    .isMongoId()
    .withMessage('id should be mongo id'),
  body('currentPassword')
    .notEmpty()
    .withMessage('please enter your current password'),
  body('confirmPassword')
    .notEmpty()
    .withMessage('please enter your confirm password'),
  body('password')
    .notEmpty()
    .withMessage('please enter your password')
    .custom(async (password, { req }) => {
      const user = await User.findById(req.params.id);
      if (!user) {
        return Promise.reject(new Error('please check your id'));
      }
      const isCorrectPassword = await bcrypt.compare(
        req.body.currentPassword,
        user.password,
      );
      if (!isCorrectPassword) {
        throw new Error('incorrect password');
      }
      if (password !== req.body.confirmPassword) {
        throw new Error('password does not match confirm password');
      }
    }),
];
