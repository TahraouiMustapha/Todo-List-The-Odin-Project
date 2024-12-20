import { createProject } from "./ProjectClass.js";
import { createTodos } from "./Todos.js";


const storage = ( function() {
    const storeAProject = (project) => {
        localStorage.setItem(project.name, JSON.stringify(project));
    }

    const getProjectByName = (name) => {
        let plainObjOfProject;
        if(name) {
            plainObjOfProject = JSON.parse(localStorage.getItem(name)) ;
        } else {
            const firstKey = localStorage.key(0);
            plainObjOfProject = JSON.parse(localStorage.getItem(firstKey)) ;
        }
        if(plainObjOfProject) {
            //when i retieve data Project from localStorage 
            // i convert them to instance of ProjectClass
            // convert each todos to instance of todosClass
            const myProject = Object.assign(createProject(), plainObjOfProject);
            for (let index in myProject.todosList) {
                myProject.todosList[index] = Object.assign(
                    createTodos(), myProject.todosList[index]
                ) 
            }
            
            return myProject;
        }

    }

    const getProjects= () => {
        let projects = [];
        if(!!localStorage.length) {
            for (let key in localStorage) {
                if(localStorage.hasOwnProperty(key)) {
                    const project = JSON.parse(localStorage.getItem(key));
                    projects.push(project);
                }
            }
        }

        return projects;
    }

    const getTodosList = (projectName) => {
        let myProject;
        if(!!projectName) {
            myProject = localStorage.getItem(projectName);
        } else {
            const firstKey = localStorage.key(0);
            myProject = localStorage.getItem(firstKey);
        }

        if(!!myProject) {
            return JSON.parse(myProject).todosList ;
        }
        return null;
    }

    const removeProject = (projectName) => {
        localStorage.removeItem(projectName);
    }


    return {
        storeAProject,
        getProjectByName,
        getProjects,
        getTodosList,
        removeProject
    }

})();

export { storage };