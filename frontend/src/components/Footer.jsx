import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className=" md:mx-10">
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

            {/* left section */}
            <div>
                <img  className='w-40 mb-5' src={assets.logo} alt="Logo" />
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur unde fuga itaque eum reprehenderit, facere provident vel mollitia ad voluptatibus corporis molestias dolorem blanditiis ratione! Distinctio iusto minima facere at!</p>
            </div>

             {/* center section */}
            <div>
                <p className='text-xl font-medium mb-5'>Company</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Services</li>
                </ul>
            </div>

             {/* right section */}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+1234567890</li>
                    <li>prescripto@example.com</li>
                </ul>
            </div>

        </div>

        {/* bottom section */}
        <div>
          <hr/>
          <p className='py-5 text-sm text-center'>© 2023 Prescripto. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer