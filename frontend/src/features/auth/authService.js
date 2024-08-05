import axios from 'axios'

const API_URL = '/api/users/'

// Register User

const register = async(userData) => {
    const response = await axios.post(API_URL, userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// Login User

const login = async(userData) => {
    const response = await axios.post(API_URL + 'login' , userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

// Logout User

const logout = ()=> {
    localStorage.removeItem('user')
}
// update User

const updateUser = async (userData,token) => {
console.log(userData);
    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL +'profile', userData,config);  // Assuming you pass the user ID

    

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}

//update Profile Image
const updateProfileImage=async(token,userData)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response =await axios.post(API_URL+'profile',{userData},config)
    if (response.data) {

        // Step 1: Retrieve data from localStorage
        const dataString = localStorage.getItem('user');

        // Step 2: Parse data into an object (or array)
        const data = JSON.parse(dataString);

        // Step 3: Update specific part of the data
        data.image_url = response.data.image_url

        // Step 4: Serialize updated data back into a string
        const updatedDataString = JSON.stringify(data);

        // Step 5: Store updated data back into localStorage
        localStorage.setItem('user', updatedDataString);



        // localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
    
}


const authService = {
    register,
    logout,
    login,
    updateUser,
    updateProfileImage
}

export default authService