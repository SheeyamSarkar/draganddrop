import asyncHandler from 'express-async-handler';
import Card from '../models/cardModels.js';


//All card
const getAllCards = asyncHandler(async (req,res) => {
    const cards = await Card.find()

    res.status(200).json(cards)
})

//Create card
const setCard = asyncHandler(async (req,res) => {

    const {categoryOrSubcategory, name, precedence} = req.body
    
    if(!name){
        res.status(400)
        throw new Error('Please Add Name')
    }
    if(!precedence){
        res.status(400)
        throw new Error('Please Add Precedence')
    }

    const card = await Card.create({
        name,
        precedence,
    })
    res.status(200).json(card)
})


//Update card
const updateCard = asyncHandler(async (req,res) => {

    const {name, precedence} = req.body

    const card = await Card.findById(req.params.id)

    if(!card){
        res.status(400)
        throw new Error('card Not Found')
    }

    const updatecard = {
        name,
        precedence,
    }

    const updatedcard = await Card.findByIdAndUpdate(req.params.id, updatecard, {
        new: true
    })

    res.status(200).json(updatedcard)
})


//Delete card
const deleteCard = asyncHandler(async (req,res) => {
    const card = await Card.findById(req.params.id)

    if(!card){
        res.status(400)
        throw new Error('card Not Found')
    }

    await card.remove()
})

export {
    getAllCards,
    setCard,
    updateCard,
    deleteCard
}

