const mongoose = require('mongoose')

const dbConnection = async () => {

    try {
        const connection = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log('db connected');
    } catch (err) {
        console.log(err);
    }
}

module.exports = dbConnection;