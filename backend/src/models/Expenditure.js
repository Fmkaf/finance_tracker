const mongoose = require('mongoose');

const expenditureSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    date: {
        type: String
    },
    description: {
        type: String
    },
    amount: {
        type: String
    },
    details: {
        type: String
    },
    paymentType: {
        type: String,
        enum: ["UPI", "Card Payment", "Cash", null, ""],
    }
}, { versionKey: false })

module.exports = mongoose.model("expenditure", expenditureSchema)