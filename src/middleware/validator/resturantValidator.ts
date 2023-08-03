import { param, body } from 'express-validator';
import slugify from 'slugify';
export const createResturant = [
  body('name')
    .notEmpty()
    .withMessage('please enter your resutrant name')
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  body('openTime')
    .notEmpty()
    .withMessage('please enter your open time')
    .isString()
    .withMessage('open time should be string'),
  body('closeTime')
    .notEmpty()
    .withMessage('please enter your close time')
    .isString()
    .withMessage('close time should be string'),
  body('price')
    .notEmpty()
    .withMessage('price is required')
    .isNumeric()
    .withMessage('price should be number'),
  body('location')
    .notEmpty()
    .withMessage('location is required')
    .isString()
    .withMessage('location should be an object'),
  body('cuisines')
    .notEmpty()
    .withMessage('cuisine is required')
    .isString()
    .withMessage('cuisine should be an array'),
  body('description')
    .notEmpty()
    .withMessage('please enter resturant description ')
    .isString()
    .withMessage('description should be string'),
  body('address')
    .notEmpty()
    .withMessage('please enter your resutrant address ')
    .isString()
    .withMessage('address should be string'),
  body('delivery_time')
    .notEmpty()
    .withMessage('delivery time is required')
    .isNumeric()
    .withMessage('delivery time should be number'),
  body('phone')
    .notEmpty()
    .withMessage('phone is required')
    .isString()
    .withMessage('phone should be string'),
  body('isClose')
    .notEmpty()
    .withMessage('isClose is required')
    .isBoolean()
    .withMessage('phone should be boolean'),
  body('rating')
    .notEmpty()
    .withMessage('rating is required')
    .isString()
    .withMessage('rating should be number'),
  body('totalRating')
    .notEmpty()
    .withMessage('total rating is required')
    .isString()
    .withMessage('total rating should be number'),
  body('status')
    .notEmpty()
    .withMessage('status is required')
    .isString()
    .withMessage('status should be string'),
];

export const getResturant = [
  param('id')
    .notEmpty()
    .withMessage('please enter resutrant id')
    .isMongoId()
    .withMessage('resutrant id should be mongo id'),
];

export const updateResturant = [
  body('name')
    .notEmpty()
    .withMessage('please enter your resutrant name')
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  body('openTime')
    .optional()
    .notEmpty()
    .withMessage('please enter your open time')
    .isString()
    .withMessage('open time should be string'),
  body('closeTime')
    .optional()
    .notEmpty()
    .withMessage('please enter your close time')
    .isString()
    .withMessage('close time should be string'),
  body('price')
    .optional()
    .notEmpty()
    .withMessage('price is required')
    .isNumeric()
    .withMessage('price should be number'),
  body('location')
    .optional()
    .notEmpty()
    .withMessage('location is required')
    .isString()
    .withMessage('location should be an object'),
  body('cuisines')
    .optional()
    .notEmpty()
    .withMessage('cuisine is required')
    .isArray()
    .withMessage('cuisine should be an array'),
  body('description')
    .optional()
    .notEmpty()
    .withMessage('please enter resturant description ')
    .isString()
    .withMessage('description should be string'),
  body('address')
    .optional()
    .notEmpty()
    .withMessage('please enter your resutrant address ')
    .isString()
    .withMessage('address should be string'),
  body('delivery_time')
    .optional()
    .notEmpty()
    .withMessage('delivery time is required')
    .isNumeric()
    .withMessage('delivery time should be number'),
  body('phone')
    .optional()
    .notEmpty()
    .withMessage('phone is required')
    .isString()
    .withMessage('phone should be string'),
  body('isClose')
    .optional()
    .notEmpty()
    .withMessage('isClose is required')
    .isBoolean()
    .withMessage('phone should be boolean'),
  body('rating')
    .optional()
    .notEmpty()
    .withMessage('rating is required')
    .isString()
    .withMessage('rating should be number'),
  body('totalRating')
    .optional()
    .notEmpty()
    .withMessage('total rating is required')
    .isString()
    .withMessage('total rating should be number'),
  body('status')
    .optional()
    .notEmpty()
    .withMessage('status is required')
    .isString()
    .withMessage('status should be string'),
];

export const deleteResturant = [
  param('id')
    .notEmpty()
    .withMessage('please enter resutrant id')
    .isMongoId()
    .withMessage('resutrant id should be mongo id'),
];
