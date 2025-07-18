import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>

      <div className='text-center pt-10 text-2xl text-gray-500'>
        <p>CONTACT <span className='font-medium text-gray-700'>US</span></p>
      </div>

      <div className='flex flex-col my-10 md:flex-row gap-10 mb-28 justify-center text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="Contact Us" />
        <div className='flex flex-col justify-center gap-6 items-start'>
          <p className='font-semibold text-lg text-gray-600'>For inquiries, please reach out to us at:</p>
          <p className='text-gray-500'>Email: support@example.com</p>
          <p className='text-gray-500'>Phone: (123) 456-7890</p>
          <p className='text-gray-500'>Address: 123 Main St, Anytown, USA</p>
          <p className='text-gray-500'>We look forward to hearing from you!</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-400'>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact