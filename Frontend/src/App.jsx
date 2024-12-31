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
import EnrollStudents from './components/Admin/Courses/EnrollStudents/EnrollStudents';
import AddTimeTable from './components/Admin/TimeTables/Create/AddTimeTable';
import ViewTimeTable from './components/Admin/TimeTables/ViewTimeTable/ViewTimeTable';
import UpdateTimeTable from './components/Admin/TimeTables/UpdateTimeTable/UpdateTimeTable';
import ViewRooms from './components/Admin/Rooms/ViewRooms/ViewRooms';
import CreateRooms from './components/Admin/Rooms/Add Rooms/CreateRooms';
import UpdateRooms from './components/Admin/Rooms/UpdateRooms/UpdateRooms';


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
                <Route path="/updateUser/:id" element={<Update />} />
                <Route path="/addCourses" element={<AddCourses />} />
                <Route path="/viewCourses" element={<ViewCourses />} />
                <Route path="/updateCourses/:id" element={<UpdateCourses />} />
                <Route path="/EnrollStudents" element={<EnrollStudents />} />
                <Route path="/AddTimeTable" element={<AddTimeTable />} />
                <Route path="/ViewTimeTable" element={<ViewTimeTable />} />
                <Route path="/UpdateTimeTable/:id" element={<UpdateTimeTable />} />
                <Route path="/ViewRooms" element={<ViewRooms />} />
                <Route path="/CreateRooms" element={<CreateRooms />} />
                <Route path="/UpdateRooms" element={<UpdateRooms />} />
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
