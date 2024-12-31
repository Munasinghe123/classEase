import React, { useEffect, useState } from 'react'
import './ViewRooms.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

function ViewRooms() {

    const [rooms, setRooms] = useState([]);

    useEffect(() => {

        const fetchResources = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:7001/api/rooms/getAllRooms`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log(response.data);
                setRooms(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchResources();
    }, [])

    return (
        <div className='resouces-container'>
            <h1>Rooms</h1>

            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Name</th>
                        <th>Operation</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        rooms.map((res, index) => {
                            return (
                                <tr key={res._id}>
                                    <td>{res.roomType}</td>
                                    <td>{res.name}</td>

                                    <td>
                                        <Link to="/UpdateRooms">
                                            <button className='update-btn'>Update</button>
                                        </Link>

                                        <button className='delete-btn'>Delete</button>

                                    </td>
                                </tr>
                            );
                        })
                    }


                </tbody>
            </table>
        </div>
    )
}

export default ViewRooms;
