import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import './Home.css';
import image1 from '../../images/image.jpeg';

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
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero-section" style={{ backgroundImage: `url(${image1})` }}>
                <div className="overlay">
                    <h1>Welcome to ClassEase</h1>
                    <p>Find all your university details here</p>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <h2>Why Choose ClassEase?</h2>
                <div className="features-container">
                    <div className="feature-card">
                        <h3>📚 Course Management</h3>
                        <p>Seamlessly manage courses, assignments, and schedules.</p>
                    </div>
                    <div className="feature-card">
                        <h3>👩‍🏫 Instructor Insights</h3>
                        <p>Instructors get powerful tools to track student progress.</p>
                    </div>
                    <div className="feature-card">
                        <h3>💳 Secure Payments</h3>
                        <p>Easy and secure online payment for courses and materials.</p>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials-section">
                <h2>What Our Users Say</h2>
                <div className="testimonial-card">
                    <p>“ClassEase has transformed my learning experience. Highly recommend!”</p>
                    <span>- Sarah, Student</span>
                </div>
                <div className="testimonial-card">
                    <p>“Managing my courses has never been easier. A game-changer!”</p>
                    <span>- Michael, Instructor</span>
                </div>
            </section>
        </div>
    );
};

export default Home;
