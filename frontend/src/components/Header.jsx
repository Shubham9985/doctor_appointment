import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>
        { /* left side content */}
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
            <p className='text-white text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight md:leading-tight lg:leading-tight'>
                Book Appointment  <br/> with Trusted Doctors!
            </p>
            <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
                <img  className='w-28' src={assets.group_profiles} alt="group_profiles" />
                <p>Simply Book Appointment with our Trusted Doctors ,<br className='hidden sm:block'/> schedule your visit now!</p>
                
            </div>
            <a href="#speciality" className='flex item-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>
            Book Now <img src={assets.arrow_icon}  className='w-3'/></a>
        </div>

        { /* right side content */}
        <div className='md:w-1/2 relative'>
            <img className='w-full  md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt="header_img" />
        </div>

    </div>
  )
}

export default Header