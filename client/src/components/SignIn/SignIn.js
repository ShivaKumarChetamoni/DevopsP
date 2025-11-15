import React, { useEffect } from 'react'
import "./SignIn.css"
import {useForm} from 'react-hook-form'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userAuthorLoginThunk } from '../../redux/slices/userAuthorSlice'

function SignIn() {
    let {register,handleSubmit,formState:{errors}}=useForm()
    let dispatch=useDispatch()
    let navigate=useNavigate()
    let {loginUserStatus,currentUser,errorOccurred,errMsg}=useSelector(state=>state.userAuthoruserAuthorLoginReducer)
    function FormHandleSubmit(userobj){
        dispatch(userAuthorLoginThunk(userobj))
    }
    useEffect(()=>{
        if(loginUserStatus && currentUser.userType==='user'){
        navigate('/userprofile')
        }
        else if(loginUserStatus && currentUser.userType==='author'){
            navigate('/authorprofile')
        }
        else if(loginUserStatus && (currentUser.username==='admin' || currentUser.username==='roninx23')){
            navigate('/adminprofile')
        }
    },[loginUserStatus,currentUser,navigate])
  return (
    <div className='dim w-75 mx-auto p-3 m-0 '>
         <div className='formcontain w-50 bg-light mx-auto p-2 shadow-lg rounded-2'>
            <h4>Sign In</h4>
            <form action="" className='mx-auto' onSubmit={handleSubmit(FormHandleSubmit)}>
                <div className='usertype m-3 d-flex flex-wrap justify-content-around'>
                    <div className=''>
                        <input type="radio" name="g" id="User" className='form-check-input me-1 ' value="user" {...register('userType',{required:true})}/>
                        <label htmlFor="User">User</label>
                    </div>
                    <div>
                        <input type="radio" name="g" id="Author" className='form-check-input me-1' value="author"{...register('userType',{required:true})} />
                        <label htmlFor="Author">Author</label>
                    </div>
                    <div>
                        <input type="radio" name="g" id="Admin" className='form-check-input me-1' value="admin"{...register('userType',{required:true})} />
                        <label htmlFor="Admin">Admin</label>
                    </div>
                </div>
                 {errors.userType?.type==="required" && (<p className='text-danger'>Please Select one user Type</p>)}
                <div className='username m-3 '>
                    <input type="text" name="username" id="username" className='form-control mx-auto' placeholder='Username'{...register('username',{required:true})}/>
                </div>
                {errors.username?.type==="required" && (<p className='text-danger'>Please Enter Username</p>)}
                <div className="password m-3">
                    <input type="password" name="password" id="password" placeholder='Password' className='form-control' {...register('password',{required:true})}/>
                </div>
                {errors.password?.type==="required" && (<p className='text-danger '>Please Enter Password</p>)}
                <button type="submit" className="btn btn-success">Sign In</button>
                {errorOccurred && <p className='text-danger'>{errMsg}</p>}
            </form>
        </div>
    </div>
  )
}

export default SignIn
