import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
/*import { setAuthUser } from '../redux/appSlice'
import { useDispatch } from 'react-redux'*/

function Login() {

  const [ input, setInput] = useState({
    email:'',
    password:''
})
const changeHandler = (e) => {
    setInput({...input, [e.target.name]:e.target.value})
}

const navigate = useNavigate()
//const dispatch = useDispatch()

const submitHandler = async (e) => {
    e.preventDefault()
    try{
        const res = await axios.post('http://localhost:3000/krishi/user/login', 
            input,
            {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials: true
            }
        )
        if(res.data.success){
            //dispatch(setAuthUser(res.data.user))
            navigate("/home");
            toast.success(res.data.message)
        }
    }catch(error){
        console.log(error)
        toast.error(error.response.data.message)
        
    }
    //console.log(input)
}

  return (
    <div className='flex items-center justify-center w-100% h-100% my-[7.5%]'>
        <form action='' onSubmit={submitHandler} className='flex flex-col gap-3 bg-white p-4 w-[20%]'>
            <h1 className='font-bold text-2xl uppercase my-2'>Login</h1>
            <input 
                className='border border-gray-400 rounded-md px-2 py-1'
                type='email'
                placeholder='email'
                name='email'
                value={input.email}
                onChange={changeHandler}
            />
            <input 
                className='border border-gray-400 rounded-md px-2 py-1'
                type='password'
                placeholder='password'
                name='password'
                value={input.password}
                onChange={changeHandler}    
            />
            <button type='submit' className='bg-green-500 p-2 text-white my-2 rounded-md'>Login</button>
            <p>Dont have an account? <Link to={'/signup'} className='text-green-600'>Signup</Link></p>
        </form>
    </div>
  )
}

export default Login