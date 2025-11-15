import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
function UserProfile() {
  let {currentUser}=useSelector(state=>state.userAuthoruserAuthorLoginReducer)
  return (
    <div className='p-3'>
      <div className=''>
        <h1 className='fs-1 text-start'>Welcome {currentUser.username}</h1>
        <NavLink className='nav-link fs-3' to="readarticles">Articles</NavLink>
        <Outlet></Outlet>
      </div>      
    </div>
  )
}

export default UserProfile
