import "./style.css";
import { mainHandler } from "./mainHandler.js";
import { domHandler } from "./domHandler.js";
import dialogBuilder from "./dialogBuilder.js";


domHandler.showProjects();
domHandler.showTodosList();


//add click event to appear dialog of adding Project 
const addNewProject = document.querySelector('#add-new-project-btn');
addNewProject.addEventListener('click', () => {
    dialogBuilder.addNewProjectDialog();
})

//add click event to appear dialog of adding Todos 
const addNewTodos = document.querySelector('#add-new-todos-btn');
addNewTodos.addEventListener('click', () => {
    dialogBuilder.addNewTodosDialog();
})
