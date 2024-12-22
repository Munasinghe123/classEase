import { React, useEffect, useState } from 'react'
import './AddCourses.css'
import axios from 'axios';

function AddCourses() {

    const [faculty, setFaculty] = useState([]);
    const [name, setCourseName] = useState('');
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');
    const [credits, setCredits] = useState('');
    const [assignedFaculty, setFacultyMember] = useState('');

    useEffect(() => {

        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:7001/api/users/getAllUsers', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach the token to the request
                    },
                });

                //filter faculty members
                const facultyMembers = response.data.filter((u) => u.role === "faculty");
                setFaculty(facultyMembers);
            } catch (err) {
                console.log(err);
                alert('failed to get faculty members');
            }
        };
        fetchUsers();
    }, []);

    const addCourse = async (e) => {
        e.preventDefault(); // Prevent page reload on form submission
        try {
            const token = localStorage.getItem('token');
            const courseData = {
                name,
                code,
                description,
                credits,
                assignedFaculty,
            };
            const response = await axios.post('http://localhost:7001/api/courses/createCourses', courseData, {
                headers: {
                    Authorization: `Bearer ${token}`, // Attach the token to the request
                }
            });

            console.log(response.data);  // You can handle success response here
            if (response.status === 201) {
                console.log('created course', response.data);
                alert('Course added successfully');
                e.target.reset();
            } else {
                alert('Unable to add course');
            }

        } catch (err) {
            console.log(err);
            alert('Failed to add course');
        }
    };

    return (
        <div className='main-container'>
            <h1 className='AddCourses-topic'>Add Courses</h1>

            <div className='AddCoursees-contsiner'>
                <form className='addCoursesForm' onSubmit={addCourse}>
                    <label htmlFor='name'>Course Name</label>
                    <input
                        type='text'
                        name='name'
                        id='name'
                        required
                        onChange={(e) => setCourseName(e.target.value)}
                    /> <br />

                    <label htmlFor='code'>Code</label>
                    <input
                        type='text'
                        name='code'
                        id='code'
                        required
                        onChange={(e) => setCode(e.target.value)}
                    /> <br />

                    <label htmlFor='Description'>Description</label>
                    <input
                        type='text'
                        name='Description'
                        id='Description'
                        required
                        onChange={(e) => setDescription(e.target.value)}
                    /> <br />

                    <label htmlFor='Credits'>Credits</label>
                    <input
                        type='number'
                        name='Credits'
                        id='Credits'
                        required
                        onChange={(e) => setCredits(e.target.value)}
                    /> <br />

                    <label htmlFor='faculty'>Assign Faculty</label>
                    <select
                        value={assignedFaculty}
                        onChange={(e) => setFacultyMember(e.target.value)}
                    >
                        <option value="">Select Member</option>
                        {
                            faculty.map((member, index) => {
                                return (<option key={index} value={member._id}>{member.name}</option>);
                            })
                        }
                    </select>

                    <br />
                    <button type='submit' className='AddCourse-btn'>
                        Add Course
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddCourses;
