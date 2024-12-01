import { storage } from "./storageHandler.js";
import updateIcon from "./assets/update.svg";
import deleteIcon from "./assets/delete.svg";

const domHandler = (function () {

    const showProjects = () => {
        const projectsListContainer = document.querySelector('.projects-list');
        const projects = storage.getProjects();
        projects.forEach((project) => {
            projectsListContainer.appendChild(
                domBuilder.createProjectDiv(project.name)
            )
        })
    }

    const showProjectName = ( projectName ) => {

    }

    const showTodosList = ( projectName ) => {

    }

    return {
        showProjects,
        showProjectName,
        showTodosList

    }
})()

const domBuilder = (function(){
    const createProjectDiv = ( projectName ) => {
        const myDiv = document.createElement('div');
            const p = document.createElement('p');
            p.classList.add('name');
            p.textContent = projectName;

            const iconsContainer = document.createElement('div');
            iconsContainer.classList.add('icons-container');
            iconsContainer.appendChild( createIconDiv(updateIcon) );
            iconsContainer.appendChild( createIconDiv(deleteIcon) );



        myDiv.appendChild(p);
        myDiv.appendChild(iconsContainer);
        
        return myDiv;
    }

    const createIconDiv = (imgSrc) => {
        const myDiv = document.createElement('div');
        myDiv.classList.add('icon');
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = 'icon';

        myDiv.appendChild(img);
        return myDiv;
    }

    return {
        createProjectDiv,
    }
})();

export { domHandler };