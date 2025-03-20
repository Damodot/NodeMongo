const express = require('express')
const app = express()
const port = 5008
const ejs = require('ejs')
const mongoose = require("mongoose")
require('dotenv').config()
const todoRouter = require('./Routes/todo.route')

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use("/", todoRouter)


let database = []
let message = "";


const connect = async () => {
    try {
        const connected = await mongoose.connect(process.env.MONGO_URI)
        if (connected) {
            console.log("Connection to database is successful");

        }
    } catch (error) {
        console.log(error)
    }
}

connect()


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
