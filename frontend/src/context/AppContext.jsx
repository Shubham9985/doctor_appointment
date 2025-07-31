import React, { createContext, useEffect, useState } from 'react';
import { doctors } from '../assets/assets';
import axios from 'axios'
import { toast } from 'react-toastify'


export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol = '₹';
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors , setDoctors] = useState([]) 
    const [token , setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)

    const [userData , setUserData] = useState(false)

    const calculateAge = (dob) => {
        if (!dob) return 'N/A'
        const today = new Date()
        const birthDate = new Date(dob)
        if (isNaN(birthDate.getTime())) return 'N/A'
        let age = today.getFullYear() - birthDate.getFullYear()
        const m = today.getMonth() - birthDate.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--
        }
        return age
    }

    const months = [" " , "Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "Jul" , "Aug", "Sep" , "Oct" , "Nov","Dec"]

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    const getDoctorsData = async () =>{
        try {
            const {data} = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success) {
                setDoctors(data.doctors)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    } 

    const loadUserProfileData = async () =>{
        try{
            if(!token){
                return
            }
            const {data} = await axios.get(backendUrl + '/api/user/get-profile' , {headers:{token}})

            if(data.success){
                setUserData(data.userData)

            }
            else{
                toast.error(data.message)
            }
        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }

    const value = {
        doctors,getDoctorsData , currencySymbol,
        token,setToken,backendUrl, userData ,
        setUserData, loadUserProfileData,
        calculateAge, slotDateFormat, currency: currencySymbol
    }

    useEffect(()=>{
        getDoctorsData()
    },[])

    useEffect(()=>{
        if(token){
            loadUserProfileData()
        }
        else{
           setUserData(false) 
        }
    },[token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
/* ₹ */