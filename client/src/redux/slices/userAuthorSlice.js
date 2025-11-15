import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const baseURL = process.env.REACT_APP_API_BASE_URL

//make http request using redux thunk
export const userAuthorLoginThunk=createAsyncThunk('user-author-login',async(userCredObj,thunkApi)=>{
    try{
    // console.log(userCredObj)
    if(userCredObj.userType==='user'){
        // console.log("before making http req to login")
        const res=await axios.post(`${baseURL}/user-api/login`,userCredObj)
        // console.log(res)
        if(res.data.message==="login successful"){
            //store token in local/session storage
            localStorage.setItem('token',res.data.token)
            // console.log("Response from backend",res.data)
            return res.data
        }
        else{
           return thunkApi.rejectWithValue(res.data.message)
        }
    
    }
    if(userCredObj.userType==='author'){
        const res=await axios.post(`${baseURL}/author-api/login`,userCredObj)
        if(res.data.message==="login successful"){
            localStorage.setItem('token',res.data.token)
            return res.data
        }
        else{
            return thunkApi.rejectWithValue(res.data.message)
        }
    }
    if(userCredObj.userType==='admin'){
        const res=await axios.post(`${baseURL}/admin-api/login`,userCredObj)
        if(res.data.message==='login successful'){
            localStorage.setItem('token',res.data.token)
            return res.data
        }
        else{
            return thunkApi.rejectWithValue(res.data.message)
        }
    }
}
catch(err){
    return thunkApi.rejectWithValue(err)
}
})

export const checkAuth=createAsyncThunk('user-reload',async(_,thunkApi)=>{
    try{
    let token=localStorage.getItem('token')
    const axioswithtoken=axios.create({
        baseURL,
        headers:{Authorization:`Bearer ${token}`}
    })
    const response=await axioswithtoken.get('/common-api/reload')
    if(response.data.message==='user sent'){
        return response.data;
    }
    }
    catch(err){
        return thunkApi.rejectWithValue(err)
    }
})


export const userAuthorSlice=createSlice({
    name:"user-author-login",
    initialState:{
        isPending:false,
        loginUserStatus:false,
        currentUser:{},
        errorOccurred:false,
        errMsg:''
    },
    reducers:{
        resetState:(state,action)=>{
            state.isPending=false;
            state.loginUserStatus=false;
            state.currentUser={};
            state.errorOccurred=false;
            state.errMsg='';
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(userAuthorLoginThunk.pending,(state,action)=>{
            // console.log("pending reaction")
            state.isPending=true
        })
        .addCase(userAuthorLoginThunk.fulfilled,(state,action)=>{
            state.isPending=false;
            state.currentUser=action.payload.user
            state.loginUserStatus=true;
            state.errMsg='';
            state.errorOccurred=false;
            // console.log("Thunk fulfilled payload",action.payload)
        })
        .addCase(userAuthorLoginThunk.rejected,(state,action)=>{
            state.isPending=false;
            state.currentUser={};
            state.loginUserStatus=false;
            state.errMsg=action.payload;
            state.errorOccurred=true;
        })
        .addCase(checkAuth.pending,(state,action)=>{
            state.isPending=true
        })
        .addCase(checkAuth.fulfilled,(state,action)=>{
            state.isPending=false;
            state.currentUser=action.payload.user
            state.loginUserStatus=true;
            state.errMsg='';
            state.errorOccurred=false;
        })
        .addCase(checkAuth.rejected,(state,action)=>{
            state.isPending=false;
            state.currentUser={};
            state.loginUserStatus=false;
            state.errMsg=action.payload;
            state.errorOccurred=true;
        })
    }
})
export const {resetState}= userAuthorSlice.actions;
export default userAuthorSlice.reducer;
