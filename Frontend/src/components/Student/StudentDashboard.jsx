import React, { useContext, useEffect, useState } from 'react';
import './Student.css';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faBook } from '@fortawesome/free-solid-svg-icons';

function StudentDashboard() {
    const { user } = useContext(AuthContext);
    const [photo, setPhoto] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
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

        fetchUsers();
    }, [user.id]);  // Add user.id as dependency to refetch if it changes

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:7001/api/courses/getCourseByStudent/${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log(response.data);
                setCourses(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchCourses();
    }, [user.id])

    return (
        <div className='main-container'>
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
    <p><FontAwesomeIcon icon={faUser} /> <strong>Name:</strong> {user.name}</p>
    <p><FontAwesomeIcon icon={faEnvelope} /> <strong>Email:</strong> {user.email}</p>
    <p><FontAwesomeIcon icon={faBook} /> <strong>Enrolled Courses</strong></p>
    <ul>
        {courses.map((course, index) => (
            <li key={index}>{course.name}</li>
        ))}
    </ul>
</div>
                </div>
            </div>
        </div>
    );
}

export default StudentDashboard;
