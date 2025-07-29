import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const Dashboard = () => {

  const {aToken , getDashData , dashData , cancelAppointment} = useContext(AdminContext)
  const {calculateAge , slotDateFormat , currency} = useContext(AppContext)

  useEffect(()=>{
    if(aToken){
      getDashData()
    }
  },[aToken])

  return (
    <div>

    </div>
  )
}

export default Dashboard