import React from 'react'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);
  return (
    <div>
      <p className='pb-3 mt-12 text-zinc-700 font-medium border-b'>My Appointments</p>
      <div>
        {doctors.slice(0,3).map((item,index) =>(
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
              <div >
                <img className='bg-indigo-50 w-32' src={item.image} alt={item.name} />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{item.name}</p>
                <p>{item.speciality}</p>
                <p className='text-zinc-700 mt-1 font-medium'>Address:</p>
                <p className='text-xs'>{item.address.line1}</p>
                <p className='text-xs'>{item.address.line2}</p>
                <p className='text-xs mt-1'><span className='text-sm font-medium text-neutral-700'>Date & Time:</span>10, August, 2025| 10:00 AM</p>
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