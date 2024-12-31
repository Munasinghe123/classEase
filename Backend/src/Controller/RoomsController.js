const room = require('../Model/RoomModel');

const createRooms = async (req, res) => {

    const { name, roomType } = req.body;

    try {
        const newRoom = new room({
            name, roomType
        })

        const savedRoom = newRoom.save();
        res.status(200).json({ message: "new resource", savedRoom })

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const getAllRooms = async (req, res) => {

    try {
        const allRooms = await room.find();

        res.status(200).json(allRooms)
        console.log(allRooms);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    createRooms, getAllRooms
}