import {param,body} from 'express-validator';

export const createBanner = [
    body("name").notEmpty().withMessage("please enter your banner name"),
    body("status").notEmpty().withMessage("please enter your banner status").isNumeric().withMessage("banner status should be number"),
    body("image").optional().notEmpty().withMessage("please enter your banner image")
];

export const getBanner =[
    param("id").notEmpty().withMessage("please enter branner id").isMongoId().withMessage("banner id should be mongo id")
];

export const updateBanner = [
    body("name").optional().notEmpty().withMessage("please enter your banner name"),
    body("status").optional().notEmpty().withMessage("please enter your banner status").isNumeric().withMessage("banner status should be number"),
    body("image").optional().notEmpty().withMessage("please enter your banner image")
];

export const deleteBanner =[
    param("id").notEmpty().withMessage("please enter branner id").isMongoId().withMessage("banner id should be mongo id")
];