import express from 'express'
import { registerUser , loginUser, getProfile , updateProfile, bookAppointment, listAppointment} from '../controllers/userController'
import authUser from '../middlewares/authUser'
import upload from '../middlewares/multer'

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/get-profile',authUser,getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/booke-appointment' , authUser , bookAppointment)
userRouter.get('/appointments' , authUser,listAppointment)




export default userRouter