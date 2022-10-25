import asyncHandler from 'express-async-handler';
import ItemCategory from '../../models/categorySubcategory/itemCategoryModel.js';


//All itemCategory
const getAllItemCategories = asyncHandler(async (req,res) => {
    const itemCategories = await ItemCategory.find()

    res.status(200).json(itemCategories)
})

//Create itemCategory

const setItemCategory = asyncHandler(async (req,res) => {

    const {category, item} = req.body
    
    if(!category){
        res.status(400)
        throw new Error('Please Add Category')
    }
    if(!item){
        res.status(400)
        throw new Error('Please Add Item')
    }
    const itemCategory = await ItemCategory.create({
        category,
        item
    })
    res.status(200).json(itemCategory)
})


//Update itemCategory
const updateItemCategory = asyncHandler(async (req,res) => {

    const {category, item} = req.body

    const itemCategory = await ItemCategory.findById(req.params.id)

    if(!itemCategory){
        res.status(400)
        throw new Error('itemCategory Not Found')
    }

    const updateitemCategory = {
        category,
        item
    }

    const updateditemCategory = await ItemCategory.findByIdAndUpdate(req.params.id, updateitemCategory, {
        new: true
    })

    res.status(200).json(updateditemCategory)
})


//Delete itemCategory

const deleteItemCategory = asyncHandler(async (req,res) => {
    const itemCategory = await ItemCategory.findById(req.params.id)

    if(!itemCategory){
        res.status(400)
        throw new Error('itemCategory Not Found')
    }


    await itemCategory.remove()

    res.status(200).json({ id: req.params.id})
})


export {
    getAllItemCategories,
    setItemCategory,
    updateItemCategory,
    deleteItemCategory
}

