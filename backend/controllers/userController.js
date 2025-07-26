import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'


const registerUser = async (req,res) =>{
    try {
        
        const {name , email , password} = req.body

        if(!name || !email || !password){
            return res.json({success:false , message:"missing details"})
        }

        if(!validator.isEmail()){
            return res.json({success:false , message:"invalid email"})
        }

        if(password.length < 8){
            return res.json({success:false , message:"weak password"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const userData = {
            name,
            email,
            password : hashedPassword
        }

        const newUser = new userModel(userData);
        const user = await newUser.save()

        const token = jwt.sign({id:user._id} , process.env.JWT_SECRET)

        res.json({success:true,token})

    } catch (error) {
        console.log((error));
        res.json({success:false , message:error.message})
        
    }
}


const loginUser = async (req,res) => {
    try{
        const {email,password} = req.body
        const user = await userModel.findOne({email})
        
        if(!user){
            return res.json({success:false , message:"user doesn't exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if (isMatch) {
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"invallid credentials"})
        }

    }catch(error){
        console.log((error));
        res.json({success:false , message:error.message})
    }
}

const getProfile = async (req,res)=>{
    try{
        const {userId} = req.body
        const userData = await userModel.findById(userId).select('-password')

        res.json({success:true , userData})
    }catch(error){
        console.log((error));
        res.json({success:false , message:error.message})
    }
}

const updateProfile = async(req,res) =>{
    try {
        const {userId,name,phone,address,dob,gender} = req.body
        const imageFile = req.file

        if(!name  || !phone || !dob || !gender){
            return res.json({success:false,message:"data mising"})
        }

        await userModel.findByIdAndUpdate(userId , {name, phone, address:JSON.parse(address), dob, gender})

        if(imageFile){
            const imageUpload = await cloudinary.uploader.upload(imageFile.path , {resource_type : 'image'})

            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId,{image:imageURL})

        }

        res.json({success:true,message:"profile updated"})

    } catch (error) {
        console.log((error));
        res.json({success:false , message:error.message})
    }
}


const bookAppointment = async(req,res) =>{
    try {
        const {userId , docId , slotDate , slotTime } = req.body

        const docData = await doctorModel.findById(docId).select('-password')

        if(!docData.availiable){
            return res.json({success:false , message:"doctor nott availiable"})
        }

        let slots_booked = docData.slots_booked

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({success:false , message:"slot nott availiable"})
            }
            else{
                slots_booked[slotDate].push(slotTime)
            }
        }
        else{
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')

        delete docData.slots_booked //deleting because we dont want the history of slots booked of the doctor

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount : docData.fees,
            slotTime,
            slotDate , 
            date: Date.now()

        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        await doctorModel.findByIdAndUpdate(docId , {slots_booked})

        res.json({success:true , message:"appointment booked"})


    } catch (error) {
        console.log((error));
        res.json({success:false , message:error.message})
    }
}

const listAppointment = async(req,res) =>{
    try {
        const {userId} = req.body
        const appointments = await appointmentModel.find({userId})

        res.json({success:true , appointments})


    } catch (error) {
        console.log((error));
        res.json({success:false , message:error.message})
    }
}

export {registerUser , loginUser , getProfile , updateProfile , bookAppointment , listAppointment} 