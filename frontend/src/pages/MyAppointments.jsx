import React, { useState , useEffect } from 'react'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MyAppointments = () => {
  const { backendURL , token , getDoctorsData } = useContext(AppContext);

  const [appointments , setAppointments] = useState([])

  const months = [" " , "Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "Jul" , "Aug", "Sep" , "Oct" , "Nov","Dec"]

  const slotDateFormat = (slotDate) =>{
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2] 
  }

  const navigate = useNavigate()

  const getUserAppointments = async () =>{
    try {
      const {data} = await axios.get(backendURL + '/api/user/appointment' , {headers:{token}})

      if(data.success){
        setAppointments(data.appointments.reverse)
      }
    } catch (error) { 
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentID) =>{
    try {
      const {data } =  await axios.post(backendURL + '/api/user/cancel-appointment' , {appointmentID} , {headers:{token}})
      if(data.success){
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      }
      else{
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const initPay =  (order) =>{

    const options = {
      key : import.meta.env.VITE.RAZORPAY_KEY_ID , 
      amount : order.amount,
      currency : order.currency , 
      name : 'Appointment Payment' ,
      description : 'Appointment Payment',
      order_id : order.id ,
      receipt : order.receipt , 
      handler : async (response) =>{
        console.log(response);
        try{
            const {data} = await axios.post(backendURL + '/api/user/verify-razorpay' , response , {headers:{token}})
            if(data.success){
              toast.success(data.message)
              getUserAppointments()
              navigate('/my-appointments')
              
            }
        }catch(error){
          toast.error(error.message)
          console.log(error)
        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const appointmentRazorpay = async(appointmentID)=>{
    try {
      const {data} = await axios.post(backendURL + '/api/user/payment-razorpay' + {appointmentID} , {headers:{token}})
      if(data.success){
        initPay(data.order)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(token){
      getUserAppointments()
    }

  },[token])

  return (
    <div>
      <p className='pb-3 mt-12 text-zinc-700 font-medium border-b'>My Appointments</p>
      <div>
        {appointments.map((item,index) =>(
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
              <div >
                <img className='bg-indigo-50 w-32' src={item.docData.image} alt="" />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <p className='text-zinc-700 mt-1 font-medium'>Address:</p>
                <p className='text-xs'>{item.docData.address.line1}</p>
                <p className='text-xs'>{item.docData.address.line2}</p>
                <p className='text-xs mt-1'><span className='text-sm font-medium text-neutral-700'>Date & Time:</span> {slotDateFormat(item.slotDate)}|  {item.slotTime}</p>
              </div>
              <div></div>
              <div className='flex flex-col gap-2 justify-end'>
                {!item.cancelled && item.payment && <button className='sm:min-w-48 border py-2 rounded text-stone-500 bg-indigo-50'>Paid</button>}
                {!item.cancelled && item.payment && <button onClick={() => appointmentRazorpay(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-500'>Pay Online</button>}
                {!item.cancelled && <button onClick={()=>cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded  hover:bg-red-700 hover:text-white transition-all duration-500'>Cancel Appointment</button> }
                {item.cancelled && <button className='sm:min-w-48 border py-2 border-red-500 rounded text-red-500'>Appointment Canceled</button>}
              </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments