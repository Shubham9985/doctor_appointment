import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-700' id='speciality'>
        <h1 className='text-3xl font-medium'>Find By Speciality </h1>
        <p className='sm:w-1/3 text-sm text-center'>Simply browse through our list of specialities to find the right doctor for you.</p>
        <div className='flex sm:justify-center gap-4 pt-5 w-full overfull-scroll'>
            {specialityData.map((item,index) =>(
                <Link onClick={() => scrollTo(0,0)} className='flex flex-col text-xs items-center cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' to={`/doctors/${item.speciality}`} key={index}>
                    <img className='w-16 sm:w-24 mb-2' src={item.image} alt={item.speciality}/>
                    <p>{item.speciality}</p>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default SpecialityMenu