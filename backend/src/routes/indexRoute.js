const router = require("express").Router();
const Expenditure = require('../models/Expenditure')
router.post("/create", async (req, res) => {
    try {
        const record = new Expenditure(req.body)
        const response = await record.save()
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send(
            {
                message: "An error occured. Please try again later",
                details: {
                    error
                }
            }
        )
    }
})

router.get("/", async (req, res) => {
    try {
        const records = await Expenditure.find()
        res.status(200).send(records)
    } catch (error) {
        res.status(500).send(
            {
                message: "An error occured. Please try again later",
                details: {
                    error
                }
            }
        )
    }
})

router.patch("/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const updateRecord = req.body;
        delete updateRecord._idl
        const records = await Expenditure.findOneAndUpdate({ _id }, { $set: updateRecord }, { runValidators: true })
        res.status(200).send(records)
    } catch (error) {
        res.status(500).send(
            {
                message: "An error occured. Please try again later",
                details: {
                    error
                }
            }
        )
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const response = await Expenditure.findOneAndDelete({ _id });
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send(
            {
                message: "An error occured. Please try again later",
                details: {
                    error
                }
            }
        )
    }
})

module.exports = router