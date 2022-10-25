import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const itemCategorySchema = Schema(
    {
        category: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Category'
        },
        item: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Item'
        },
    }
)
export default model('ItemCategory',itemCategorySchema)