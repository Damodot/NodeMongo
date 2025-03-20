const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    task: { type: String, required: true }
})

const todoModel = mongoose.model("todoList", todoSchema)

module.exports = todoModel;