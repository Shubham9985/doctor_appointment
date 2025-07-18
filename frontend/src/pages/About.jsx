import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-center pt-10 text-2xl text-gray-500'>
        <p>ABOUT <span className='font-medium text-gray-700'>US</span></p>
      </div>

      <div className='flex flex-col my-10 gap-12 md:flex-row'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="About Us" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis magnam harum accusantium earum ipsum voluptate ipsam praesentium cum, cumque nihil, omnis totam, repudiandae asperiores error culpa dolorem consequatur. Consequuntur, quia!</p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut impedit ea odit et obcaecati repellendus, dolorem laborum laboriosam recusandae aliquid fugiat, a ad sed dolorum debitis aliquam molestiae libero modi!</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum quasi et quod atque beatae! Qui, ratione doloremque! Maxime perspiciatis ipsam nemo. Harum perferendis placeat architecto earum aut veniam, vero laborum.</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US?</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='flex flex-col gap-5 border px-10 py-8 sm:px-16 sm:py-16 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Efficiency:</b>
          <p>We streamline processes to save you time and resources.</p>
        </div>
        <div className='flex flex-col gap-5 border px-10 py-8 sm:px-16 sm:py-16 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Convenience:</b>
          <p>Our services are designed to be user-friendly and accessible.</p>
        </div>
        <div className='flex flex-col gap-5 border px-10 py-8 sm:px-16 sm:py-16 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Personalization:</b>
          <p>We offer tailored solutions to meet your unique needs.</p>
        </div>
      </div>


    </div>
  )
}

export default About