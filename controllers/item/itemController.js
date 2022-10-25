import fs from 'fs'
import asyncHandler from 'express-async-handler';
import Item from '../../models/item/itemModel.js';


//All item
const getAllItems = asyncHandler(async (req,res) => {
    const items = await Item.find()

    res.status(200).json(items)
})

//Create item

const setItem = asyncHandler(async (req,res) => {

    const {categoryOrSubcategory, name, description} = req.body
    
    if(!categoryOrSubcategory){
        res.status(400)
        throw new Error('Please Select CategoryOrSubcategory')
    }
    if(!name){
        res.status(400)
        throw new Error('Please Add Name')
    }
    if(!description){
        res.status(400)
        throw new Error('Please Add Description')
    }
    if(!req.file) {
        res.status(400)
        throw new Error('Please add Image')
    }

    const item = await Item.create({
        categoryOrSubcategory,
        name,
        description,
        image:req.file.path
    })
    res.status(200).json(item)
})


//Update item
const updateItem = asyncHandler(async (req,res) => {

    const {categoryOrSubcategory, name, description} = req.body

    const item = await Item.findById(req.params.id)

    if(!item){
        res.status(400)
        throw new Error('item Not Found')
    }

    if(!req.file) {
        res.status(400)
        throw new Error('Please add Image')
    }

    const updateitem = {
        categoryOrSubcategory,
        name,
        description,
        image:req.file.path
    }

    const updateditem = await Item.findByIdAndUpdate(req.params.id, updateitem, {
        new: true
    })

    fs.unlinkSync(item.image)

    res.status(200).json(updateditem)
})


//Delete item

const deleteItem = asyncHandler(async (req,res) => {
    const item = await Item.findById(req.params.id)

    if(!item){
        res.status(400)
        throw new Error('item Not Found')
    }


    await item.remove()

    fs.unlinkSync(item.image)

    res.status(200).json({ id: req.params.id})
})


export {
    getAllItems,
    setItem,
    updateItem,
    deleteItem
}

