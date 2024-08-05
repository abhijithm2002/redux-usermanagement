// EditUserModal.js
import React, { useState } from 'react';
import '../index.css'

function EditUserModal({ isOpen, onClose, user, onUpdate }) {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate({ id: user._id, name, email });
        onClose();
    };

    return (
        <>
            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={onClose}>&times;</span>
                        <h2>Edit User</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input type="text" id="name" value={name} onChange={handleNameChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" value={email} onChange={handleEmailChange} />
                            </div>
                            <button type="submit">Save</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default EditUserModal;