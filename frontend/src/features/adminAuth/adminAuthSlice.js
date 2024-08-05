import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminAuthService from './adminAuthService'
const admin=JSON.parse(localStorage.getItem('admin'))

const initialState = {
    admin : admin ? admin : null,
    isError : false,
    isSuccess : false,
    isLoading : false,
    message : '',
    users: []
}


// login 

export const login = createAsyncThunk('adminAuth/login', async(admin, thunkAPI)=> {
    try {
        return await adminAuthService.login(admin)
    } catch (error) {
        const message=(error.response && error.response.data && error.response.data.message)  || error.message || error.toString()
         return thunkAPI.rejectWithValue(message)
    }
})
//getUsers
export const getUsers=createAsyncThunk('adminAuth/getUsers',async(_,thunkAPI)=>{
    try {
        const token = thunkAPI.getState().adminAuth.admin.token;
        const response = await adminAuthService.getUsers(token);
        console.log('get userssssss',response);
        return response
    } catch (error) {
        const message=(error.response && error.response.data && error.response.data.message)  || error.message || error.toString()
         return thunkAPI.rejectWithValue(message)
    }
})

//block
export const blockUser=createAsyncThunk('adminAuth/block',async( userId ,thunkAPI)=>{
    try {
        console.log('userId coming from dispatch',userId)
        const token = thunkAPI.getState().adminAuth.admin.token;
        // console.log('token',token)
        const response = await adminAuthService.blockUser(userId,token)
        // console.log('Response is:',response)
        return response
    } catch (error) {
        const message=(error.response && error.response.data && error.response.data.message)  || error.message || error.toString()
         return thunkAPI.rejectWithValue(message)
    }
})

//addUser
export const addUser=createAsyncThunk('adminAuth/addUser',async(userData,thunkAPI)=>{
    try {
        const token=thunkAPI.getState().adminAuth.admin.token;
        const response=await adminAuthService.addUser(token,userData)
        console.log('result is:',response)
        return response
    } catch (error) {
        const message=(error.response && error.response.data && error.response.data.message)  || error.message || error.toString()
         return thunkAPI.rejectWithValue(message)
    }
})

//editUser
export const editUser=createAsyncThunk('adminAuth/getEditUser',async(user,thunkAPI)=>{
    try {
        const token=thunkAPI.getState().adminAuth.admin.token;
        const response=await adminAuthService.editUser(token,user)
        console.log(response)
        return response
    } catch (error) {
        const message=(error.response && error.response.data && error.response.data.message)  || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// logout

export const logout=createAsyncThunk('adminAuth/logout',
async()=>{
    await adminAuthService.logout()
})


export const adminAuthSlice =createSlice({
    name:'adminAuth',
    initialState,
    reducers:{
        reset:(state)=>{
            state.isError=false
            state.isLoading=false
            state.isSuccess=false
            state.message=''
            state.isUserAdded=false
        },
    },
    extraReducers: (builder)=>{
        builder
        .addCase(login.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.admin=action.payload
        })
        .addCase(login.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.admin=null
        })
        .addCase(logout.fulfilled,(state)=>{
            state.admin=null
        })
        .addCase(getUsers.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.users = action.payload;
          })
          .addCase(blockUser.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(blockUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.users = action.payload;
          })
          .addCase(blockUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
          })
          .addCase(addUser.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(addUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isUserAdded=true;
            state.users = action.payload.users;
          })
          .addCase(addUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
          })
          .addCase(editUser.pending,(state)=>{
            state.isLoading=true;
          })
          .addCase(editUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.users=action.payload
          })
          .addCase(editUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message=action.payload
          })

    }
})

export const {reset}=adminAuthSlice.actions
export default adminAuthSlice.reducer