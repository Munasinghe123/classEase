import React, { useContext, useEffect, useState } from 'react';
import './Faculty.css';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

function FacultyDashboard() {
    const { user } = useContext(AuthContext);
    const [photo, setPhoto] = useState(null);
    const [courses, setCourses] = useState([]);  // For storing the courses assigned to the faculty

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:7001/api/users/getUserById/${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setPhoto(response.data.user.photo);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUserData();
    }, [user.id]);

    useEffect(() => {
        const fetchAssignedCourses = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:7001/api/courses/getCoursesByFaculty/${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setCourses(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAssignedCourses();
    }, [user.id]);

    return (
        <div className='faculty-container'>
            <h1>Faculty Member Dashboard</h1>

            <div className="card">
                <div className="card-body">
                    {photo ? (
                        <img
                            src={`http://localhost:7001/uploads/${photo}`}
                            alt={user.name}
                            className="user-photo"
                        />
                    ) : (
                        <img src="/defaultAvatar.jpg" alt="Default Avatar" className="user-photo" />
                    )}
                    <p className='faculty-name'>Name: {user.name}</p>
                    <p className='faculty-email'>Email: {user.email}</p>

                    <p className='assigned-courses'>Assigned Courses:</p>
                    <ul>
                        {courses.length > 0 ? (
                            courses.map(course => (
                                <li key={course._id}>
                                    <strong>{course.name}</strong> ({course.code}) 
                                </li>
                            ))
                        ) : (
                            <li>No courses assigned</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default FacultyDashboard;
