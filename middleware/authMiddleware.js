import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import Employee from '../models/authModels/employeeModel.js';

const protect = asyncHandler(async (req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //get token from header
            token = req.headers.authorization.split(' ')[1]

            //verifyToken
            const decode =jwt.verify(token, process.env.JWT_SECRET)

            //get user from the token
            req.employee = await Employee.findById(decode.id).select('-password')

            next()

        }catch(error){
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized')
        }
    }

    if(!token){
        res.status(401)
            throw new Error('Not Authorized, No Token')
    }
})

export { protect }