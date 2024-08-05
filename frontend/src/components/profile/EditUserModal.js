import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Spinner from '../Spinner';
import { updateUser } from '../../features/auth/authSlice';
import './Modalcss.css';

function EditUserModal({ userData, isOpen, onRequestClose }) {
    const [formData, setFormData] = useState({
        email: userData.email,
        name: userData.name,
        phone: userData.phone
    });

    const dispatch = useDispatch();
    const { user, isError, isSuccess, message, isLoading } = useSelector(state => state.auth);

    // // Effect for handling API call responses
    // useEffect(() => {
    //     if (isError) {
    //         toast.error(message);
    //     }
        
    // }, [isError, isSuccess, message]);

    // Handle input changes
    const onChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    // Handle form submission
    const submitCredentials = (e) => {
        e.preventDefault();
        dispatch(updateUser({
            id: userData._id,  
            ...formData
        }));
    };

    // Early return for loading state
    if (isLoading) {
        return <Spinner />;
    }

    // Early return if not open
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal">
            <h1 className="close-btn" onClick={onRequestClose}>
                ×
            </h1>
            <h2>Edit Profile</h2>
            <form onSubmit={submitCredentials}>
                <label>Name:</label>
                <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    placeholder="Enter your Name"
                    onChange={onChange}
                />
                <label>Email:</label>
                <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    placeholder="Enter your email"
                    onChange={onChange}
                />
                {formData.phone && (
                    <>
                        <label>Phone:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="phone"
                            value={formData.phone}
                            placeholder="Enter your phone number"
                            onChange={onChange}
                        />
                    </>
                )}
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default EditUserModal;
