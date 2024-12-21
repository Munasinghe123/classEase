import React, { useContext, useEffect, useState } from 'react';
import './Student.css';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

function StudentDashboard() {
    const { user } = useContext(AuthContext);
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:7001/api/users/getUserById/${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                console.log(response.data); // Check if photo field exists
                setPhoto(response.data.user.photo); // Ensure photo exists in the response
            } catch (err) {
                console.log(err);
            }
        };

        fetchUsers();
    }, [user.id]);  // Add user.id as dependency to refetch if it changes

    console.log('Photo state:', photo);  // Log photo state before rendering

    return (
        <div className='student-container'>
            <h1 className='Student-Dashboard-topic'>Student Dashboard</h1>
            <div className="student-cards">
                <div className="photo-container">
                    {photo ? (
                        <img src={`http://localhost:7001/uploads/${photo}`} alt="User" className="user-photos" />
                    ) : (
                        <img src="/defaultAvatar.jpg" alt="Default Avatar" className="user-photo" />
                    )}
                </div>
                <div className="student-details">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            </div>
        </div>
    );
}

export default StudentDashboard;
