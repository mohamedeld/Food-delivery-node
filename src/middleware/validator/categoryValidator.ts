import { param, body } from 'express-validator';

export const createCategory = [
  body('name')
    .notEmpty()
    .withMessage('please enter your category name')
    .isString()
    .withMessage('category status should be string'),
  body('image')
    .optional()
    .notEmpty()
    .withMessage('please enter category image')
    .isString()
    .withMessage('image should be string'),
];

export const getCategory = [
  param('id')
    .notEmpty()
    .withMessage('please enter category id')
    .isMongoId()
    .withMessage('category id should be mongo id'),
];

export const updateCategory = [
  body('user_id')
    .optional()
    .notEmpty()
    .withMessage('please enter user id')
    .isMongoId()
    .withMessage('id should be mongo id'),
  body('name')
    .optional()
    .notEmpty()
    .withMessage('please enter your category name')
    .isAlpha()
    .withMessage('category status should be string'),
  body('image')
    .optional()
    .optional()
    .notEmpty()
    .withMessage('please enter category image')
    .isString()
    .withMessage('image should be string'),
];

export const deleteCategory = [
  param('id')
    .notEmpty()
    .withMessage('please enter category id')
    .isMongoId()
    .withMessage('category id should be mongo id'),
];
