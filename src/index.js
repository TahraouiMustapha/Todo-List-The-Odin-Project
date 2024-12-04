import "./style.css";
import { mainHandler } from "./mainHandler.js";
import { storage } from "./storageHandler.js";
import { domHandler } from "./domHandler.js";
import dialogBuilder from "./dialogBuilder.js";


// console.log('projects\n')
// domHandler.showProjects();
// domHandler.showTodosList('newNameValue')


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
