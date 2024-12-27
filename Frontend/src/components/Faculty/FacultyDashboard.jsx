import React, { useContext, useEffect, useState } from 'react';
import './Faculty.css';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faBook } from '@fortawesome/free-solid-svg-icons';

function FacultyDashboard() {
    const { user } = useContext(AuthContext);
    const [photo, setPhoto] = useState(null);
    const [courses, setCourses] = useState([]); // For storing the courses assigned to the faculty

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:7001/api/users/getUserById/${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
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
                    },
                });
                setCourses(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAssignedCourses();
    }, [user.id]);

    return (
        <div className='main-container'>
            <div className="faculty-container">
                <h1 className="Faculty-Dashboard-topic">Faculty Dashboard</h1>

                <div className="faculty-cards">
                    <div className="photo-container">
                        {photo ? (
                            <img
                                src={`http://localhost:7001/uploads/${photo}`}
                                alt={user.name}
                                className="user-photos"
                            />
                        ) : (
                            <img src="/defaultAvatar.jpg" alt="Default Avatar" className="user-photos" />
                        )}
                    </div>
                    <div className="faculty-details">
                        <p>
                            <FontAwesomeIcon icon={faUser} /> <strong>Name:</strong> {user.name}
                        </p>
                        <p>
                            <FontAwesomeIcon icon={faEnvelope} /> <strong>Email:</strong> {user.email}
                        </p>
                        <p>
                            <FontAwesomeIcon icon={faBook} /> <strong>Assigned Courses:</strong>
                        </p>
                        <ul>
                            {courses.length > 0 ? (
                                courses.map((course) => (
                                    <li key={course._id}>
                                        {course.name} ({course.code})
                                    </li>
                                ))
                            ) : (
                                <li>No courses assigned</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FacultyDashboard;
