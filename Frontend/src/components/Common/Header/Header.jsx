import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import './Header.css';
import axios from 'axios';

const Header = () => {
    const { logout, user } = useContext(AuthContext);
    const [usersdropdownVisible, setUsersDropdownVisible] = useState(false);
    const [coursesdropdownVisible, setCoursesDropdownVisible] = useState(false);
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        const fetchUserPhoto = async () => {
            if (user && user.id) {
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.get(`http://localhost:7001/api/users/getUserById/${user.id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setPhoto(response.data.user.photo);
                } catch (err) {
                    console.log('Error fetching user photo:', err);
                }
            } else {
                setPhoto(null); // Clear photo when user is null
            }
        };

        fetchUserPhoto();
    }, [user]); // Runs whenever the 'user' changes

    //users' dropdown
    const toggleUsersDropdown = (visible) => {
        setUsersDropdownVisible(visible);
    };

    //courses dropdown
    const toggleCoursesDropdown = (visible) => {
        setCoursesDropdownVisible(visible);
    };

    return (
        <>
            <header className="home-header">
                <div className="header-content">
                    {/* User Photo and Welcome Message */}
                    <div className="photo-and-message">
                        <div className="photo">
                            {photo ? (
                                <img
                                    src={`http://localhost:7001/uploads/${photo}`}
                                    alt="User"
                                    className="user-photo"
                                />
                            ) : (
                                <img
                                    src="/defaultAvatar.jpg"
                                    alt="Default Avatar"
                                    className="user-photo"
                                />
                            )}
                        </div>
                        <div className="welcome-message">
                            <h1>Welcome, {user ? user.name : 'Guest'}</h1>
                        </div>
                    </div>

                    {/* Admin Links */}
                    {user && user.role === 'admin' && (
                        <nav className="admin-nav">
                            <Link to="/admin" className="nav-link">Admin Dashboard</Link>


                            {/*users' Dropdown Menu */}
                            <div
                                className="dropdown"
                                onMouseEnter={() => toggleUsersDropdown(true)}
                                onMouseLeave={() => toggleUsersDropdown(false)}
                            >

                                <span className="nav-link">User Details</span>
                                {usersdropdownVisible && (
                                    <div className="dropdown-menu">
                                        <Link to="/addUser" className="dropdown-item">Add Users</Link>
                                        <Link to="/viewStudents" className="dropdown-item">View Students</Link>
                                        <Link to="/viewFaculty" className="dropdown-item">View Faculty Members</Link>
                                    </div>
                                )}
                            </div>

                            <div
                                className="dropdown"
                                onMouseEnter={() => toggleCoursesDropdown(true)}
                                onMouseLeave={() => toggleCoursesDropdown(false)}
                            >

                                <span className="nav-link">Course details</span>
                                {coursesdropdownVisible && (
                                    <div className="dropdown-menu">
                                        <Link to="/addCourses" className="dropdown-item">Add courses</Link>
                                        <Link to="/viewCourses" className="dropdown-item">View Course details</Link>
                                        <Link to="/EnrollStudents" className="dropdown-item">Enroll Students</Link>
                                    </div>
                                )}
                            </div>
                        </nav>
                    )}

                    {/* {faculty member routes} */}
                    {user && user.role == "faculty" && (
                        <Link to="/faculty" className="nav-link">Faculty</Link>
                    )}

                    {/* {student routes} */}
                    {user && user.role == "student" && (
                        <Link to="/student" className="nav-link">Student</Link>
                    )}

                    {/* Logout or Login Button */}
                    {user ? (
                        <button onClick={logout} className="logout-btn">Logout</button>
                    ) : (
                        <Link to="/login" className="login-btn">Login</Link>
                    )}
                </div>
            </header>
        </>
    );
};

export default Header;
