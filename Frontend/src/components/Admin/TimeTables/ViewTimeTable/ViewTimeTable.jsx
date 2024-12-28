import React, { useEffect, useState } from 'react';
import './ViewTimeTable.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ViewTimeTable() {
    const [timeTable, setTimeTable] = useState([]);

    useEffect(() => {
        const fetchTimetable = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:7001/api/timeTable/getTimeTable`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log(response.data);
                setTimeTable(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchTimetable();
    }, []);

    return (
        <div className="main-contianer">
            <h1 className="Timetable-logic">View Time Table</h1>

            <table>
                <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Time</th>
                        <th>Location</th>
                        <th>Assigned Faculty Member</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {timeTable.map((data, index) => (
                        <tr key={index}>
                            <td>{data.course}</td>
                            <td>{data.time}</td>
                            <td>{data.location}</td>
                            <td>{data.assignedFacultyMember?.name}</td>
                            <td>
                                <Link>
                                    <button className='timeTableUpdate-btn'>Update</button>
                                </Link>

                                <button className='timeTableDelete-btn'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewTimeTable;
