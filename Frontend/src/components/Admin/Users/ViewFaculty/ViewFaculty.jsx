import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ViewFaculty.css';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';



function ViewFaculty() {
    const [users, setUsers] = useState([]);

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
            body: facultyUsers.map((faculty) => [
                faculty.name,
                faculty.email,
            ]),
        });
        doc.save("faculty-report.pdf");
    }

    return (
        <div className="faculty-container">
            <h1>Faculty Users</h1>

            <div className='pdf-btn-container'>
                <button onClick={downloadPdf} className='download-btn'>Download PDF</button>
            </div>

            <div className='card-container'>
                {facultyUsers.length > 0 ? (
                    facultyUsers.map((faculty, index) => {
                        return (

                            <div className='faculty-card' key={index}>
                                <h2>{faculty.name}</h2>
                                <p><strong>Email :</strong>{faculty.email}</p>

                                <div className='card-buttons'>

                                    <Link to={`/update/${faculty._id}`}>
                                        <button className='update-button'>Update</button>
                                    </Link>

                                    {/* Delete button */}
                                    <div className='delete-button'>
                                        <button onClick={() => deleteMember(faculty._id)} className="delete-btn">Delete</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <p>No Faculties</p>
                )

                }
            </div>
        </div >
    );
}

export default ViewFaculty;
