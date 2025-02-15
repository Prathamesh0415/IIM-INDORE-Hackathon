import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

function Register() {
    const [ input, setInput] = useState({
        fullName:'',
        email:'',
        password:'',
        aadharNumber: ''
    })
    const changeHandler = (e) => {
        setInput({...input, [e.target.name]:e.target.value})
    }

    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()
        try{
            const res = await axios.post('http://localhost:3000/krishi/user/register', 
                input,
                {
                    headers:{
                        'Content-Type':'application/json'
                    },
                    withCredentials: true
                }
            )
            if(res.data.success){
                navigate('/login');
                toast.success(res.data.message)
            }
        }catch(error){
            console.log(error)
            toast.error(error.response.data.message)
        }
        //console.log(input)
    }

  return (
    <div className='flex items-center justify-center w-100% h-100% my-[4.5%]'>
        <form onSubmit={submitHandler} action='' className='flex flex-col gap-3 bg-white p-4 w-[20%]'>
            <h1 className='font-bold text-2xl uppercase my-2'>Signup</h1>
            <input 
                className='border border-gray-400 rounded-md px-2 py-1'
                type='text'
                placeholder='name'
                onChange={changeHandler}
                name='fullName'
                value={input.value}
            />
            <input 
                className='border border-gray-400 rounded-md px-2 py-1'
                type='email'
                placeholder='email'
                onChange={changeHandler}
                name='email'
                value={input.email}
            />
            <input 
                className='border border-gray-400 rounded-md px-2 py-1'
                type='password'
                placeholder='password' 
                onChange={changeHandler}
                name='password'
                value={input.password}   
            />
            <input 
                className='border border-gray-400 rounded-md px-2 py-1'
                type='text'
                placeholder='aadhar number' 
                onChange={changeHandler}
                name='aadharNumber'
                value={input.aadharNumber}   
            />
            <button type='submit' className='bg-green-500 p-2 text-white my-2 rounded-md'>Signup</button>
            <p>Already have an account? <Link to={'/login'} className='text-green-600'>Login</Link></p>
        </form>
    </div>
  )
}

export default Register