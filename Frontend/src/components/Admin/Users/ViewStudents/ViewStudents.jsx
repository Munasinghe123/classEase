
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ViewStudents.css';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

function ViewStudents() {
    const [user, setUser] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:7001/api/users/getAllUsers', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach the token to the request
                    },
                });
                console.log("users", response.data);
                setUser(response.data);
            } catch (err) {
                console.log(err);
                alert('Failed to get the students');
            }
        };
        fetchUsers();
    }, []);

    // Delete function
    const deleteStudent = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://localhost:7001/api/users/deleteMember/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setUser((prevUsers) => prevUsers.filter((user) => user._id !== id));
                alert('Member successfully deleted.');
            }
        } catch (err) {
            console.error('Error deleting member:', err);
            alert('Failed to delete the member. Please try again.');
        }
    };

    const students = user.filter((u) => u.role === 'student');
    console.log("students", students);

   
    const filteredStudents = students.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Function to download the report as a PDF
    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text("Registered Students Report", 14, 16);
        doc.autoTable({
            startY: 30,
            head: [['Name', 'Email']],
            body: filteredStudents.map((student) => [
                student.name,
                student.email,
            ]),
        });
        doc.save("students-report.pdf");
    };

    return (
        <div className='students-container'>
            <h1 className='students-topic'>Registered Students</h1>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Update the search term on input change
                    className="search-input"
                />
            </div>

            <button onClick={downloadPDF} className='download-pdf-btn'>
                Download PDF
            </button>

            <div className='table-container'>

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
                            filteredStudents.map((std) => {

                                return (
                                    <tr key={std._id}>
                                        <td>{std.name}</td>

                                        <td>
                                            <img
                                                src={`http://localhost:7001/uploads/${std.photo}`}
                                                alt={std.name}
                                                className="student-photo"
                                            />
                                        </td>

                                        <td>{std.email}</td>
                                        <td>
                                            <Link to={`/update/${std._id}`}>
                                                <button className='update-btn'>Update</button>
                                            </Link>
                                            <button className='delete-btn'
                                                onClick={() => deleteStudent(std._id)}>Delete</button>
                                        </td>
                                    </tr>
                                )

                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewStudents;
