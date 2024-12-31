const mongoose = require('mongoose');

const TimeTableSchema = new mongoose.Schema({

    course: {
        type: mongoose.Schema.Types.ObjectId, ref: "Courses"
    },
    time: {
        type: String
    },
    location: {
        type: mongoose.Schema.Types.ObjectId, ref: "Rooms"
    },
    assignedFacultyMember: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }
}, {
    timeStamps: true
})

module.exports = mongoose.model("TimeTable", TimeTableSchema);