import axios from "axios"
const API_URL = '/api/admin/'


const login = async(userData) => {
    const response = await axios.post(API_URL + 'adminLogin' , userData)
    
    if(response.data) {
        localStorage.setItem('admin', JSON.stringify(response.data))
    }
    return response.data
}

//getUsers
const getUsers=async(token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response= await axios.get(API_URL + 'getUsers',config)
    
    return response.data
}

//addUser
const addUser=async(token,userData)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    
    const response=await axios.post(API_URL + 'addUser',{userData},config)
    return response.data
}

//blockUSer
const blockUser=async(userId,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    console.log(userId,token);
    const response= await axios.post(API_URL + 'block',{userId},config)
    // console.log(response.data)
    return response.data
}


//editUser
const editUser=async(token,userData)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response= await axios.post(API_URL + 'editUser',{userData},config)
    
    return response.data
}


const logout=()=>{
    localStorage.removeItem('admin')
}

const adminAuthService = {
    login,
    logout,
    getUsers,
    addUser,
    blockUser,
    editUser
}

export default adminAuthService