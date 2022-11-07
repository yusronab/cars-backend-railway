const express = require("express")
const cors = require("cors")
const axios = require("axios")
const app = express()

app.use(cors())

app.get("/", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Hello there"
    })
})

app.get("/cars", async (req, res) => {
    try {
        const response = await axios({
            method: 'GET',
            url: 'https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json',
            timeout: 120000
        })

        const cars = response.data

        res.status(200).json({
            status: "OK",
            data: cars
        })
        
    } catch (err) {
        res.status(400).json({
            status: "BAD REQUEST",
            errors: err.message
        })
    }
})

module.exports = app