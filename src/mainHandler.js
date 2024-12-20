import { createTodos } from "./Todos.js";
import { createProject } from "./ProjectClass.js";
import { storage } from "./storageHandler.js";
import { domHandler } from "./domHandler.js";

const mainHandler = (() => {

    const addNewProject = () => {
        const titleInput = document.querySelector('dialog[open] input[name= \'todos_title\']');
        //if  the projectName does not exist 
        if(!!titleInput &&!storage.getProjectByName(titleInput.value)) {
            const newProject = createProject(titleInput.value);
            storage.storeAProject(newProject);
            domHandler.showProjects();
        }
    }

    const addNewTodos = (projectName, obj) => {
        const myProject = storage.getProjectByName(projectName);
        const newTodos = createTodos(obj.title, obj.description, obj.dueDate, obj.priority);
        myProject.addTodos(newTodos);
        storage.storeAProject( myProject);
        domHandler.showTodosList(projectName);
    }

    const updateProjectName = (currentName, newName) => {
        console.log(currentName, newName);
        // get Project
        const p = storage.getProjectByName(currentName);
        // remove the old one
        storage.removeProject(currentName);
        // change project name
        p.name = newName;
        storage.storeAProject(p);
        domHandler.showProjects();
        domHandler.showTodosList(newName);
    }

    const updateTodos = (projectName, index, newTodosObj) => {
        let newTodos = createTodos();
        Object.assign(newTodos, newTodosObj);
        const myProject = storage.getProjectByName(projectName);
        const myArray = myProject.todosList;
        myArray.splice(index, 1, newTodos );

        storage.storeAProject(myProject);
        domHandler.showTodosList(projectName);
    }

    const deleteProject = (projectName) => {
        storage.removeProject(projectName);
        domHandler.showProjects();
    }

    const deleteTodos = (projectName, todosindex) => {
        const myProject = storage.getProjectByName(projectName);
        myProject.deleteTodos(todosindex);
        storage.storeAProject(myProject);
        domHandler.showTodosList(projectName);
    }

    const toggleTodosAchievement = (projectObj, index) => {
        const todosList = projectObj.todosList;
        todosList[index].toggleAchievement();
        storage.storeAProject(projectObj);
        domHandler.showTodosList(projectObj.name);
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