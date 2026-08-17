import axios from 'axios'
import React, { useState } from 'react'
import { VITE_BACKEND_URL } from '../API/api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
 
  const [name, setName] = useState('')
  const [email, setEmail]= useState('')
  const [password , setPassword] = useState('')
   const navigate = useNavigate()

const [currentstate , setCurrentState] = useState('Login') 

const onSubmitHandler = async (event:React.FormEvent<HTMLFormElement>) =>{
event.preventDefault()
 
try {
  if (currentstate === "register") {
    const { data } = await axios.post(
      `${VITE_BACKEND_URL}/api/user/register`,
      {
        name,
        email,
        password,
      }
    );

    if (data.success) {
      toast.success(data.message);
      localStorage.setItem("token", data.token);
      setName("");
      setEmail("");
      setPassword("");
      window.location.reload()
    } else {
      toast.error(data.message);
    }
  
  } else {
    const { data } = await axios.post(
      `${VITE_BACKEND_URL}/api/user/login`,
      {
        email,
        password,
      }
    );

    if (data.success) {
      toast.success(data.message);
      localStorage.setItem("token", data.token);
      navigate('/') 
      setEmail("");
      setPassword("");
      window.location.reload()
    } else {
      toast.error(data.message);
    }
  }

} catch (error: any) {
  toast.error(error.response?.data?.message || error.message);
}
  
}

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'> 
       <div className='inline-flex items-center gap-2 mb-2 mt-10'>
           <p className='prata-regular text-3xl'>{currentstate}</p>
           <hr  className='border-none w-8 h-[2px] bg-gray-800'/>
       </div>
     {currentstate === 'Login' ? "" :
        <input onChange={(e)=>setName(e.target.value)} value={name} type="text"  className='w-full px-3 py-2 border border-gray-800 ' placeholder='Name'   required/>
     }
       <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800 ' placeholder='Email'   required/>
       <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800 ' placeholder='Password' required  />
        <div className='w-full flex justify-between text-sm mt-[-8px]'>
           <p className='cursor-pointer'>Forgot Your password?</p>
           {
            currentstate === 'Login' ? <p onClick={()=>setCurrentState("Sign UP")} className='cursor-pointer'>Create Account</p> :
                                       <p onClick={()=>setCurrentState("Login")}  className='cursor-pointer'>Login Here</p>
           }
        </div>
        <button  className='bg-black text-white font-light px-6 cursor-pointer    py-2  mt-5'>{currentstate === 'Login' ? "Sign In" :'Sign UP'}</button>
    </form>
  ) 
}

export default Login