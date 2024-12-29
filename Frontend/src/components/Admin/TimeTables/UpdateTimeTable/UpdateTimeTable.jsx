import React, { useEffect, useState } from 'react';
import './UpdateTimeTable.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UpdateTimeTable() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [time, setTime] = useState("");
    const [member, setMember] = useState(null); // Initialize as null to store the object

    useEffect(() => {
        const fetchTimeTable = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:7001/api/timeTable/getTimeTableById/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                console.log("relevant timetable details", response.data);
                setName(response.data.course);
                setLocation(response.data.location);
                setTime(response.data.time);
                setMember(response.data.assignedFacultyMember); // Set member object
            } catch (err) {
                console.log(err);
            }
        }

        fetchTimeTable();
    }, [id]);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:7001/api/users/getAllUsers`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setUsers(response.data);
                console.log("all users", response.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchAllUsers();
    }, []);

    const facultyMembers = users.filter((f) => f.role === "faculty");
    console.log("faculties", facultyMembers);

    const nonSelected = facultyMembers.filter((f) => f._id !== member?._id); // Prevent selecting the assigned member
    console.log("non-selected", nonSelected);

    const submitForm = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const formData = {
                course: name,
                time,
                location,
                assignedFacultyMember: member?._id // Use _id from the selected member object
            };

            const response = await axios.put(`http://localhost:7001/api/timeTable/updateTimeTable/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.status === 200) {
                alert("Timetable updated successfully");
                navigate("/ViewTimeTable");
            } else {
                alert("Could not update timetable");
            }
            console.log("updated timetable", response.data);
        } catch (err) {
            console.log(err);
            alert("Could not update timetable");
        }
    }

    return (
        <div className='updateTimeTable-container'>
            <h1>Update Time Table</h1>

            <form className='updateTimetable-form' onSubmit={submitForm}>
                <label htmlFor='CourseName'>Course Name</label>
                <input
                    type='text'
                    name='CourseName'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor='location'>Location</label>
                <input
                    type='text'
                    name='location'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />

                <label htmlFor='time'>Time</label>
                <input
                    type='text'
                    name='time'
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />

                <label htmlFor='AssignedMember'>Assigned Member</label>
                <select
                    value={member?._id || ''}
                    onChange={(e) => {
                        const selectedMember = nonSelected.find(f => f._id === e.target.value);
                        setMember(selectedMember); // Update the selected member object
                    }}
                >
                    {/* Display the pre-selected member as the first option */}
                    {member && (
                        <option value={member._id} disabled>
                            {member.name} (Current)
                        </option>
                    )}

                    <option value='' disabled>Choose a faculty member</option>
                    {nonSelected.map((fMember) => (
                        <option key={fMember._id} value={fMember._id}>
                            {fMember.name}
                        </option>
                    ))}
                </select>

                <button type='submit'>Update</button>
            </form>
        </div>
    );
}

export default UpdateTimeTable;
