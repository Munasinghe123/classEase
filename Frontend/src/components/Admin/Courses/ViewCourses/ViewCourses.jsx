import React, { useEffect, useState } from 'react';
import './ViewCourses.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ViewCourses() {
    const [course, setCourse] = useState([]);

    // Fetch courses data
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:7001/api/courses/getAllCourses', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach the token to the request
                    },
                });
                console.log(response.data);
                setCourse(response.data);
            } catch (err) {
                console.log(err);
                alert('Failed to get courses');
            }
        };
        fetchCourses();
    }, [course]);

    // Delete course function
    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://localhost:7001/api/courses/deleteCourse/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Attach the token to the request
                },
            });

            if (response.status === 200) {
                setCourse(course.filter(c => c._id !== id));
                alert('Course deleted successfully!');
            }
        } catch (err) {
            console.error(err);
            alert('Failed to delete the course');
        }
    };

    return (
        <div className='ViewCourses-container'>
            <h1 className='ViewCourses-Topic'>View Courses</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Code</th>
                        <th>Description</th>
                        <th>Credits</th>
                        <th>Assigned Faculty member</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {course.map((course, index) => (
                        <tr key={index}>
                            <td>{course.name}</td>
                            <td>{course.code}</td>
                            <td>{course.description}</td>
                            <td>{course.credits}</td>
                            <td>{course.assignedFaculty.name}</td>
                            <td>
                                <Link to={`/updateCourses/${course._id}`}>
                                    <button className='course-update-button'>Update</button>
                                </Link>
                                <button
                                    className='course-delete-button'
                                    onClick={() => handleDelete(course._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewCourses;
