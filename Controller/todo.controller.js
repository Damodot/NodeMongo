const todoModel = require("../Models/todo.model")

const getTodo =  async (req, res) => {
    try {
        const todoList = await todoModel.find()
        res.render("index", { database: todoList })
    } catch (error) {
        console.log(error);
    }
}
const addTodo = async (req, res) => {
    try {
        const createdTodo = await todoModel.create(req.body)
        console.log(createdTodo);
        database.push(createdTodo)
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
}

const deleter = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await todoModel.findByIdAndDelete(id);
        console.log("Task deleted successfully!", id);
        res.redirect("/");
    } catch (error) {
        console.error(error);
    }
};

const editor = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const newTask = await todoModel.findById(id)    
        res.render("edit", { newTask });
    } catch (error) {
        console.log(error);
        
    }
};

const updator = async (req, res) => {
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
}

module.exports = {getTodo, addTodo, deleter, editor, updator}