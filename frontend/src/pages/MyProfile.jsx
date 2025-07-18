import React, { useState } from 'react'
import { assets } from '../assets/assets'

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Edward Vincent",
    image: assets.profile_pic,
    email: "edward.vincent@example.com",
    phone: "+1 234 567 890",
    address: {
      line1: "123 Main St",
      line2: "Apt 4B London",
    },
    gender: "Male",
    dob: "1990-01-01"
  })

  const [isEdit, setIsEdit] = useState(false);


  return (
    <div className='flex flex-col gap-2 text-sm max-w-lg'>
      <img className='w-36 rounded' src={userData.image} alt="Profile" />
      {
        isEdit ?
          <input className='bg-gray-50 mt-4 text-3xl font-medium max-w-60' type='text' value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} />
          : <p className='mt-4 text-3xl font-medium text-neutral-800'>{userData.name}</p>
      }
      <hr  className='border-none h-[1px] bg-zinc-400'/>
      <div>
        <p className='text-neutral-500 underline mt-3'>Contact Info:</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Email</p>
          <p className='text-blue-500'>{userData.email}</p>
          <p className='font-medium'>Phone</p>
          {
            isEdit ?
              <input className='bg-gray-100 max-w-52' type='text' value={userData.phone} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
              : <p className='text-blue-400'>{userData.phone}</p>
          }
          <p className='font-medium'>Address</p>
          {
            isEdit ?
              <>
                <p>
                  <input className='bg-gray-100' type='text' value={userData.address.line1} onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} /><br/>
                <input className='bg-gray-100' type='text' value={userData.address.line2} onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} />
                </p>
              </>
              : <>
                <p className='text-gray-500'>
                  {userData.address.line1}
                  <br/>
                  {userData.address.line2}
                </p>
  
              </>
          }
        </div>
      </div>
      <div>
        <p className='text-neutral-500 underline mt-3'>Basic Info:</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender</p>
          {
            isEdit ?
              <select className='bg-gray-100 max-w-20' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender} >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              :
              <p className='text-gray-400'>{userData.gender}</p>
          }
          <p className='font-medium'>Date of Birth</p>
          {
            isEdit ?
              <input className='bg-gray-100 max-w-20' type='date' value={userData.dob} onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))} />
              : <p className='text-gray-400'>{userData.dob}</p>
          }
        </div>
      </div>

      <div className='mt-10'>
        {
          isEdit ?
            <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={() => setIsEdit(false)} >Save</button>
            : <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={() => setIsEdit(true)}>Edit Profile</button>
        }
      </div>

    </div>
  )
}

export default MyProfile