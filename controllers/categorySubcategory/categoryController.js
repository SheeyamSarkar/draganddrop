import asyncHandler from 'express-async-handler';
import Category from '../../models/categorySubcategory/categoryModel.js';

//All Categories
const getAllCategories = asyncHandler(async (req,res) => {
    const categories = await Category.find().sort('name')

    res.status(200).json(categories)
})

//Create Category

const setCategory = asyncHandler(async (req,res) => {
    const {name, description} = req.body;

    if(!name){
        res.status(400)
        throw new Error('Please Add Name')
    }
    if(!description){
        res.status(400)
        throw new Error('Please Add Description')
    }

    const category = await Category.create({
        name,
        description
    })
    res.status(200).json(category)
})


//Update Category
const updateCategory = asyncHandler(async (req,res) => {
    const category = await Category.findById(req.params.id)
    const {name, description} = req.body;
    if(!category){
        res.status(400)
        throw new Error('Category Not Found')
    }

    const updateCategory = {
        name,
        description
    }

    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, updateCategory, {
        new: true
    })

    res.status(200).json(updatedCategory)
})


//Delete Category

const deleteCategory = asyncHandler(async (req,res) => {
    const category = await Category.findById(req.params.id)

    if(!category){
        res.status(400)
        throw new Error('Category Not Found')
    }

    await category.remove()

    res.status(200).json({ id: req.params.id})
})


export {
    getAllCategories,
    setCategory,
    updateCategory,
    deleteCategory
}


