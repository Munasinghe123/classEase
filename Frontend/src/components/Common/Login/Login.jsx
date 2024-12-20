import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

import { jwtDecode } from 'jwt-decode';
import './Login.css';
import axios from 'axios';

const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:7001/api/auth/login', { name, password });
            const token = response.data.token;

            console.log('JWT Token:', token);
            const decoded = jwtDecode(token);

            console.log('Decoded Token:', decoded);
            login(token);

            if (decoded.role === 'admin') {
                navigate('/admin');
            } else if (decoded.role === 'faculty') {
                navigate('/faculty');
            } else if (decoded.role === 'student') {
                navigate('/student');
            } else {
                console.error('Unknown role:', decoded.role);
                navigate('/');
            }
        } catch (error) {
            console.error('Login failed:', error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="login-container">

            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className='login-header' >Login</h2>
                <input
                    className="login-input"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    className="login-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="login-button" type="submit">Login</button>
            </form>
            {/* <Link className="home-link" to="/">Home</Link> */}
        </div>
    );
};

export default Login;
