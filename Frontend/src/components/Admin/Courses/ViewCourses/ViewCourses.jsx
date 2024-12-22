import React from 'react'
import './ViewCourses.css'
import { useEffect, useState } from 'react'
import axios from 'axios';

function ViewCourses() {

    const [faculty, setFaculty] = useState([]);

    useEffect(() => {

        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:7001/api/courses/getAllCourses', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach the token to the request
                    },
                });
                console.log(response.data);
                setFaculty(response.data)

            } catch (err) {
                console.log(err);
                alert('failed to get courses');
            }
        };
        fetchUsers();
    }, []);

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
                    {faculty.map((course, index) => {
                        return (
                            <tr key={index}>
                                <td>{course.name}</td>
                                <td>{course.code}</td>
                                <td>{course.description}</td>
                                <td>{course.credits}</td>
                                <td>{course.assignedFaculty.name}</td>

                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div >
    )
}

export default ViewCourses
