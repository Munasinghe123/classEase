import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Common/Login/Login';
import AdminDashboard from './components/Admin/AdminDashBoard/AdminDashboard';
import FacultyDashboard from './components/Faculty/FacultyDashboard';
import StudentDashboard from './components/Student/StudentDashboard';
import Home from './components/Common/Home/Home';
import NotFound from './components/NotFound/NotFound';
import Header from './components/Common/Header/Header';
import AddUsers from './components/Admin/Users/AddUsers/AddUsers';
import ViewUsers from './components/Admin/Users/ViewUsers/ViewUsers'
import ViewFaculty from './components/Admin/Users/ViewFaculty/ViewFaculty'
import ViewStudents from './components/Admin/Users/ViewStudents/ViewStudents'
import Footer from './components/Common/Footer/Footer';
import Update from './components/Admin/Users/UpdateMember/Update';
import AddCourses from './components/Admin/Courses/AddCourses/AddCourses';
import ViewCourses from './components/Admin/Courses/ViewCourses/ViewCourses';
import UpdateCourses from './components/Admin/Courses/UpdateCourses/UpdateCourses';


import { AuthContext } from './context/AuthContext';

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>

      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {user ? (
          <>
            {user.role === 'admin' && (
              <>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/faculty" element={<FacultyDashboard />} />
                <Route path="/student" element={<StudentDashboard />} />
                <Route path="/addUser" element={<AddUsers />} />
                <Route path="/viewUsers" element={<ViewUsers />} />
                <Route path="/viewStudents" element={<ViewStudents />} />
                <Route path="/viewFaculty" element={<ViewFaculty />} />
                <Route path="/update/:id" element={<Update />} />
                <Route path="/addCourses" element={<AddCourses />} />
                <Route path="/viewCourses" element={<ViewCourses />} />
                <Route path="/updateCourses/:id" element={<UpdateCourses />} />
              </>
            )}

            {user.role === 'faculty' && (
              <Route path="/faculty" element={<FacultyDashboard />} />
            )}

            {user.role === 'student' && (
              <Route path="/student" element={<StudentDashboard />} />
            )}
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
