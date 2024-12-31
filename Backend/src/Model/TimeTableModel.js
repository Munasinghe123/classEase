const mongoose = require('mongoose');

const TimeTableSchema = new mongoose.Schema({

    course: {
        type: String
    },
    time: {
        type: String
    },
    location: {
        type: mongoose.Schema.Types.ObjectId, ref: "Resourses"
    },
    assignedFacultyMember: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }
}, {
    timeStamps: true
})

module.exports = mongoose.model("TimeTable", TimeTableSchema);