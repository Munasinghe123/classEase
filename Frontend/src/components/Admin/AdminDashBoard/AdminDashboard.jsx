import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';
import axios from 'axios';

const AdminDashboard = () => {
    const [users, setUser] = useState([]);
    const [userCount, setUserCount] = useState(0);
    const [studentCount, setStudentCount] = useState(0);
    const [facultyCount, setFacultyCount] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:7001/api/users/getAllusers', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                setUser(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUsers();
    }, []);

    // Start the animation when users data is fetched
    useEffect(() => {
        const intervalTime = 30; // time in ms for each update
        if (users.length > 0) {
            // Animate the user count
            const userInterval = setInterval(() => {
                setUserCount((prevCount) => {
                    if (prevCount < users.length) {
                        return prevCount + 1;
                    } else {
                        clearInterval(userInterval);
                        return users.length;
                    }
                });
            }, intervalTime);

            // Animate the student count
            const studentInterval = setInterval(() => {
                const studentCount = users.filter((u) => u.role === 'student').length;
                setStudentCount((prevCount) => {
                    if (prevCount < studentCount) {
                        return prevCount + 1;
                    } else {
                        clearInterval(studentInterval);
                        return studentCount;
                    }
                });
            }, intervalTime);

            // Animate the faculty count
            const facultyInterval = setInterval(() => {
                const facultyCount = users.filter((f) => f.role === 'faculty').length;
                setFacultyCount((prevCount) => {
                    if (prevCount < facultyCount) {
                        return prevCount + 1;
                    } else {
                        clearInterval(facultyInterval);
                        return facultyCount;
                    }
                });
            }, intervalTime);
        }
    }, [users]);

    return (
        <div className="app-container">
            <div className='admin-topic'>
                <h1>Admin DashBoard</h1>
            </div>

            <div className="numbers">
                <h1 className='Stats'>Stats</h1>

                <p className='noOfUsers'>No of users: {userCount}</p>

                <p className='noOfStudents'>No of students: {studentCount}</p>

                <p className='noOfFacultyMemebers'>No of Faculty Members: {facultyCount}</p>
            </div>
        </div>
    );
};

export default AdminDashboard;
