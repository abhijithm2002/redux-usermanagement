import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'
import { act } from 'react'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))
const initialState = {
    user : user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Register the user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
       return await authService.register(user) 
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Login the user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
       return await authService.login(user) 
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// Update the user

export const updateUser = createAsyncThunk('auth/updateUser', async (userData, thunkAPI) => {
    try {
        
        const token = thunkAPI.getState().auth.user.token
        console.log('token   dddddd',token)
        return await authService.updateUser(userData,token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
        error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Update Image 

export const updateProfileImage=createAsyncThunk('auth/uploadProfile',async(userData,thunkAPI)=>{
    try {
        const token=thunkAPI.getState().auth.user.token;
        const response=await authService.updateProfileImage(token,userData)
        console.log('respomsee',response);
        return response
    } catch (error) {
        const message=(error.response && error.response.data && error.response.data.message)  || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})



export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset : (state)=> {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        })
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.user = null;
        })
        .addCase(login.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.user = null;
        })
        .addCase(updateUser.pending, state => {
            state.isLoading = true;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user.name = action.payload.name;  // Update the user data with the new info
            state.user.email = action.payload.email;  // Update the user data with the new info
            state.user.phone = action.payload.phone;  // Update the user data with the new info
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(logout.fulfilled, (state) => {
            state.user = null
        })
        .addCase(updateProfileImage.pending,(state)=>{
            state.isLoading= true
            state.isError=false
        })
        .addCase(updateProfileImage.fulfilled,(state,action)=>{
            console.log("action", action);
            state.isLoading=false
            state.isSuccess=true
            state.user.image_url=action.payload.image_url
            state.isError=false
        })
    }
    
})


export const logout = createAsyncThunk('auth.logout', 
async ()=>{
    await authService.logout()
}) 
export const {reset} = authSlice.actions
export default authSlice.reducer