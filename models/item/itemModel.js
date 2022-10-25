import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const itemSchema = Schema(
    {
        
        name: {
            type: String,
            required: [true, 'Please Add Name'],
        },
        description: {
            type: String,
            required: [true, 'Please Add Description'],
        },
        categoryOrSubcategory: {
            type: Boolean,
            required: [true, 'Please Select Category Or Subcategory'],
        },
        image: {
            type: String,
            required: true,
        }
    }
)

export default model('Item', itemSchema)