require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const router = require('./router/index')
const errorMiddleware = require('./middlewares/errorMiddleware')


const POPT = process.env.PORT || 5000 
const app = express()


app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(express.json())
app.use(cookieParser())
app.use('/api', router)
app.use(errorMiddleware)

app.get('/', (req, res) => {
    console.log('works')
    res.status(200).json({message: 'working'})
})

const start = async () =>{
    try{
        await mongoose.connect(process.env.DB_URL, {
             useNewUrlParser: true,
             useUnifiedTopology: true
         })
        app.listen(POPT, () => console.log(`server startted on port ${POPT}`))
    } catch (e){
        console.log(e)
    }
}

start()
