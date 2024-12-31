import React, { useEffect, useState } from 'react'
import './ViewResources.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

function ViewResources() {

    const [resources, setResources] = useState([]);

    useEffect(() => {

        const fetchResources = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:7001/api/resources/getAllResources`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log(response.data);
                setResources(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchResources();
    }, [])

    return (
        <div className='resouces-container'>
            <h1>Resources</h1>

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
                        resources.map((res, index) => {
                            return (
                                <tr key={res._id}>
                                    <td>{res.resourceType}</td>
                                    <td>{res.name}</td>

                                    <td>
                                        <Link to="/UpdateResource">
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

export default ViewResources
