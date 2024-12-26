import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Update.css';

function Update() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [newName, setNewName] = useState("");
    const [newEmail, setEmail] = useState('');
    const [newPhoto, setPhoto] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:7001/api/users/getUserById/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUser(response.data.user);
                setNewName(response.data.user.name);
                setEmail(response.data.user.email);
            } catch (err) {
                console.error('Error fetching user:', err);
                alert('Failed to fetch user details.');
            }
        };

        fetchUser();
    }, [id]);

    const handleNameChange = (e) => setNewName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleFileChange = (e) => setPhoto(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('name', newName);
            formData.append('email', newEmail);
            if (newPhoto) formData.append('photo', newPhoto);

            const response = await axios.put(
                `http://localhost:7001/api/users/updateUser/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                alert('User details updated successfully!');
                navigate(`/viewUsers`);
            }
        } catch (err) {
            console.error('Error updating user:', err);
            alert('Failed to update user details.');
        }
    };

    if (!user) return <p>Loading user details...</p>;

    return (
        <div className="container">
            <div className="update-form">
                <h1>Update User Details</h1>
                <form onSubmit={handleSubmit}>
                    <label>Photo</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                    />

                    <label>Name</label>
                    <input
                        type="text"
                        value={newName}
                        onChange={handleNameChange}
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        value={newEmail}
                        onChange={handleEmailChange}
                    />

                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    );
}

export default Update;
