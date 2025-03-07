import { useState, useEffect } from "react"
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {toast} from 'react-toastify'
import { register,reset } from "../features/auth/authSlice"
import Spinner from "../components/Spinner"


function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        password2: ''
    })

    const { name, email, phone, password, password2 } = formData


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector((state)=> state.auth)


    useEffect(()=>{
        if(isError) {
            toast.error(message)
        }
        if (isSuccess || user) {
            navigate('/');
        }
        dispatch(reset())
    },[user,isError,isSuccess,message,navigate,dispatch])


    const onChange = (e) => {
        setFormData((prevState)=> ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    const validateForm = () => {
        if (!name || !email || !phone || !password || !password2) {
            toast.error("Please fill in all fields.");
            return false;
        }
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            toast.error("Invalid email format.");
            return false;
        }
        if (!/^\d{10}$/.test(phone)) {
            toast.error("Phone number must be exactly 10 digits.");
            return false;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            return false;
        }
        if (password !== password2) {
            toast.error("Passwords do not match.");
            return false;
        }
        return true;
    };


    const onSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const userData = { name, email, phone, password };
            dispatch(register(userData));
        }
    };

    if(isLoading) {
        return <Spinner />
    }
    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Please create an account</p>
                <section className="form">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input type="text"
                              className="form-control"
                              id="name"
                              name="name"
                              value={name}
                              placeholder="Enter your name"
                              onChange={onChange} />
                        </div>
                        <div className="form-group">
                            <input type="email"
                              className="form-control"
                              id="email"
                              name="email"
                              value={email}
                              placeholder="Enter your Email"
                              onChange={onChange} />
                        </div>
                        <div className="form-group">
                            <input type="number"
                              className="form-control"
                              id="phone"
                              name="phone"
                              value={phone}
                              placeholder="Enter your Mobile Number"
                              onChange={onChange} />
                        </div>
                        <div className="form-group">
                            <input type="password"
                              className="form-control"
                              id="password"
                              name="password"
                              value={password}
                              placeholder="Enter password"
                              onChange={onChange} />
                        </div>
                        <div className="form-group">
                            <input type="text"
                              className="form-control"
                              id="password2"
                              name="password2"
                              value={password2}
                              placeholder="confirm password"
                              onChange={onChange} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-block">Submit</button>
                        </div>
                       

                    </form>
                </section>
            </section>

        </>
    )
}

export default Register
