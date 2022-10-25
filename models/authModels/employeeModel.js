import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const employeeSchema = Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    dp: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export default model('Employee', employeeSchema);