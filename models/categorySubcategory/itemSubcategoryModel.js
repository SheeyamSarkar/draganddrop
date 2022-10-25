import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const itemSubcategorySchema = Schema(
    {
        subcategory: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Subcategory'
        },
        item: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Item'
        },
    }
)
export default model('ItemSubategory',itemSubcategorySchema)