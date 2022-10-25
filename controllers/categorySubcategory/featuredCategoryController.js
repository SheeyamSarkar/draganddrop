import asyncHandler from 'express-async-handler';
import Category from '../../models/categorySubcategory/categoryModel.js';
import FeaturedCategory from '../../models/categorySubcategory/featuredCategoryModel.js';
import mongoose from 'mongoose';


//All featuredCategory
const getAllFeaturedCategories = asyncHandler(async (req,res) => {
    const featuredCategories = await FeaturedCategory.find().populate('category')

    res.status(200).json(featuredCategories)
})

//Create featuredCategory
const setFeaturedCategory = asyncHandler(async (req,res) => {

    const {category, precedence} = req.body
    
    if(!category){
        res.status(400)
        throw new Error('Please Add Category')
    }
    if(!precedence){
        res.status(400)
        throw new Error('Please Add Precedence')
    }
    //check Category
    const categoryId = await Category.findById(category)

    if(!categoryId){
        res.status(400)
        throw new Error('This Category Is Not Listed')
    }

    //check Category In FeaturedCategory Table
    const cat = await FeaturedCategory.find({category: mongoose.Types.ObjectId (category)})

    console.log(cat)
//POPULATE
    if(cat.length > 0){
        res.status(400)
        throw new Error('This Category Is Already Featured')
    } 
    const featuredCategory = await FeaturedCategory.create({
        category,
        precedence
    })
    res.status(200).json(featuredCategory)
    
})

//Update featuredCategory
const updateFeaturedCategory = asyncHandler(async (req,res) => {

    const {category, precedence} = req.body

    const featuredCategory = await FeaturedCategory.findById(req.params.id)

    if(!featuredCategory){
        res.status(400)
        throw new Error('featuredCategory Not Found')
    }

    const updatefeaturedCategory = {
        category,
        precedence
    }

    const updatedfeaturedCategory = await FeaturedCategory.findByIdAndUpdate(req.params.id, updatefeaturedCategory, {
        new: true
    })

    res.status(200).json(updatedfeaturedCategory)
})


//Delete featuredCategory
const deleteFeaturedCategory = asyncHandler(async (req,res) => {
    const featuredCategory = await FeaturedCategory.findById(req.params.id)

    if(!featuredCategory){
        res.status(400)
        throw new Error('featuredCategory Not Found')
    }


    await featuredCategory.remove()

    res.status(200).json({ id: req.params.id})
})


export {
    getAllFeaturedCategories,
    setFeaturedCategory,
    updateFeaturedCategory,
    deleteFeaturedCategory
}

