import "./style.css";
import { mainHandler } from "./mainHandler.js";
import { domHandler } from "./domHandler.js";
import dialogBuilder from "./dialogBuilder.js";


domHandler.showProjects();
domHandler.showTodosList();

// add click event to classification btns
const allTodosBtn = document.querySelector('#allTodosBtn');
allTodosBtn.addEventListener('click', ()=> {
    domHandler.showAllTodos();
})

const todayTodosBtn = document.querySelector('#todayTodosBtn');
todayTodosBtn.addEventListener('click', ()=> {
    domHandler.showTodayTodos();
})

// add click event to appear dialog of adding Project 
const addNewProject = document.querySelector('#add-new-project-btn');
addNewProject.addEventListener('click', () => {
    dialogBuilder.addNewProjectDialog();
})

// add click event to appear dialog of adding Todos 
const addNewTodos = document.querySelector('#add-new-todos-btn');
addNewTodos.addEventListener('click', () => {
    dialogBuilder.addNewTodosDialog();
})
