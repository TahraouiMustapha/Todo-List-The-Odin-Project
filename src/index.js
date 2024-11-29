import "./style.css";
import { mainHandler } from "./mainHandler.js";
import { storage } from "./storageHandler.js";


console.log('projects\n')
const projects = storage.getProjects();
console.log(projects)
console.log('todos\n')
console.log(storage.getTodosList(projects[0].name));




