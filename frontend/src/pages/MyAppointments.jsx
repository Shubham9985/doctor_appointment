import React, { useState } from 'react'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointments = () => {
  const { backendURL , token  } = useContext(AppContext);

  const [appointments , setAppointments] = useState([])

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
                <p className='text-xs mt-1'><span className='text-sm font-medium text-neutral-700'>Date & Time:</span> {item.slotDate }|  {item.slotTime}</p>
              </div>
              <div></div>
              <div className='flex flex-col gap-2 justify-end'>
                <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-500'>Pay Online</button>
                <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded  hover:bg-red-700 hover:text-white transition-all duration-500'>Cancel Appointment</button>
              </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments