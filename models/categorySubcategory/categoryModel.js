import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const categorySchema = Schema(
    {
        
        name: {
            type: String,
            required: [true, 'Please Add Name'],
        },
        description: {
            type: String,
            required: [true, 'Please Add Description'],
        }
    }
)

export default model('Category', categorySchema)