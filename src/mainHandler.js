import { createTodos } from "./Todos.js";
import { createProject } from "./ProjectClass.js";
import { storage } from "./storageHandler.js";
import { format } from "date-fns";

const mainHandler = (() => {
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

    return {
        updateProjectName,
        updateTodos,
    }
})();

export { mainHandler };