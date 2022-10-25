import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// mongoose.set('debug', true)


const featuredCategorySchema = Schema(
    {
        category: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Category'
        },
        precedence: {
            type: String,
            required: [true, 'Please Add Precedence'],
        }
    }
)
export default model('FeaturedCategory',featuredCategorySchema)