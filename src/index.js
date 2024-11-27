import "./style.css";
import { createTodos } from "./Todos.js";
import { createProject } from "./ProjectClass.js";

const newTodo = createTodos('todos 1', 'desc', 'date', 'priority');

const myProject = createProject('project 1');
myProject.addTodos(newTodo);

