import React from 'react'
import { Link } from 'react-router-dom'
import './ViewUsers.css' 

function ViewUsers() {
    return (
        <div className="view-users-container">
            <h1>View Users page</h1>

            <Link to='/viewFaculty' className="button-link">View Faculty</Link><br /><br />
            <Link to='/viewStudents' className="button-link">View Students</Link>
        </div>
    )
}

export default ViewUsers
