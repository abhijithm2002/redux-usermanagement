import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { blockUser, getUsers, reset, editUser } from "../features/adminAuth/adminAuthSlice";
import { FaPlus } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import '../index.css'
import EditUserModal from "./EditUserModal";
import Spinner from "./Spinner";
import { toast } from 'react-toastify'
import './UserList.css'

function UsersList() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { users, isLoading, isError, message } = useSelector((state) => state.adminAuth)
    console.log('New set of users', users)
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const updateUser = (updatedUser) => {
        console.log('Updated user:', updatedUser);
        dispatch(editUser(updatedUser)).then(() => {
            dispatch(getUsers());
            handleCloseModal(); // Close the modal after updating
        });

    }

    useEffect(() => {

        if (isError) {
            toast.error(message)
        }

        dispatch(getUsers());
    }, [message]);



    const handleBlock = (userId) => {
        if (window.confirm(`Are you sure want to change the status of the user?`)) {
            dispatch(blockUser(userId)).then(() => dispatch(getUsers()))
        }
    }


    const [searchTerm, setSearchTerm] = useState('');

    // Filter users based on search term
    // const filteredUsers = users.filter(user =>
    //     user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     user.email.toLowerCase().includes(searchTerm.toLowerCase())
    // );
    const filteredUsers = Array.isArray(users) ? users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];


    // console.log('Current users state:', users);



    return (
        <>
            {isLoading && <Spinner />}
            {users ? (
                <>
                    <input className="search-bar"
                        type="text"
                        placeholder="Search User"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%', // Full width
                            padding: '10px', // Padding for spacing
                            fontSize: '16px', // Font size
                            border: '1px solid #ccc', // Border style
                            borderRadius: '5px', // Rounded corners
                            boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)', // Box shadow for depth
                            boxSizing: 'border-box', // Ensure padding and border are included in width
                            marginBottom: '20px'
                        }}
                    />

                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Profile</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length ? filteredUsers.map((user, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="profile-image">
                                            <img
                                                style={{ width: '100px', height: '100px' }}
                                                src={user.image_url ? user.image_url : "https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg"}
                                                alt=""
                                            />

                                        </div>
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.is_active ? "Active" : "Blocked"}</td>
                                    <td >
                                        <div className="user-actions">
                                            <button className="action-btn edit" onClick={() => handleEditClick(user)}>
                                                Edit
                                            </button>
                                            <button
                                                className={`action-btn ${user.is_active ? 'block' : 'unblock'}`}
                                                onClick={() => handleBlock(user._id)}
                                            >
                                                {user.is_active ? 'Block' : 'Unblock'}
                                            </button>
                                        </div>

                                    </td>
                                </tr>
                            )) : <h1>No Users found</h1>}
                        </tbody>
                        <ul>
                        <li>
                            <Link to="/admin/adduser">
                                <FaPlus /> Add User
                            </Link>
                        </li>
                        </ul>
                    </table>
                </>

            ) : <h1>No Users Found</h1>}

            {isModalOpen && (
                <EditUserModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    user={selectedUser}
                    onUpdate={updateUser}
                />
            )}
        </>
    )
}

export default UsersList