const TimeTable = require('../Model/TimeTableModel');
const User = require('../Model/UserModel');
const Room = require('../Model/RoomModel');

const createTimeTable = async (req, res) => {
    try {
        const { course, time, location, assignedFacultyMember } = req.body;

        // Check if the assigned faculty member exists and has the 'faculty' role
        const faculty = await User.findOne({ _id: assignedFacultyMember, role: 'faculty' });
        if (!faculty) {
            console.log("no such faculty");
            return res.status(404).json({ message: 'No such faculty' });
        }

        // Check if the location (room) exists
        const room = await Room.findOne({ _id: location });
        if (!room) {
            console.log("no such room");
            return res.status(404).json({ message: 'No such room' });
        }

        // Check for time conflicts
        const overlappingTimeTable = await TimeTable.findOne({
            location, // Same location
            time,     // Same time
        });

        const courseExists = await TimeTable.findOne({ course });
        if (courseExists) {
            console.log("Course is already scheduled");
            return res.status(400).json({ message: 'Course is already scheduled' });
        }

        if (overlappingTimeTable) {
            console.log("Location is already booked at the given time");
            return res.status(400).json({ message: 'Location is already booked at the given time' });
        }

        // If no conflicts, create the timetable
        const timeTable = new TimeTable({
            course,
            time,
            location,
            assignedFacultyMember,
        });

        const savedTimeTable = await timeTable.save();
        res.status(200).json(savedTimeTable);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Unable to create a timetable' });
    }
};

const getTimeTable = async (req, res) => {
    try {
        const timeTable = await TimeTable.find().populate("assignedFacultyMember", "name")
            .populate("location", "name")
            .populate("course", "name");

        res.status(200).json(timeTable);
    } catch (err) {
        console.log(err);
    }
}

const getTimeTableById = async (req, res) => {
    try {
        const id = req.params.id;

        const timeTable = await TimeTable.findById(id).populate("assignedFacultyMember", "name")
            .populate("location", "name");

        if (!timeTable) {
            return res.status(404).json({ message: "no such timetable" });
        }

        res.status(200).json(timeTable);

    } catch (err) {
        console.log(err);
    }
}

const updateTimeTable = async (req, res) => {
    try {
        const id = req.params.id;
        const { course, time, location, assignedFacultyMember } = req.body;

        const faculty = await User.findOne({ _id: assignedFacultyMember, role: 'faculty' });
        if (!faculty) {
            console.log("no such faculty");
            return res.status(404).json({ message: 'no such faculty' });
        }

        const room = await Room.findOne({ _id: location });
        if (!room) {
            console.log("no such room")
            return res.status(404).json({ message: 'no such room' });
        }

        const timeTable = await TimeTable.findByIdAndUpdate(id, { course, time, location, assignedFacultyMember }, { new: true });

        res.status(200).json(timeTable);

    } catch (err) {
        console.log(err);
    }
}

const deleteTimeTable = async (req, res) => {
    try {
        const id = req.params.id;

        const timeTable = await TimeTable.findByIdAndDelete(id);

        if (!timeTable) {
            return res.status(404).json({ message: "Timetable not found" });
        }

        res.status(200).json({
            message: "Timetable deleted successfully",
            timeTable
        });
    } catch (err) {
        console.error(err);
        // Send an error response if something goes wrong
        res.status(500).json({ message: "An error occurred while deleting the timetable" });
    }
};


module.exports = {
    createTimeTable, getTimeTable, getTimeTableById, updateTimeTable, deleteTimeTable
}