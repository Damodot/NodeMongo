const express = require('express')
const todoRouter = express.Router()
const {getTodo, addTodo, deleter, editor, updator} = require("../Controller/todo.controller")

todoRouter.get('/', getTodo)
todoRouter.post("/user/task", addTodo)
todoRouter.post("/user/delete/:id", deleter)
todoRouter.get("/user/edit/:id", editor)
todoRouter.post("/user/update/:id", updator)

module.exports = todoRouter;