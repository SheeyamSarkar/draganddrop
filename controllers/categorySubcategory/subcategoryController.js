import asyncHandler from 'express-async-handler';
import Subcategory from '../../models/categorySubcategory/subcategoryModel.js';


//All subcategory
const getAllSubcategories = asyncHandler(async (req,res) => {
    const subcategories = await Subcategory.find()

    res.status(200).json(subcategories)
})

//Create subcategory

const setSubcategory = asyncHandler(async (req,res) => {

    const {category, name, description} = req.body
    
    if(!category){
        res.status(400)
        throw new Error('Please Add Category')
    }
    if(!name){
        res.status(400)
        throw new Error('Please Add Name')
    }
    if(!description){
        res.status(400)
        throw new Error('Please Add Description')
    }

    const subcategory = await Subcategory.create({
        category,
        name,
        description
    })
    res.status(200).json(subcategory)
})


//Update subcategory
const updateSubcategory = asyncHandler(async (req,res) => {

    const {category, name, description} = req.body

    const subcategory = await Subcategory.findById(req.params.id)

    if(!subcategory){
        res.status(400)
        throw new Error('subcategory Not Found')
    }

    const updatesubcategory = {
        category,
        name,
        description
    }

    const updatedsubcategory = await Subcategory.findByIdAndUpdate(req.params.id, updatesubcategory, {
        new: true
    })

    res.status(200).json(updatedsubcategory)
})


//Delete subcategory

const deleteSubcategory = asyncHandler(async (req,res) => {
    const subcategory = await Subcategory.findById(req.params.id)

    if(!subcategory){
        res.status(400)
        throw new Error('subcategory Not Found')
    }


    await subcategory.remove()

    res.status(200).json({ id: req.params.id})
})


export {
    getAllSubcategories,
    setSubcategory,
    updateSubcategory,
    deleteSubcategory
}

