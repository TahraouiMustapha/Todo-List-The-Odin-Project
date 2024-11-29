import { createTodos } from "./Todos.js";
import { createProject } from "./ProjectClass.js";
import { storage } from "./storageHandler.js";
import { format } from "date-fns";

const mainHandler = (() => {

    const addNewProject = ( projectName ) => {
        //if  the projectName does not exist 
        if(!storage.getProjectByName(projectName)) {
            const newProject = createProject(projectName);
            storage.storeAProject(newProject);
        }
    }

    const addNewTodos = (projectName, obj) => {
        const myProject = storage.getProjectByName(projectName);
        const newTodos = createTodos(obj.title, obj.desc, obj.date, obj.priority);
        myProject.addTodos(newTodos);
        storage.storeAProject( myProject);
    }

    const updateProjectName = (currentName, newName) => {
        //get Project
        const p = storage.getProjectByName(currentName);
        //remove the old one
        storage.removeProject(currentName);
        //change project name
        p.name = newName;
        storage.storeAProject(p);
    }

    const updateTodos = (projectName, index, newTodos) => {
        let myProject = storage.getProjectByName(projectName);
        let myArray = myProject.todosList;
        myArray.splice(index, 1, newTodos );

        storage.storeAProject(myProject);
    }

    const deleteProject = (projectName) => {
        storage.removeProject(projectName);
    }

    const deleteTodos = (projectName, todosindex) => {
        const myProject = storage.getProjectByName(projectName);
        myProject.deleteTodos(todosindex);
        storage.storeAProject(myProject);
    }

    const toggleTodosAchievement = (projectName, index) => {
        const myProject = storage.getProjectByName(projectName);
        const todosList = myProject.todosList;
        todosList[index].toggleAchievement();
        storage.storeAProject(myProject);
    }

    return {
        addNewProject,
        addNewTodos,
        updateProjectName,
        updateTodos,
        deleteProject, 
        deleteTodos,
        toggleTodosAchievement
    }
})();

export { mainHandler };