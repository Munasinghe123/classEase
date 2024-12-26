import React, { useEffect, useState } from 'react';
import './EnrollStudents.css';
import axios from 'axios';

function EnrollStudents() {
    const [users, setUsers] = useState([]); // Renamed to "users" for clarity
    const [courses, setCourses] = useState([]); // Courses state remains the same
    const [selectedStudents, setSelectedStudents] = useState({}); // Store selected student for each course
    const [message, setMessage] = useState(''); // For displaying feedback messages

    // Fetching users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('Token not found in localStorage');

                const response = await axios.get('http://localhost:7001/api/users/getAllUsers', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUsers(response.data); // Ensure a fallback to an empty array
            } catch (err) {
                console.error('Error fetching users:', err);
            }
        };
        fetchUsers();
    }, []);

    // Filter students from users
    const students = users.filter((user) => user.role === 'student');

    // Fetching courses
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:7001/api/courses/getAllCourses', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setCourses(response.data); // Ensure a fallback to an empty array
            } catch (err) {
                console.error('Error fetching courses:', err);
            }
        };
        fetchCourses();
    }, []);

    // Handle student selection
    const handleSelectStudent = (courseId, studentId) => {
        setSelectedStudents((prev) => ({
            ...prev,
            [courseId]: studentId,
        }));
    };

    // Handle enrollment
    const handleEnroll = async (courseId) => {
        const studentId = selectedStudents[courseId];
        if (!studentId) {
            setMessage('Please select a student');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `http://localhost:7001/api/courses/enrollStudent/${courseId}`,
                { studentId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMessage('Student enrolled successfully!');
           
        } catch (err) {
            console.error('Error enrolling student:', err);
            setMessage('Failed to enroll student');
        }
    };

    return (
        <div className="EnrollStudents-Container">
            <h1>Enroll Students</h1>

            {/* Display feedback message */}
            {message && <p>{message}</p>}

            <div className="enrollStudents-table">
                <table>
                    <thead>
                        <tr>
                            <th>Course</th>
                            <th>Students</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            courses.map((course) => (
                                <tr key={course._id}>
                                    <td>{course.name}</td>

                                    <td>
                                        <select
                                            onChange={(e) => handleSelectStudent(course._id, e.target.value)}
                                            value={selectedStudents[course._id] || ''}
                                        >
                                            <option value="">Select a student</option>
                                            {
                                                students.map((student) => (
                                                    <option key={student._id} value={student._id}>
                                                        {student.name}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </td>
                                    <td>
                                        <button className='enroll-btn' onClick={() => handleEnroll(course._id)}>
                                            Enroll
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default EnrollStudents;
