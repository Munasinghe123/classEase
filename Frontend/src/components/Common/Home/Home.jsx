import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import './Home.css'

const Home = () => {
    const { user } = useContext(AuthContext);

    if (user) {
        if (user.role === 'admin') {
            return <Navigate to="/admin" />;
        } else if (user.role === 'manager') {
            return <Navigate to="/manager" />;
        } else if (user.role === 'user') {
            return <Navigate to="/user" />;
        }
    }

    return (
        <div className='home-container'>

            <div className="home-content">
                <h1>Welcome to the Home Page</h1>
            </div>
        </div>
    );
};

export default Home;
