import React from 'react'
import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
function AdminProfile() {
  return (
    <div className=''>
        <h1>Welcome Batman</h1>
        <div className='mx-auto'>
        <div className='d-flex m-5 flex-wrap'>
          <NavLink to="list-of-articles" className='nav-link fs-3 m-3'><b>Articles List</b></NavLink>
          <NavLink to="list-of-authors" className='nav-link fs-3 m-3'><b>Authors List</b></NavLink>
          <NavLink to="list-of-users" className='nav-link fs-3 m-3'><b>Users List</b></NavLink>
        </div>      
        <div className='mx-auto p-2'>
          <Outlet></Outlet>
        </div>
    </div>
    </div>
  )
}

export default AdminProfile
