import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { AiFillDelete } from "react-icons/ai";
import { toast } from 'react-toastify';
import { useEffect } from 'react'
import "./ListOfArticles.css"
function ListOfAuthors() {

     const token=localStorage.getItem('token')
    const axioswithtoken=axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL,
        headers:{Authorization: `Bearer ${token}`}
    })

    async function DeleteAuthor(username){
        const res=await axioswithtoken.delete(`/admin-api/delete-author/${username}`)
        if(res.data.message==='author deleted successfully'){
            toast.error("Author Deleted Successfully")
        }
        const respon=await axioswithtoken.get('/admin-api/list-of-authors')
        setAuthorsList(respon.data.authorsList)
    }
    
    let [authorsList,setAuthorsList]=useState([])

    useEffect(() => {
          const fetchAuthors = async () => {
            const res = await axioswithtoken.get('/admin-api/list-of-authors');
            setAuthorsList(res.data.authorsList);
          };
          fetchAuthors();
        }, []);

  return (
    <div className='table-container p-2'>
        <h3>Authors List</h3>
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
                        authorsList.map((author)=>(
                            <tr>
                                <td>{author.username}</td>
                                <td>{author.email}</td>
                                <td style={{color:"red"}}><button onClick={()=>DeleteAuthor(author.username)} className='btn btn-danger'><AiFillDelete /></button></td>
                            </tr>
                        ))
                    }
                </tbody>
              </table>
    </div>
  )
}

export default ListOfAuthors
