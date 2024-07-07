const express = require('express');
const app = express();
const cors = require("cors")
const mongoose = require("mongoose")
require('dotenv').config()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URL).then(
    (resp) => { console.log("MongoDB Connection: Success") }
).catch((error) => { console.log(error) })
app.use(require('./src/routes/indexRoute'))

app.listen(8000, () => {
    console.log(`Server listening on 8000
`)
})