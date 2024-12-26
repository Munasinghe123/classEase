import React, { useState } from 'react';
import './AddUsers.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddUsers() {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [photo, setPhoto] = useState(null); // State to hold the photo file

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('password', password);
        formData.append('email', email);
        formData.append('role', role);
        if (photo) formData.append('photo', photo); // Append the photo if it exists

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:7001/api/users/register', formData, {
                headers: {
                    Authorization: `Bearer ${token}`, // Attach the token to the request
                    'Content-Type': 'multipart/form-data', // Set content type for file upload
                },
            });

            if (response.status === 201) {
                console.log('User added successfully', response.data);
                alert('User added successfully');
                e.target.reset();
                navigate('/viewUsers');
            } else {
                alert('Failed to add user. Please try again.');
            }

        } catch (err) {
            console.log('Failed to add user', err);
            alert('Failed to add user');
        }
    }

    const handleFileChange = (e) => {
        setPhoto(e.target.files[0]); // Set the file when it's selected
    };

    return (
        <div className='add-user-container-addUsers'>
            <h1>Add Users</h1>
            <form
                className='add-user-form-addUsers'
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <div className="form-group-addUsers">
                    <label htmlFor='userName' className='addUsers-label'>User Name</label>
                    <input
                        type='text'
                        name='userName'
                        id='userName'
                        className='addUsers-input'
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className='form-group-addUsers'>
                    <label htmlFor='email' className='addUsers-label'>Email</label>
                    <input
                        type='email'
                        name='userEmail'
                        id='userEmail'
                        className='addUsers-input'
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="form-group-addUsers">
                    <label htmlFor='password' className='addUsers-label'>Password</label>
                    <input
                        type='password'
                        name='password'
                        id='password'
                        className='addUsers-input'
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="form-group-addUsers">
                    <label htmlFor='role' className='addUsers-label'>Role</label>
                    <select
                        name="role"
                        id="role"
                        className='addUsers-select'
                        required
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="" disabled selected>
                            Select an option
                        </option>
                        <option value="faculty">Faculty</option>
                        <option value="student">Student</option>
                    </select>
                </div>

                <div className="form-group-addUsers">
                    <label htmlFor='photo' className='addUsers-label'>Upload Photo</label>
                    <input
                        type='file'
                        name='photo'
                        id='photo'
                        className='addUsers-input'
                        accept='image/*'
                        onChange={handleFileChange}
                    />
                </div>

                <button type='submit' className='submit-button-addUsers'>Add User</button>
            </form>
        </div>
    );
}

export default AddUsers;
