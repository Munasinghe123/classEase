const Course = require('../Model/CourseModel');
const User = require('../Model/UserModel');

// Get all courses
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('assignedFaculty', 'name email').populate('enrolledStudent', 'name email');
        res.status(200).json(courses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch courses" });
    }
};

// Create a new course
const createCourse = async (req, res) => {
    try {
        const { name, code, description, credits, assignedFaculty } = req.body;

        // Validate faculty role
        const faculty = await User.findOne({ _id: assignedFaculty, role: 'faculty' });
        if (!faculty) {
            return res.status(400).json({ message: 'Invalid faculty ID or user is not a faculty' });
        }

        const course = new Course({
            name,
            code,
            description,
            credits,
            assignedFaculty
        });

        const savedCourse = await course.save();
        res.status(201).json(savedCourse);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to create course" });
    }
};

// Enroll a student in a course
const enrollStudent = async (req, res) => {
    try {
        const { studentId } = req.body;
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const student = await User.findOne({ _id: studentId, role: 'student' });
        if (!student) {
            return res.status(400).json({ message: 'Invalid student ID or user is not a student' });
        }

        // Add student to enrolledStudent if not already enrolled
        if (!course.enrolledStudent.includes(studentId)) {
            course.enrolledStudent.push(studentId);
            await course.save();
        }

        res.status(200).json({ message: "Student enrolled successfully", course });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to enroll student" });
    }
};

// Get course by ID
const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('assignedFaculty', 'name email').populate('enrolledStudent', 'name email');
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json(course);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch course details" });
    }
};


const updateCourse = async (req, res) => {
    const { name, code, description, credits, assignedFaculty } = req.body;

    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        course.name = name || course.name;
        course.code = code || course.code;
        course.description = description || course.description;
        course.credits = credits || course.credits;

        if (assignedFaculty) {
            course.assignedFaculty = assignedFaculty;  // This should be the ObjectId of the faculty
        }

        await course.save();
        res.status(200).json(course);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating course' });
    }
};


// Delete a course
const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json({ message: "Course deleted successfully", course });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to delete course" });
    }
};

// Get courses assigned to a specific faculty
const getCoursesByFaculty = async (req, res) => {
    try {
        const facultyId = req.params.facultyId;
        const courses = await Course.find({ assignedFaculty: facultyId }).populate('assignedFaculty', 'name email');
        if (!courses) {
            return res.status(404).json({ message: "No courses found for this faculty" });
        }
        res.status(200).json(courses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch courses" });
    }
};


module.exports = {
    getAllCourses,
    createCourse,
    enrollStudent,
    getCourseById,
    updateCourse,
    deleteCourse,
    getCoursesByFaculty
};
