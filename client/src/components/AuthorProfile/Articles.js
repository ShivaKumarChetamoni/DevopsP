import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import "./Articles.css"
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Articles() {
    const {currentUser}=useSelector(state=>state.userAuthoruserAuthorLoginReducer)
    const [articlesList,setarticlesList]=useState([])
    const navigate=useNavigate()
    const token=localStorage.getItem('token')
    const axioswithtoken=axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL,
        headers:{Authorization:`Bearer ${token}`}
    }) 
    // async function getData(){
    //     let res=await axioswithtoken.get(`http://localhost:4000/author-api/articles/${currentUser.username}`)
    //     setarticlesList(res.data.payload)
    // }
    useEffect(()=>{
        async function getData(){
        let res=await axioswithtoken.get(`/author-api/articles/${currentUser.username}`)
        setarticlesList(res.data.payload)
    }
        getData()
    },[axioswithtoken, currentUser.username])

    function goToArticle(article){
        navigate(`/authorprofile/article/${article.articleId}`,{state:article})
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
                        <div className="card custom-card p-2 h-100 ">
                            <div className="card-head text-start m-0 mb-0 d-flex justify-content-around">
                                <p className='fs-5 me-4'><b>{article.title}</b></p>
                                {article.status===false && (<p className='text-danger'><b>D</b></p>)}
                            </div>
                            <div className="card-body m-0 mb-0 text-start">
                                <p><b>Content:</b> {article.content.substring(0,80)+"..."}</p>
                            </div>
                            <div className="card-footer text-start">
                                <p><b>Edited:</b>  {ISOtoUTC(article.dateOfModification)}</p>
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

export default Articles
