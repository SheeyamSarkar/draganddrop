import asyncHandler from 'express-async-handler';
import ItemSubcategory from '../../models/categorySubcategory/itemSubcategoryModel.js';


//All itemSubcategory
const getAllItemSubcategories = asyncHandler(async (req,res) => {
    const itemSubcategories = await ItemSubcategory.find()

    res.status(200).json(itemSubcategories)
})

//Create itemSubcategory

const setItemSubcategory = asyncHandler(async (req,res) => {

    const {subcategory, item} = req.body
    
    if(!subcategory){
        res.status(400)
        throw new Error('Please Add Category')
    }
    if(!item){
        res.status(400)
        throw new Error('Please Add Item')
    }
    const itemSubcategory = await ItemSubcategory.create({
        subcategory,
        item
    })
    res.status(200).json(itemSubcategory)
})


//Update itemSubcategory
const updateItemSubcategory = asyncHandler(async (req,res) => {

    const {subcategory, item} = req.body

    const itemSubcategory = await ItemSubcategory.findById(req.params.id)

    if(!itemSubcategory){
        res.status(400)
        throw new Error('itemSubcategory Not Found')
    }

    const updateitemSubcategory = {
        subcategory,
        item
    }

    const updateditemSubcategory = await ItemSubcategory.findByIdAndUpdate(req.params.id, updateitemSubcategory, {
        new: true
    })

    res.status(200).json(updateditemSubcategory)
})


//Delete itemSubcategory

const deleteItemSubcategory = asyncHandler(async (req,res) => {
    const itemSubcategory = await ItemSubcategory.findById(req.params.id)

    if(!itemSubcategory){
        res.status(400)
        throw new Error('itemSubcategory Not Found')
    }


    await itemSubcategory.remove()

    res.status(200).json({ id: req.params.id})
})


export {
    getAllItemSubcategories,
    setItemSubcategory,
    updateItemSubcategory,
    deleteItemSubcategory
}

