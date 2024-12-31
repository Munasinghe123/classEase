const mongoose = require('mongoose');


const resourcesSchema = new mongoose.Schema({

    name: {
        type: String
    },

    resourceType: {
        type: String
    }
});

module.exports = mongoose.model('Resourses', resourcesSchema)