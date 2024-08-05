import { configureStore } from '@reduxjs/toolkit';
import authReducer from  '../features/auth/authSlice'
import adminReducer from '../features/adminAuth/adminAuthSlice'
import deleteReducer from '../features/adminAuth/adminAuthSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminAuth:adminReducer,
    delete : deleteReducer
    
  },
});
