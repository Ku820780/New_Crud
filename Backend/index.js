const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const userRouter = require('./Routes/userRoutes.js')
const productRouter = require('./Routes/productController.js')
const app = express()

const PORT = process.env.DB_RUNING_PORT || 5400;

app.use(express.json())
app.use(cors({
    origin:['http://localhost:3000'],
    methods:['POST','GET','PUT','DELETE'],
    credentials:true
}))

/*ROUTES */
app.use('/user', userRouter)
app.use('/product', productRouter)

app.listen(PORT,()=>{
    console.log(`Server Running on ${PORT}`)
})