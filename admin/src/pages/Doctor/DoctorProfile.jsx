import React, { useEffect , useState } from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {

  const {dToken , getProfileData , setProfileData ,  profileData , backendURL } = useContext(DoctorContext)
  const {currency  } = useContext(AppContext)

  const [isEdit , setIsEdit] = useState(false)

  const updateProfile = async() =>{
    try {
      const updateData = {
        fees:profileData.fees,
        address:JSON.stringify(profileData.address),
        available:profileData.available
      }

      const {data} = await axios.post(backendURL + '/api/doctor/update-profile' , updateData , {headers:{dToken}})

      if(data.success){
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  return profileData && (
    <div>


      <div className='flex flex-col gap-4 m-5'>


        <div>
          <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt={profileData.name} />
        </div>

        <div className='border border-stone-100 flex-1 rounded-lg p-8 py-7 bg-white'>
          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
          <div className='flex items-center gap-2 mt-1 tect-gryay-600'>
            <p>{profileData.degree} - {profileData.speciality}</p>
            <button className='py-0.5 px-2 text-xs border rounded-full'>{profileData.experience}</button>
          </div>

          <div>
            <p className='flex items-center text-sm font-medium gap-1 text-neutral-800 mt-3'>About:</p>
            <p className='text-sm text-gray-600 mt-1 max-w-[700px]'>{profileData.about}</p>
          </div>

          <p className='font-medium text-gray-600 mt-4'>Appointment fee: <span className='text-gray-800'>{currency} {isEdit ? <input type='number' onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} /> :  profileData.fees}</span></p>

          <div className='flex gap-2 py-2'>
            <p>Address:</p>
            <p className='text-sm'>
              {  isEdit ? <input type='text' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} /> : profileData.address.line1}<br/>
              {isEdit ? <input type='text' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} /> :  profileData.address.line2}
            </p>
          </div>

          <div className='flex gap-1 py-2'>
             <input onChange={() => isEdit &&  setProfileData(prev => ({ ...prev, available: !prev.available }))} checked={profileData.available} type='checkbox' id=''/>
             <label htmlFor=''>Available</label>
          </div>

          {
            isEdit ? <button onClick={updateProfile} className='border-primary text-sm mt-5 px-4 py-1 border rounded-full hover:bg-primary hover:text-white transition-all'>Save</button>
            : <button onClick={() => setIsEdit(true)} className='border-primary text-sm mt-5 px-4 py-1 border rounded-full hover:bg-primary hover:text-white transition-all'>Update Profile</button>
          }
          


        </div>

      </div>

    </div>
  )
}

export default DoctorProfile