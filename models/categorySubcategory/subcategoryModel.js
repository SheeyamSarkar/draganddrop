import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const subcategorySchema = Schema(
    {
        category: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Category'
        },
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
export default model('Subcategory',subcategorySchema)