const resources = require('../Model/ReourcesModel');

const createReources = async (req, res) => {

    const { name, resourceType } = req.body;

    try {
        const newResourse = new resources({
            name, resourceType
        })

        const savedResource = newResourse.save();
        res.status(200).json({ message: "new resource", savedResource })

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const getAllResources = async (req, res) => {

    try {
        const allResources = await resources.find();

        res.status(200).json(allResources)
        console.log(allResources);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    createReources, getAllResources
}