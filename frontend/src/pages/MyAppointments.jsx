import { useState , useEffect } from 'react'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MyAppointments = () => {
  const { backendUrl , token , getDoctorsData } = useContext(AppContext);

  const [appointments , setAppointments] = useState([])

  const months = [" " , "Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "Jul" , "Aug", "Sep" , "Oct" , "Nov","Dec"]

  const slotDateFormat = (slotDate) =>{
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2] 
  }

  const navigate = useNavigate()

  const getUserAppointments = async () =>{
    try {
      const {data} = await axios.get(backendUrl + '/api/user/appointments' , {headers:{token}})

      if(data.success){
        setAppointments(data.appointments.reverse())
      }
    } catch (error) { 
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentID) =>{
    try {
      const {data } =  await axios.post(backendUrl + '/api/user/cancel-appointment' , {appointmentId: appointmentID} , {headers:{token}})
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
      key : import.meta.env.VITE_RAZORPAY_KEY_ID ,
      amount : order.amount,
      currency : order.currency ,
      name : 'Appointment Payment' ,
      description : 'Appointment Payment',
      order_id : order.id ,
      receipt : order.receipt ,
      handler : async (response) =>{
        console.log(response);
        try{
            const {data} = await axios.post(backendUrl + '/api/user/verify-razorpay' , response , {headers:{token}})
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

    if (window.Razorpay) {
      const rzp = new window.Razorpay(options)
      rzp.open()
    } else {
      toast.error('Payment gateway not available')
    }
  }

  const appointmentRazorpay = async(appointmentID)=>{
    try {
      const {data} = await axios.post(backendUrl + '/api/user/payment-razorpay' , {appointmentId: appointmentID} , {headers:{token}})
      if(data.success){
        initPay(data.order)
      } else {
        toast.error(data.message)
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
                {!item.cancelled && item.payment && !item.isCompleted && <button className='sm:min-w-48 border py-2 rounded text-stone-500 bg-indigo-50'>Paid</button>}
                {!item.cancelled && !item.payment && !item.isCompleted && <button onClick={() => appointmentRazorpay(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-500'>Pay Online</button>}
                {!item.cancelled && !item.isCompleted &&  <button onClick={()=>cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded  hover:bg-red-700 hover:text-white transition-all duration-500'>Cancel Appointment</button> }
                {item.cancelled && !item.isCompleted &&  <button className='sm:min-w-48 border py-2 border-red-500 rounded text-red-500'>Appointment Canceled</button>}
                {item.isCompleted && <button className='sm:min-w-48 border py-2 border-green-500 rounded text-green-500'>Appointment Completed</button>}
              </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments