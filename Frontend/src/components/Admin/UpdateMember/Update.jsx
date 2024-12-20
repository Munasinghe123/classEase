import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Update.css';

function Update() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [newName, setNewName] = useState("");
    const [newEmail, setEmail] = useState('');
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const updatedUser = { name: newName, email: newEmail };

            const response = await axios.put(
                `http://localhost:7001/api/users/updateUser/${id}`,
                updatedUser,
                { headers: { Authorization: `Bearer ${token}` } }
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

    const isStudent = user.role === 'student';

    return (
        <div className='container'>
            <div className='update-form'>
                <h1>Update User Details</h1>
                <form onSubmit={handleSubmit}>
                    {isStudent ? (
                        <>
                            <label>Name</label>
                            <input
                                type='text'
                                value={newName}
                                onChange={handleNameChange}
                                required
                            />
                            <label>Email</label>
                            <input
                                type='email'
                                value={newEmail}
                                onChange={handleEmailChange}
                                required
                            />
                        </>
                    ) : (
                        <>
                            <label>Name</label>
                            <input
                                type='text'
                                value={newName}
                                onChange={handleNameChange}
                                required
                            />
                        </>
                    )}
                    <button type='submit'>Update</button>
                </form>
            </div>
        </div>
    );
}

export default Update;
