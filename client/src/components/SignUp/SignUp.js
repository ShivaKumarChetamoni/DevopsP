import React from 'react'
import {useForm} from 'react-hook-form'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './SignUp.css'
import axios from 'axios'

function SignUp() {
    let {register,handleSubmit,formState:{errors}}=useForm()
    let [err,setErr]=useState('')
    let navigate=useNavigate()

    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    async function FormHandleSubmit(userobj){
        try{
        if(userobj.userType==="user"){
        // console.log(BASE_URL)
        let res=await axiosInstance.post('/user-api/user',userobj)
        if(res.data.message==="user successfully created"){
            navigate('/signin')
        }
        else{
            setErr(res.data.message)
        }
    }
    else if(userobj.userType==="author"){
        let res=await axiosInstance.post('/author-api/user',userobj)
        // console.log(res)
        if(res.data.message==="Author successfully created"){
            navigate('/signin')
        }
        else{
            setErr(res.data.message)
        }
    }
}
catch(err){
    // console.log("Sign Up Error",err)
    setErr(err.response?.data?.message || "Something went wrong. Try again.");
}
    }
  return (
    <div className='w-75 mx-auto p-3 m-0'>
        <div className='formcontain w-50 mx-auto bg-light text-align-left shadow-lg p-2 rounded-2'>
            <h4>Sign Up</h4>
            {/* display user signup error message */}
            {err && err.length!==0 && <p className='text-danger'>{err}</p>}
            <form action="" onSubmit={handleSubmit(FormHandleSubmit)}>
                <div className='usertype m-3 d-flex flex-wrap justify-content-around'>
                    <div className=''>
                        <input type="radio" name="g" id="User" className='form-check-input me-1' value="user"{...register('userType',{required:true})}/>
                        <label htmlFor="User">User</label>
                    </div>
                    <div>
                        <input type="radio" name="g" id="Author" className='form-check-input me-1' value="author" {...register('userType',{required:true})} />
                        <label htmlFor="Author">Author</label>
                    </div>
                </div>
                {errors.userType?.type==="required" && (<p className='text-danger'>Please Select one user Type</p>)}
                <div className='username m-3 '>
                    <input type="text" name="username" id="username" className='form-control mx-auto w-100' placeholder='Username' autoComplete='username' {...register('username',{required:true})}/>
                </div>
                {errors.username?.type==="required" && (<p className='text-danger'>Please Enter Username</p>)}
                <div className='email m-3'>
                    <input type="email" name="email" id="email" placeholder='E-Mail' className='form-control mx-auto w-100' autoComplete='email'{...register('email',{required:true})}/>
                </div>
                {errors.email?.type==="required" && (<p className='text-danger'>Please Enter E-Mail</p>)}
                <div className="password m-3">
                    <input type="password" name="password" id="password" placeholder='Password' className='form-control' {...register('password',{required:true})}/>
                </div>
                 {errors.password?.type==="required" && (<p className='text-danger '>Please Enter Password</p>)}
                <button type='submit' className="btn btn-success">Sign Up</button>
            </form>
        </div>
    </div>
  )
}

export default SignUp
