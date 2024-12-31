const TimeTable = require('../Model/TimeTableModel');
const User = require('../Model/UserModel');
const Resource = require('../Model/ReourcesModel');

const createTimeTable = async (req, res) => {

    try {
        const { course, time, location, assignedFacultyMember } = req.body;

        const faculty = await User.findOne({ _id: assignedFacultyMember, role: 'faculty' });
        if (!faculty) {
            console.log("no such faculty");
            return res.status(404).json({ message: 'no such faculty' });
        }

        const resource = await Resource.findOne({ _id: location });
        if (!resource) {
            console.log("no such resource")
            return res.status(404).json({ message: 'no such resource' });
        }

        const timeTable = new TimeTable({
            course, time, location, assignedFacultyMember
        })

        const savedTimeTable = await timeTable.save();
        res.status(200).json(savedTimeTable);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'unable to create a timetable' })
    }
}

const getTimeTable = async (req, res) => {
    try {
        const timeTable = await TimeTable.find().populate("assignedFacultyMember", "name")
            .populate("location", "name");

        res.status(200).json(timeTable);
    } catch (err) {
        console.log(err);
    }
}

const getTimeTableById = async (req, res) => {
    try {
        const id = req.params.id;

        const timeTable = await TimeTable.findById(id).populate("assignedFacultyMember", "name");

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