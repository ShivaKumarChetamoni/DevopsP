import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { AiFillDelete } from "react-icons/ai";
import { toast } from 'react-toastify';
import { useState } from 'react'
import "./ListOfArticles.css"
function ListOfUsers() {
    const token=localStorage.getItem('token')
    const axioswithtoken=axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
        headers:{Authorization: `Bearer ${token}`}
    }
    )

    async function DeleteUser(username){
        const res=await axioswithtoken.delete(`/admin-api/delete-user/${username}`)
        // console.log(res)
        if(res.data.message==='user successfully deleted'){
            toast.error("User Successfully Deleted")
        }
        const response=await axioswithtoken.get(`/admin-api/list-of-users`)
        setuserslist(response.data.usersList)
    }
    let[userslist,setuserslist]=useState([])
    useEffect(() => {
  const fetchUsers = async () => {
    const res = await axioswithtoken.get('/admin-api/list-of-users');
    setuserslist(res.data.usersList);
  };
  fetchUsers();
}, []);
  return (
    <div className='table-container p-2'>
        <h3>Users List</h3>
      <table className='w-100 table border shadow-lg'>
        <thead>
            <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Delete User</th>
            </tr>
        </thead>
        <tbody>
            {
                userslist.map((user)=>(
                    <tr>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td style={{color:"red"}}><button onClick={()=>DeleteUser(user.username)} className='btn btn-danger'><AiFillDelete /></button></td>
                    </tr>
                ))
            }
        </tbody>
      </table>
    </div>
  )
}

export default ListOfUsers
