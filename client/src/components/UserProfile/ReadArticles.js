import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import "./ReadArticles.css"
import axios from 'axios'
export default function ReadArticles() {
    const [articlesList,setarticlesList]=useState([])
    const navigate=useNavigate()
     const token=localStorage.getItem('token')
    const axioswithtoken=axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL,
        headers:{Authorization:`Bearer ${token}`}
    }) 
    // async function getData(){
    //     let res=await axioswithtoken.get('http://localhost:4000/user-api/articles/')
    //     setarticlesList(res.data.payload)
    // }
    useEffect(()=>{
        async function getData(){
        let res=await axioswithtoken.get('/user-api/articles/')
        // console.log(res.data.payload)
        setarticlesList(res.data.payload)
    }
        getData()
    },[axioswithtoken])
        
    function goToArticle(article){
        navigate(`/userprofile/article/${article.articleId}`,{state:article})
    }

     function ISOtoUTC(iso) {
      let date=new Date(iso).getUTCDate();
      let month=new Date(iso).getUTCMonth();
      let year=new Date(iso).getUTCFullYear();
      return `${date}/${month}/${year}`;
    }

  return (
    <div>
        <div className='row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-4'>
            {
                articlesList.map((article)=>(
                    <div className='col p-2'>
                        <div className="card custom-card p-2 h-100">
                            <div className="card-head text-start m-0 mb-0 ">
                                <p className='fs-5'><b>{article.title}</b></p>
                            </div>
                            <div className="card-body m-0 mb-0 text-start">
                                <p><b>Content:</b> {article.content.substring(0,80)+"..."}</p>
                            </div>
                            <div className="card-footer text-start">
                                <p><b>Edited:</b> {ISOtoUTC(article.dateOfModification)}</p>
                                <button className='btn btn-dark' onClick={()=>goToArticle(article)}>View More</button>
                            </div>
                        </div>

                    </div>
                ))
            }
        </div> 
    </div>
  )
}
