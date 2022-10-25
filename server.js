import express from 'express'
import environment from  'dotenv'
import colors from 'colors'
import cors from 'cors'

import {connectDB} from './config/db.js'
import {errorHandler} from './middleware/errorMiddleware.js'

// route imports

//Card
import cardRoutes from './routes/cardRoutes.js'



const dotenv = environment.config()

const port = process.env.PORT

connectDB()
const app = express()

app.use(cors({
    origin: '*'
}))

//middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))


// routes


//cards
app.use('/api/cards', cardRoutes)


app.use(errorHandler)

app.listen(port, () =>console.log(`Server Started On Port ${port}`))