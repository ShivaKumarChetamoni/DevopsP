import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {resetState} from "../../redux/slices/userAuthorSlice"
function NavigatBar() {
  let {loginUserStatus}=useSelector(state=>state.userAuthoruserAuthorLoginReducer)
  let dispatch=useDispatch()
  function signOut(){
    localStorage.removeItem('token')
    dispatch(resetState())
  }
  return (
    <div className='bg-dark'>
      <ul className='nav justify-content-end fs-5 gap-4'>
        {loginUserStatus===false? <>
        <li className="nav-item">
            <NavLink className='nav-link custom-link' style={{"color":"rgb(255, 255, 255)"}}  to="/">Home</NavLink>
        </li>
        <li className='nav-item'>
            <NavLink className='nav-link' style={{"color":"rgb(255, 255, 255)"}} to="signup">Sign Up</NavLink>
        </li>
        <li className='nav-item'>
            <NavLink className='nav-link' style={{"color":"rgb(255, 255, 255)"}} to="signin">Sign In</NavLink>
        </li> </>:<>
         <li className='nav-item'>
          {/* <p className='fs-4' style={{"color":"rgb(255, 255, 255)"}}>Welcome {currentUser.username}</p> */}
          <NavLink className='nav-link' to="signin" style={{"color":"rgb(255, 255, 255)"}} onClick={signOut}>Signout</NavLink>
        </li>
        </>
}
      </ul>
    </div>
  )
}

export default NavigatBar
