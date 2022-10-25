import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const cardSchema = Schema(
    {
        
        name: {
            type: String,
            required: [true, 'Please Add Name'],
        },
        precedence: {
            type: Number,
            required: [true, 'Please Add Precedence'],
        }
    }
)

export default model('Card', cardSchema)