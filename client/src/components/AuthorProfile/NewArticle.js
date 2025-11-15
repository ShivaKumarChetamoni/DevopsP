import React from 'react'
import {useForm} from 'react-hook-form'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { Form } from 'react-router-dom'
function NewArticle() {
    let navigate=useNavigate()
    let {currentUser}=useSelector(state=>state.userAuthoruserAuthorLoginReducer)
    let {register,handleSubmit}=useForm()
    let token=localStorage.getItem('token')
    const axioswithtoken=axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL,
        headers:{Authorization:`Bearer ${token}`}
    })
    async function FormHandleSubmit(article){
        article.dateOfCreation=new Date();
        article.dateOfModification=new Date();
        article.articleId=Date.now();
        article.username=currentUser.username;
        article.comments=[];
        article.status=true;
      
        let res=await axioswithtoken.post('/author-api/article',article)
        
        if(res.data.message==="article created"){
            toast.success("Article successfully created")
            navigate(`/authorprofile/view-articles/${currentUser.username}`)
        }
    }
  return (
    <div className='mt-4 w-75 mx-auto shadow-lg p-4 bg-white'>
        <h4>Write An Article</h4>
        <form action="" className='text-start' onSubmit={handleSubmit(FormHandleSubmit)}>
            <div className='mb-2'>
                <label className='form-label fs-5' htmlFor="">Title</label>
                <input className='form-control' type="text" name="" id="" {...register('title')}/>
            </div>
            <div className='mb-2'>
                <label htmlFor="" className='form-label fs-5'>Select a Category</label>
                <select name="" id="" className='form-select' {...register("category")}>
                    <option className='form-control' value="Programming">Programming</option>
                    <option className="form-control" value="AI & DS">AI & DS</option>
                    <option value="Machine Learning" className='form-control'>Machine Learning</option>
                </select>
            </div>
            <div className='mb-2'>
                <label className='form-label fs-5' htmlFor="">Content</label>
                <textarea name="" className='form-control' rows="7" id="" {...register("content")}></textarea>
            </div>
            <div className='text-end'>
                <button type="submit" className="btn btn-success">Post</button>
            </div>
        </form>
    </div>
  )
}

export default NewArticle
