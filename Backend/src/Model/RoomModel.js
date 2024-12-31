const mongoose = require('mongoose');


const roomsSchema = new mongoose.Schema({

    name: {
        type: String
    },

    roomType: {
        type: String
    }
});

module.exports = mongoose.model('Rooms', roomsSchema)