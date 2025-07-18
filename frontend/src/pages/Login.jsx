import React, { useState } from 'react'

const Login = () => {
  const [ state , setState ] = useState('Sign Up')

  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [name , setName] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()
  }

  return (
    <form className='flex items-center min-h-[80vh] '>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-9px border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? "Create an account" : "Login"}</p>
        <p>Please {state === 'Sign Up' ? "Sign up" : "log in"} to book an appointment</p>
        {
          state === 'Sign Up'  && <div className='w-full'>
            <p>Full Name:</p>
           <input className='border border-zinc-300 rounded w-full mt-1 p-2' type='text' value={name} onChange={(e) => setName(e.target.value)}  required/>
          </div>
        }
        
          
        <div className='w-full'>
          <p>Email:</p>
          <input className='border border-zinc-300 rounded w-full mt-1 p-2' type='text' value={email} onChange={(e) => setEmail(e.target.value)}  required/>
        </div>
        <div className='w-full'>
          <p>Password:</p>
          <input className='border border-zinc-300 rounded w-full mt-1 p-2' type='password' value={password} onChange={(e) => setPassword(e.target.value)}  required/>
        </div>
        <button className='bg-primary text-white w-full py-2 rounded-md text-base'>{state === 'Sign Up' ? "Create an account" : "Login"}</button>
        {
          state === 'Sign Up' ? 
          <p>Already have an account? <span onClick={() => setState('Login')} className='text-primary cursor-pointer underline'>Login Here</span></p>
          : <p>Don't have an account? <span onClick={() => setState('Sign Up')} className='text-primary cursor-pointer underline'>Sign Up Here</span></p>
        }
      </div>
    </form>
  )
}

export default Login