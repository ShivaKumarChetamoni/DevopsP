import React from 'react'
import "./AuthorProfile.css"
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
function AuthorProfile() {
  let {currentUser}=useSelector(state=>state.userAuthoruserAuthorLoginReducer)
  return (
      <div className='p-3'>
      <div className=''>
        <h3 className='fs-1 text-start'>Welcome {currentUser.username}</h3>
        <div className='authorprofile d-flex justify-content-around fs-2'>
           <NavLink className='nav-link p-2' to={`view-articles/${currentUser.username}`}>View Articles</NavLink>
           <NavLink className='nav-link p-2' to="new-article">Add New Article</NavLink>
        </div>
        <Outlet></Outlet>
      </div>      
    </div>
  )
}

export default AuthorProfile
