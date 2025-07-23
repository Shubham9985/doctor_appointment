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
app.use(cors) //will conect backend with frontend

//api endpoint
app.use('/api/admin',adminRouter) 
app.use('api/docotr' , doctorRouter)
app.use('/api/user',userRouter)
//localhost:400/api/admin


app.get('/' , (req,res)=>{
    res.send('API WORKING')
})

app.listen(port , ()=> console.log("Server running at ",port))
