import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import './ProfileDet.css';
import EditUserModal from './EditUserModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinner';
import { toast } from 'react-toastify'
import { updateUser, updateProfileImage } from '../../features/auth/authSlice';


const ProfileDet = ({ userData }) => {
    const dispatch = useDispatch()
    const { user, isLoading, isError, message } = useSelector((state) => state.auth)
    const [isModalOpen, setIsModalOpen] = useState(false);  // Ensures modal is closed by default
    const [imageUrl, setImageUrl] = useState()
    const navigate = useNavigate();

    const handleEditClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const preset_key = 'pxsdc7hk';
    const cloud_name = 'dqk2itdti'
    const handleFile = (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', preset_key)
        setImageUrl('settingCloudinary')
        axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
            .then((response) => setImageUrl(response.data.secure_url))
            .catch((error) => console.log(error.response.data))
    }
    const updateImage = () => {
        dispatch(updateProfileImage({ id: user._id, imageUrl })).then(() => {
            setImageUrl(false)
        }).catch((err) => console.log(err))
    }
    useEffect(() => {
        console.log(user)
    })

    return (
        <>
            {isLoading && <Spinner />}

            <div className="profile-page">
                <div className="content">
                    <div className="content__cover">
                        {user && user.image_url ? (
                            <div
                                className="content__avatarimg"
                                style={{ backgroundImage: `url(${user.image_url})` }}
                            ></div>
                        ) : (
                            <div className="content__avatar"></div>
                        )}


                        <div className="content__bull">
                            <span></span>
                            <span></span>
                        </div>

                    </div>

                    <div className="content__actions">
                        <a href="#">
                            <svg xmlns="" viewBox="0 0 640 512">

                            </svg>
                            <span></span>
                        </a>
                        <a href="#">
                            <svg xmlns="" viewBox="0 0 576 512">

                            </svg>
                            <span></span>
                        </a>
                    </div>

                    <div className="content__title">
                        <input type="file" name="image" onChange={handleFile} />
                        {/* <button className='button_profile' onClick={updateImage}>update profile</button> */}
                        {imageUrl === 'settingCloudinary' ? <Spinner /> : null}
                        {imageUrl !== 'settingCloudinary' && imageUrl ? <button className="button_profile" onClick={updateImage}>Update Image</button> : null}
                        <h1>{userData.name}</h1>
                        <span>{userData.email}</span>
                    </div>
                    <div className="content__button" onClick={handleEditClick}>
                        <a className="button" href="#">
                            <div className="button__border"></div>
                            <div className="button__bg"></div>
                            <p className="button__text">Edit Profile</p>
                        </a>
                    </div>
                </div>
                <div className="bg">
                    <div>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                <EditUserModal
                    isOpen={isModalOpen}
                    onRequestClose={handleCloseModal}
                    userData={userData}
                />
            </div>
        </>
    );
};

export default ProfileDet;
