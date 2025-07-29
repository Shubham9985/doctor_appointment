import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoutes.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

//app configuration
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//middlewares
app.use(express.json())
app.use(cors()) //fixed: added parentheses to call cors

//api endpoint
app.use('/api/admin',adminRouter) 
app.use('/api/doctor' , doctorRouter) //fixed: typo 'docotr' -> 'doctor'
app.use('/api/user',userRouter)

app.get('/' , (req,res)=>{
    res.send('API WORKING')
})

app.listen(port, ()=> console.log("Server Started",port)) //fixed: typo 'Server running at' -> 'Server Started'
