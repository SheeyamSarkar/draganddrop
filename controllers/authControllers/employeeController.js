import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';

import Employee from '../../models/authModels/employeeModel.js';

const { genSalt, hash, compare } = bcrypt;
const { sign } = jwt;

// Get All Employees
const getAllEmployees = asyncHandler (async (req,res) => {
    const employees = await Employee.find()
    res.status(200).json(employees)
})

// Register Employee
const registerEmployee = asyncHandler (async (req,res) => {

    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields')
    }

    if(!req.file) {
        res.status(400)
        throw new Error('Please add an image')
    }

    // Check if employee exists
    const employeeExists = await Employee.findOne({email});
    if (employeeExists) {
        res.status(400);
        throw new Error('Employee already exists')
    }

    // Hash Password
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt)

    const employee = await Employee.create({
        name,
        email,
        password: hashedPassword,
        dp:req.file.path
    })

    if (employee) {
        res.status(201).json({
            _id: employee.id,
            name: employee.name,
            email: employee.email,
            dp: employee.dp,
            token: generateToken(employee._id)
        })
    } else {
        res.status(400);
        throw new Error('Invalid Employee Data');
    }
})

//@description   Login Employee
//@route         POST /api/employees/login
//@access        Public
const loginEmployee = asyncHandler (async (req,res) => {

    const {email, password} = req.body;

    // Check for employee email
    const employee = await Employee.findOne({email})

    if(!employee) {
        res.status(400);
        throw new Error('No employee found with this email');
    }

    // Check if password matches

    if (employee && (await compare(password, employee.password))) {
        res.status(200).json({
            _id: employee.id,
            name: employee.name,
            email: employee.email,
            dp: employee.dp,
            token: generateToken(employee._id)
        })
    } else {
        res.status(400);
        throw new Error('Invalid Credentials');
    }


    // res.json({ message: 'Login Employee' })
})

//@description   Get Employee Data
//@route         POST /api/employees/me
//@access        Private
const getMe = asyncHandler (async (req,res) => {
    res.status(200).json(req.employee)
})

function generateToken(id) {
    return sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}

export {
    getAllEmployees,
    registerEmployee,
    loginEmployee,
    getMe
}