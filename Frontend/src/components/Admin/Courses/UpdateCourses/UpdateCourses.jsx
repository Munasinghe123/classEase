import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateCourses.css';

function UpdateCourses() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');
    const [credits, setCredits] = useState('');
    const [facultyMember, setFacultyMember] = useState('');

    const [user, setUser] = useState([]);

    // Get course details
    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    `http://localhost:7001/api/courses/getCourseById/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log("Course details", response.data);

                setName(response.data.name);
                setCode(response.data.code);
                setDescription(response.data.description);
                setCredits(response.data.credits);
                // Ensure you're storing the ObjectId for faculty
                setFacultyMember(response.data.assignedFaculty._id);
            } catch (err) {
                alert("Failed to get the relevant course details.");
                console.error(err);
            }
        };

        fetchCourseDetails();
    }, [id]);

    // Get all users (faculty)
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:7001/api/users/getAllUsers', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data);
            } catch (err) {
                console.log(err);
            }
        }

        fetchUsers();
    }, []);

    // Filter faculty members
    const faculty = user.filter((f) => f.role === 'faculty');

    const handleUpdateCourse = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');

            // Prepare updated course object only with the fields the user has changed
            const updatedCourse = {
                name: name || undefined,  // Only send if changed
                code: code || undefined,
                description: description || undefined,
                credits: credits || undefined,
                assignedFaculty: facultyMember || undefined,  // Send the selected faculty's ObjectId
            };

            console.log(updatedCourse);

            const response = await axios.put(
                `http://localhost:7001/api/courses/updateCourse/${id}`,
                updatedCourse,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 200) {
                alert("Course updated successfully!");
                setName('');
                setCode('');
                setDescription('');
                setCredits('');
                setFacultyMember('');

                navigate("/viewCourses");
            }

        } catch (err) {
            alert("Failed to update the course.");
            console.error(err);
        }
    };

    return (
        <div className="updateContainer">
            <div className="updateCourse-title">
                <h1>Update Course</h1>
            </div>
            <form onSubmit={handleUpdateCourse} className='updateCourseForm'>
                <label>Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label>Code</label>
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />

                <label>Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label>Credits</label>
                <input
                    type="number"
                    value={credits}
                    onChange={(e) => setCredits(e.target.value)}
                />

                <label>Faculty Member</label>
                <select
                    value={facultyMember}
                    onChange={(e) => setFacultyMember(e.target.value)}
                >
                    {faculty.map((faculty, index) => (
                        <option key={index} value={faculty._id}>
                            {faculty.name}
                        </option>
                    ))}
                </select>

                <button type="submit">Update Course</button>
            </form>
        </div>
    );
}

export default UpdateCourses;
