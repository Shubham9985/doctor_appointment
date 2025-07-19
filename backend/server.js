import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'

//app configuration
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//middlewares
app.use(express.json())
app.use(cors) //will conect backend with frontend

//api
app.get('/' , (req,res)=>{
    res.send('API WORKING')
})

app.listen(port , ()=> console.log("Server running at ",port))
