import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ViewFaculty.css';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';



function ViewFaculty() {
    const [users, setUsers] = useState([]);
    const [searchItem, setSearchItem] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:7001/api/users/getAllusers', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setUsers(response.data);
            } catch (err) {
                console.error('Error fetching users:', err);
            }
        };

        fetchUsers();
    }, []);

    // Filter users with role 'faculty'
    const facultyUsers = users.filter((user) => user.role === 'faculty');

    //search logic

    const filterdFaculty = facultyUsers.filter((faculty) =>
        faculty.name.toLowerCase().includes(searchItem.toLowerCase())
    );

    console.log("filterd faculties", filterdFaculty);

    // Delete function
    const deleteMember = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://localhost:7001/api/users/deleteMember/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
                alert('Member successfully deleted.');
            }
        } catch (err) {
            console.error('Error deleting member:', err);
            alert('Failed to delete the member. Please try again.');
        }
    };

    //download pdf
    const downloadPdf = () => {
        const doc = new jsPDF();
        doc.text("Registered Faculties Report", 14, 16);
        doc.autoTable({
            startY: 30,
            head: [['Name', 'Email']],
            body: filterdFaculty.map((faculty) => [
                faculty.name,
                faculty.email,
            ]),
        });
        doc.save("faculty-report.pdf");
    }


    return (
        <div className="faculty-dashboard-container">
            <h1 className='faculty-topic'>Faculty Users</h1>

            <div className='search-container'>
                <input type='text'
                    className='facultySearch-input'
                    value={searchItem}
                    onChange={(e) => setSearchItem(e.target.value)}
                    placeholder='search by name...'
                />
            </div>

            <div className='pdf-btn-container'>
                <button onClick={downloadPdf} className='download-btn'>Download PDF</button>
            </div>

            <div className='card-container'>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Photo</th>
                            <th>Email</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filterdFaculty.map((fclty) => {
                                return (
                                    <tr key={fclty._id}>
                                        <td>{fclty.name}</td>
                                        <td>
                                            <img
                                                src={`http://localhost:7001/uploads/${fclty.photo}`}
                                                alt={fclty.name}
                                                className='faculty-photo'
                                            />
                                        </td>
                                        <td>{fclty.email}</td>
                                        <td>
                                            <Link to={`/updateUser${fclty._id}`}>
                                                <button className='update-btn'>Update</button>
                                            </Link>

                                            <button
                                                className='delete-btn'
                                                onClick={() => deleteMember(fclty._id)}>Delete</button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div >
    );
}

export default ViewFaculty;
