const express = require('express');
const { getAllCourses, createCourse, getCourseById, updateCourse, deleteCourse, getCoursesByFaculty,enrollStudent } = require('../Controller/CoursesController');
const verifyToken = require('../Middleware/AuthMiddleware');
const authorizeRoles = require('../Middleware/RoleMiddleware');

const router = express.Router();

// Admin or Faculty can manage courses
router.get('/getAllCourses', verifyToken, authorizeRoles("admin", "faculty"), getAllCourses);
router.post('/createCourses', verifyToken, authorizeRoles("admin", "faculty"), createCourse);
router.get('/getCourseById/:id', verifyToken, authorizeRoles("admin", "faculty", "student"), getCourseById);
router.put('/updateCourse/:id', verifyToken, authorizeRoles("admin", "faculty"), updateCourse);
router.delete('/deleteCourse/:id', verifyToken, authorizeRoles("admin", "faculty"), deleteCourse);
router.get('/getCoursesByFaculty/:facultyId', verifyToken, authorizeRoles("admin", "faculty"), getCoursesByFaculty);
router.post('/enrollStudent/:id', verifyToken, authorizeRoles("admin"), enrollStudent);

module.exports = router;
