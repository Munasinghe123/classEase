const mongoose = require('mongoose');

const TimeTableSchema = mongoose.Schema({

    course: {
        type: String
    },
    time: {
        type: String
    },
    location: {
        type: String
    },
    assignedFacultyMember: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }
}, {
    timeStamps: true
})

module.exports = mongoose.model("TimeTable", TimeTableSchema);