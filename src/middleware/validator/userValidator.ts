import {query,param,body} from 'express-validator';
import User from '../../model/userModel';

export const createUserValidator = [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('email').not().isEmpty().withMessage('Email is required').isEmail().withMessage('Please enter a valid email address').custom((email,{req})=>{
        return User.findOne({email}).then(user=>{ 
            if(user){
                return Promise.reject('Email is already in use'); 
            }
            return true; 
        }); 
    }),
    body('password').not().isEmpty().withMessage('Password is required').isStrongPassword().withMessage('Please enter a valid password').custom((password,{req})=>{
        if(password !== req.body.confirmPassword){
            return Promise.reject('Passwords do not match');
        }
        return true;
    }),
    body('confirmPassword').notEmpty().withMessage('Confirm Password is required'),
    
]