const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    credits: {
        type: String,
        required: true
    },
    assignedFaculty: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    enrolledStudent: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }]
},
    {
        timestamps: true
    })

module.exports = mongoose.model("Courses", CourseSchema)