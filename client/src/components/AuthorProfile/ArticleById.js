import React from 'react'
import { useState } from 'react';
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { FaComments } from "react-icons/fa6";
import { RiEditFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
function ArticleById() {

  let {currentUser}=useSelector(state=>state.userAuthoruserAuthorLoginReducer)
  
  let {state}=useLocation()
  let navigate=useNavigate()
  
  let {register,handleSubmit,formState:{errors}}=useForm()
  // let [comment,setcomm]=useState('')
  let [editstatus,seteditstatus]=useState(false)

  function Editstatus(){
    seteditstatus(true)
  }

 async function SetEditStatus(modifiedArticle){
    let editedArticle={...state,...modifiedArticle}
    editedArticle.dateOfModification=new Date();
    // console.log(editedArticle)
    delete editedArticle._id;
    let res=await axioswithtoken.put('/author-api/article',editedArticle)
    if(res.data.message==='article modified'){
      seteditstatus(false)
      toast.success("Edited Successfully")
      navigate(`/authorprofile/article/${editedArticle.articleId}`,{state:res.data.article})
    }
  }

  async function DeleteArticle(){
    let deletedArticle={...state}
    // console.log(deletedArticle)
    let res=await axioswithtoken.put(`/author-api/article/${state.articleId}`,deletedArticle)
    if(res.data.message==='Article removed'){
      toast.warn("Article deleted")
      navigate('/authorprofile')
    }
  }

  async function ViewArticle(){
    let viewedArticle={...state}
    let res=await axioswithtoken.put(`/author-api/article/${state.articleId}`,viewedArticle)
    // console.log(res)
    if(res.data.message==='Article opened'){
      toast.success("Article can be viewed")
      navigate('/authorprofile')
    }
  }
  let token=localStorage.getItem('token')
  const axioswithtoken=axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
        headers:{Authorization:`Bearer ${token}`}
  })

  async function FormHandleSubmit(comment){
    let article={...state}
    comment.username=currentUser.username;
    // console.log(comment)
    // console.log(typeof state.articleId)
    const res=await axioswithtoken.post(`/user-api/comment/${state.articleId}`,comment)
    // console.log(res)
    if(res.data.message==='comment posted'){
      // setcomm(res.data.message)
      toast.success("Comment posted successfully!")
      navigate(`/userprofile/article/${article.articleId}`,{state:res.data.payload})
    }
  }
  function ISOtoUTC(iso) {
      let date=new Date(iso).getUTCDate();
      let month=new Date(iso).getUTCMonth();
      let year=new Date(iso).getUTCFullYear();
      return `${date}/${month}/${year}`;
    }

  return (
    <div className='page text-start bg-white shadow-lg p-3'>
      {editstatus===false ? <>
      <div className='top d-flex justify-content-between'>
        <div className='left'>
        <p className='fs-1'><b>{state.title}</b></p>
        <div className='d-flex justify-content-start'>
          <p className='fs-5 me-4'>Created: {ISOtoUTC(state.dateOfCreation)}</p>
        <p className='fs-5'>Last Edited: {ISOtoUTC(state.dateOfModification)}</p>
      </div>
      </div>
      <div className='right'>
        {(currentUser.userType==='author')&&( <>
        <button className='btn btn-primary me-2' onClick={Editstatus}><RiEditFill /></button>
        {state.status===true ?(
        <button className='btn btn-danger me-2'onClick={DeleteArticle}><RiDeleteBin2Fill /></button>
        ):
        (
           <button className='btn btn-danger me-2' onClick={ViewArticle}>View</button>
        )
        }
        </>
        )}
      </div>
        </div>
        <p style={{whiteSpace: "pre-line"}}>{state.content}</p>
        <div>
          {currentUser.userType==='user' && (
            <form action="" onSubmit={handleSubmit(FormHandleSubmit)}>
              <input type="text" name="comment" id="comment" className='form-control mb-1'{...register('comment',{required:true})}/>
              <button type="submit" className='btn btn-success'>Add Comment</button>
            </form>
          )}
          {errors.comment?.type==="required" && (<p className='text-danger'>Enter a valid comment</p>)}
        </div>
        {state.comments.length===0 ?(<h4 className=''>No comments</h4>) : (
          <div className='p-3 mt-3 bg-light'>
            <h4 className=''><FaComments className='me-1'/>Comments:</h4>{
          state.comments.map((comment)=>(
            <div style={{wordWrap: "break-word",overflowWrap: "break-word",maxWidth: "100%", whiteSpace: "pre-wrap" }} className='d-flex justify-content-start shadow-sm p-3 mb-3 bg-white'>
              <h5 className='me-2 '><FaUserCircle color="blue" className='me-2' />{comment.username}</h5>
              <h5 className='text-break ms-2 ' style={{ wordBreak: 'break-word' }}>{comment.comment}</h5>
            </div>
          ))
        }
          </div>
        )}
      </>:
             <form action="" className='text-start'onSubmit={handleSubmit(SetEditStatus)} >
            <div className='mb-2'>
                <label className='form-label fs-5' htmlFor="">Title</label>
                <input className='form-control' type="text" name="" id="" {...register('title')} defaultValue={state.title}/>
            </div>
            <div className='mb-2'>
                <label htmlFor="" className='form-label fs-5'>Select a Category</label>
                <select name="" id="" className='form-select' {...register("category")} defaultValue={state.category}>
                    <option className='form-control' value="Programming">Programming</option>
                    <option className="form-control" value="AI & DS">AI & DS</option>
                    <option value="Machine Learning" className='form-control'>Machine Learning</option>
                </select>
            </div>
            <div className='mb-2'>
                <label className='form-label fs-5' htmlFor="">Content</label>
                <textarea name="" className='form-control' rows="7" id="" {...register("content")} defaultValue={state.content}></textarea>
            </div>
            <div className='text-end'>
                <button type="submit" className="btn btn-success" >Save</button>
            </div>
        </form>
}
    </div>
  )
}

export default ArticleById
