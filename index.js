const express = require('express')
const app = express()
const port = 5008
const ejs = require('ejs')
const mongoose = require("mongoose")
require('dotenv').config()

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))

const todoSchema = new mongoose.Schema({
    task: { type: String, required: true }
})

const todoModel = mongoose.model("todoList", todoSchema)

let database = []
let message = "";

app.get('/', async (req, res) => {
    try {
        const todoList = await todoModel.find()
        res.render("index", { database: todoList })
    } catch (error) {
        console.log(error);
    }
})

app.post("/user/task", async (req, res) => {
    try {
        const createdTodo = await todoModel.create(req.body)
        console.log(createdTodo);
        database.push(createdTodo)
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
});

app.post("/user/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await todoModel.findByIdAndDelete(id);
        console.log("Task deleted successfully!", id);
        res.redirect("/");
    } catch (error) {
        console.error(error);
    }
});


app.get("/user/edit/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const newTask = await todoModel.findById(id)    
        res.render("edit", { newTask });
    } catch (error) {
        console.log(error);
        
    }
});

app.post("/user/update/:id", async (req, res) => {
    try {
        console.log(req.body); 
        console.log(req.params); 

        const { id } = req.params; 
        const { task } = req.body; 
        const updatedTask = await todoModel.findByIdAndUpdate(id, { task: task }, { new: true });

        console.log("Updated task:", updatedTask); // Logs updated task
        res.redirect("/");
    } catch (error) {
        console.log(error);

    }
})



const connect = async () => {
    try {
        const connected = await mongoose.connect(process.env.mongoUri)
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
