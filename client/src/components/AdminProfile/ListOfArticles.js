import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify';
import { AiFillDelete } from "react-icons/ai";
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "./ListOfArticles.css"
function ListOfArticles() {
    const token=localStorage.getItem('token')
    const axioswithtoken=axios.create({
       baseURL: process.env.REACT_APP_API_BASE_URL,
        headers:{Authorization: `Bearer ${token}`}
    })
    let [articlesList,setArticlesList]=useState([])

    let navigate=useNavigate();

    function ISOtoUTC(iso) {
      let date=new Date(iso).getUTCDate();
      let month=new Date(iso).getUTCMonth();
      let year=new Date(iso).getUTCFullYear();
      return `${date}/${month}/${year}`;
    }

    useEffect(() => {
      const fetchArticles = async () => {
        const res = await axioswithtoken.get('/admin-api/list-of-articles');
        setArticlesList(res.data.articlesList);
      };
      fetchArticles();
    }, []);

    async function DeleteArticle(articleId){
        const response=await axioswithtoken.delete(`/admin-api/delete-article/${articleId}`)
        if(response.data.message==='article successfully deleted'){
            toast.error("Article successfully Deleted")
            const res = await axioswithtoken.get('/admin-api/list-of-articles');
            setArticlesList(res.data.articlesList);
        }
    }

  return (
    <div className='table-container p-2'>
        <h3>Articles List</h3>
        <table className='w-100 table border shadow-lg'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Edit</th>
                        <th>Author</th>
                        <th>Status</th>
                        <th>Delete Article</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        articlesList.map((article)=>(
                            <tr>
                                <td>{article.title}</td>
                                <td>{article.category}</td>
                                <td>{ISOtoUTC(article.dateOfCreation)}</td>
                                <td>{ISOtoUTC(article.dateOfModification)}</td>
                                <td>{article.username}</td>
                                <td>{article.status ? 'Published' : 'Unpublished'}</td>
                                <td style={{color:"red"}}><button onClick={()=>DeleteArticle(article.articleId)} className='btn btn-danger'><AiFillDelete /></button></td>
                            </tr>
                        ))
                    }
                </tbody>
              </table>
    </div>
  )
}

export default ListOfArticles
