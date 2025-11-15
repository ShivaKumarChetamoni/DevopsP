import React from 'react'
import "./RootLayout.css"
import { Outlet,useLocation } from 'react-router-dom'
import NavigatBar from '../NavigatBar/NavigatBar'
import { ToastContainer } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { checkAuth } from '../../redux/slices/userAuthorSlice'
import 'react-toastify/dist/ReactToastify.css'
import Footer from '../Footer/Footer'
import { useSelector } from 'react-redux'
import { useEffect,useRef } from 'react'
import FullPageLoader from '../FullPageLoader/FullPageLoader';

function RootLayout() {
  const location=useLocation()
  let dispatch=useDispatch()
  const routeswithBg=['/', '/signin', '/signup']
  const showBg = routeswithBg.includes(location.pathname)

   const attemptedAuthRef = useRef(false)

  const token=localStorage.getItem('token')
  const { currentUser,isPending,loginUserStatus } = useSelector(state => state.userAuthoruserAuthorLoginReducer);
  const authCheckInProgress = token && isPending && !loginUserStatus;

  useEffect(() => {
    // If there's no user in Redux but token is still present, remove it
    // console.log(currentUser)
    // const token=localStorage.getItem('token')
    if (token && !loginUserStatus && !isPending && !attemptedAuthRef.current) {
      attemptedAuthRef.current = true
      dispatch(checkAuth())
    }
  }, [dispatch,loginUserStatus,isPending]);
  // useEffect(()=>{
  //   dispatch(checkAuth())
  // },[])

  if (authCheckInProgress) {
  return <FullPageLoader />;// or a spinner
}

  return (
    <div className={showBg ? 'dyn' : 'back'} style={{padding:"0",margin:"0"}}>
        <NavigatBar></NavigatBar>
         <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} />
        <div className={showBg ? 'dynam' : 'back1'}  style={{minHeight:"93.5vh",padding:"0",margin:"0"}}>
            <Outlet></Outlet>
        </div>
        <Footer></Footer>
    </div>
  )
}

export default RootLayout
