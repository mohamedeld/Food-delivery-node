import { param, body } from 'express-validator';

export const createCity = [
  body('name').notEmpty().withMessage('please enter your city name'),
  body('status')
    .notEmpty()
    .withMessage('please enter your city status')
    .isAlpha()
    .withMessage('banner status should be true or false'),
  body('latitude')
    .notEmpty()
    .withMessage('please enter latitude')
    .isNumeric()
    .withMessage('please enter latitude should be a number'),
  body('longitude')
    .notEmpty()
    .withMessage('please enter longitude')
    .isNumeric()
    .withMessage('please enter longitude should be a number'),
];

export const getCity = [
  param('id')
    .notEmpty()
    .withMessage('please enter city id')
    .isMongoId()
    .withMessage('city id should be mongo id'),
];

export const updateCity = [
  body('name').optional().notEmpty().withMessage('please enter your city name'),
  body('status')
    .optional()
    .notEmpty()
    .withMessage('please enter your city status')
    .isBoolean()
    .withMessage('banner status should be true or false'),
  body('latitude')
    .optional()
    .notEmpty()
    .withMessage('please enter latitude')
    .isNumeric()
    .withMessage('please enter latitude should be a number'),
  body('longitude')
    .optional()
    .notEmpty()
    .withMessage('please enter longitude')
    .isNumeric()
    .withMessage('please enter longitude should be a number'),
];

export const deleteCity = [
  param('id')
    .notEmpty()
    .withMessage('please enter city id')
    .isMongoId()
    .withMessage('city id should be mongo id'),
];
