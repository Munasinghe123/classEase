const TimeTable = require('../Model/TimeTableModel');
const User = require('../Model/UserModel');

const createTimeTable = async (req, res) => {

    try {
        const { course, time, location, assignedFacultyMember } = req.body;

        const faculty = await User.findOne({ _id: assignedFacultyMember, role: 'faculty' });
        if (!faculty) {
            console.log("no such faculty");
            return res.status(404).json({ message: 'no such faculty' });
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
        const timeTable = await TimeTable.find().populate("assignedFacultyMember", "name");

        res.status(200).json(timeTable);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    createTimeTable, getTimeTable
}