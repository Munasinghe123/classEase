import React, { useEffect, useState } from 'react';
import './UpdateTimeTable.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UpdateTimeTable() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [days, setDays] = useState(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]); // Added days array

    const [name, setName] = useState("");
    const [time, setTime] = useState("");
    const [day, setDay] = useState(""); // State to hold selected day

    const [location, setLocation] = useState(null);
    const [member, setMember] = useState(null);

    useEffect(() => {
        const fetchTimeTable = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:7001/api/timeTable/getTimeTableById/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                console.log("Relevant timetable details", response.data);
                setName(response.data.course.name);
                setLocation(response.data.location);
                setTime(response.data.time);
                setMember(response.data.assignedFacultyMember);
                setDay(response.data.day); // Set the initial day
            } catch (err) {
                console.log(err);
            }
        };

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
                console.log("All users", response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllUsers();
    }, []);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:7001/api/rooms/getAllRooms`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log("All rooms", response.data);
                setRooms(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchRooms();
    }, []);

    const facultyMembers = users.filter((f) => f.role === "faculty");
    const nonSelectedMembers = facultyMembers.filter((f) => f._id !== member?._id);
    const nonSelectedrooms = rooms.filter((r) => r._id !== location?._id);

    const submitForm = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const formData = {
                time,
                day, // Include day in the payload
                location: location?._id, // Send only the location _id
                assignedFacultyMember: member?._id // Send only the member _id
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
        } catch (err) {
            console.log(err);
            alert("Could not update timetable");
        }
    };

    return (
        <div className='updateTimeTable-container'>
            <h1>Update Time Table</h1>

            <form className='updateTimetable-form' onSubmit={submitForm}>
                <label htmlFor='CourseName'>Course Name</label>
                <input
                    type='text'
                    name='CourseName'
                    value={name}
                    disabled
                    onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor='time'>Time</label>
                <input
                    type='time'
                    name='time'
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />

                <label htmlFor='day'>Day</label>
                <select
                    name='day'
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                >
                    <option value="">Select a day</option>
                    {days.map((d, index) => (
                        <option key={index} value={d} disabled={d === day}>
                            {d} {d === day ? "(Current)" : ""}
                        </option>
                    ))}
                </select>


                <label htmlFor='location'>Location</label>
                <select
                    value={location?._id || ''}
                    onChange={(e) => {
                        const selectedLocation = rooms.find(r => r._id === e.target.value);
                        setLocation(selectedLocation);
                    }}
                >
                    {location && (
                        <option value={location._id} disabled>
                            {location.name} (Current)
                        </option>
                    )}
                    <option value="">Select a new location</option>
                    {nonSelectedrooms.map((resource) => (
                        <option key={resource._id} value={resource._id}>
                            {resource.name}
                        </option>
                    ))}
                </select>

                <label htmlFor='AssignedMember'>Assigned Member</label>
                <select
                    value={member?._id || ''}
                    onChange={(e) => {
                        const selectedMember = facultyMembers.find(f => f._id === e.target.value);
                        setMember(selectedMember);
                    }}
                >
                    {member && (
                        <option value={member._id} disabled>
                            {member.name} (Current)
                        </option>
                    )}
                    <option value="">Select a faculty member</option>
                    {nonSelectedMembers.map((fMember) => (
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
