import React, { useEffect, useState } from 'react';
import './AddTimeTable.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddTimeTable() {

    const [users, setUsers] = useState([]);
    const [locations, setLocations] = useState([]);

    const [selectedLocation, setselectedLocation] = useState('');
    const [name, setName] = useState('');
    const [time, setTime] = useState('');
    const [member, setMember] = useState('');

    const navigate = useNavigate();

    //fetching faculty users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:7001/api/users/getAllUsers`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                console.log(response.data);
                setUsers(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchUsers();
    }, [])

    //filtering the faculty users from the user array
    const facultyMembers = users.filter((f) => f.role === 'faculty');

    //fetching resources
    useEffect(() => {
        const fetchResources = async () => {
            try {

                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:7001/api/resources/getAllResources`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log("resources", response.data);
                setLocations(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchResources();
    }, [])

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');

            const formData = {
                course: name,
                time,
                location: selectedLocation,
                assignedFacultyMember: member
            }
            const response = await axios.post(`http://localhost:7001/api/timeTable/createTimeTable`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.status === 200) {
                alert("Successfully created time table")

                setName(""),
                    setTime(""),
                    setMember("")

                navigate("/viewTimeTable");
            } else {
                console.log("error ")
                alert("Time table creation was unsuccessful")
            }
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className='add-timetable-container'>
            <div className='add-timetable-form'>
                <h1>Create Time Table</h1>
                <form onSubmit={submitForm}>
                    <label htmlFor='courseName'>Course Name:</label>
                    <input type='text'
                        name='courseName'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required /> <br /><br />

                    <label htmlFor='courseTime'>Time</label>
                    <input type='text'
                        name='courseTime'
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required /><br /><br />

                    <label htmlFor='courseLocation'>Location</label>
                    <select
                        value={selectedLocation}
                        onChange={(e) => setselectedLocation(e.target.value)}
                    >
                        <option value="">Select a location</option>
                        {
                            locations.map((location) => {
                                return (
                                    <option key={location._id} value={location._id}>{location.name}</option>
                                );
                            })
                        }
                    </select>

                    <label htmlFor='facultyMember'>Assign Faculty Member</label>
                    <select
                        value={member}
                        onChange={(e) => setMember(e.target.value)}
                    >
                        <option value=""> Select a member</option>
                        {
                            facultyMembers.map((faculty, index) => {
                                return (
                                    <option key={index} value={faculty._id}>
                                        {faculty.name}
                                    </option>
                                );
                            })
                        }
                    </select><br /><br />

                    <button type='submit' className='add-timetable-btn'>Create TimeTable</button>
                </form >
            </div>
        </div>

    );
}

export default AddTimeTable;
