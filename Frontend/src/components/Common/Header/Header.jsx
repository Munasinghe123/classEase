import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import './Header.css';


const Header = () => {
    const { logout, user } = useContext(AuthContext);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = (visible) => {
        setDropdownVisible(visible);
    };

    return (<>

        <header className="home-header">
            <div className="header-content">
                <div className="welcome-message">
                    <h1>Welcome, {user ? user.name : 'Guest'}</h1>
                </div>

                {user && user.role === 'admin' && (
                    <nav className="admin-nav">
                        <Link to="/faculty" className="nav-link">Faculty</Link>
                        <Link to="/student" className="nav-link">Student</Link>
                        <Link to="/addUser" className="nav-link">Add User</Link>

                        {/* Dropdown Link */}
                        <div
                            className="dropdown"
                            onMouseEnter={() => toggleDropdown(true)}
                            onMouseLeave={() => toggleDropdown(false)}
                        >
                            <span to="/viewUsers" className="nav-link">View Users</span>
                            {dropdownVisible && (
                                <div className="dropdown-menu">
                                    <Link to="/viewStudents" className="dropdown-item">View Students</Link>
                                    <Link to="/viewFaculty" className="dropdown-item">View Faculty</Link>
                                </div>
                            )}
                        </div>
                    </nav>
                )}

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
