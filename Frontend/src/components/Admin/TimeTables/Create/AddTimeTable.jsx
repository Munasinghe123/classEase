import React, { useEffect, useState } from 'react';
import './AddTimeTable.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddTimeTable() {
    const [users, setUsers] = useState([]);
    const [locations, setLocations] = useState([]);
    const [courses, setCourses] = useState([]);

    const [selectedLocation, setSelectedLocation] = useState('');
    const [time, setTime] = useState('');
    const [member, setMember] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    // Fetching faculty users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:7001/api/users/getAllUsers`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchUsers();
    }, []);

    // Filtering the faculty users from the user array
    const facultyMembers = users.filter((f) => f.role === 'faculty');

    // Fetching resources
    useEffect(() => {
        const fetchResources = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:7001/api/rooms/getAllRooms`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setLocations(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchResources();
    }, []);

    // Fetching courses
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:7001/api/courses/getAllCourses`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCourses(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchCourses();
    }, [])

    // Handling form submission
    const submitForm = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (!selectedCourse || !time || !selectedLocation || !member) {
            setErrorMessage("All fields are required.");
            return;
        }

        try {
            const token = localStorage.getItem('token');

            const formData = {
                course: selectedCourse,
                time,
                location: selectedLocation,
                assignedFacultyMember: member
            };

            const response = await axios.post(`http://localhost:7001/api/timeTable/createTimeTable`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setSuccessMessage("Successfully created timetable!");
                setTime('');
                setSelectedLocation('');
                setMember('');
                setSelectedCourse('');

                // Navigate to another page after a brief delay
                setTimeout(() => navigate("/viewTimeTable"), 2000);
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setErrorMessage(err.response.data.message);
            } else {
                setErrorMessage('An unexpected error occurred.');
            }
            console.log(err);
        }
    };

    return (
        <div className='add-timetable-container'>
            <div className='add-timetable-form'>
                <h1>Create Time Table</h1>
                <form onSubmit={submitForm}>
                    <label htmlFor='courseName'>Course Name:</label>
                    <select
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                    >
                        {courses.map((course) => (
                            <option key={course._id} value={course._id}>{course.name}</option>
                        ))}
                    </select>
                    <br /><br />

                    <label htmlFor='courseTime'>Time:</label>
                    <input
                        type='time'
                        name='courseTime'
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                    <br /><br />

                    <label htmlFor='courseLocation'>Location:</label>
                    <select
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        required
                    >
                        <option value="">Select a location</option>
                        {locations.map((location) => (
                            <option key={location._id} value={location._id}>{location.name}</option>
                        ))}
                    </select>
                    <br /><br />

                    <label htmlFor='facultyMember'>Assign Faculty Member:</label>
                    <select
                        value={member}
                        onChange={(e) => setMember(e.target.value)}
                        required
                    >
                        <option value="">Select a member</option>
                        {facultyMembers.map((faculty) => (
                            <option key={faculty._id} value={faculty._id}>
                                {faculty.name}
                            </option>
                        ))}
                    </select>
                    <br /><br />

                    <button type='submit' className='add-timetable-btn'>Create TimeTable</button>
                </form>

                {/* Display error or success message */}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
            </div>
        </div>
    );
}

export default AddTimeTable;
