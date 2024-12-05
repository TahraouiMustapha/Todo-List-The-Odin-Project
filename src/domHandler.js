import { storage } from "./storageHandler.js";
import { mainHandler } from "./mainHandler.js";
import updateIcon from "./assets/update.svg";
import deleteIcon from "./assets/delete.svg";
import doneIcon from "./assets/check.svg";
import infoIcon from "./assets/information.svg";

const domHandler = (function () {

    const showProjects = () => {
        const projectsListContainer = document.querySelector('.projects-list');
        projectsListContainer.innerHTML = ''; 
        const projects = storage.getProjects();
        projects.forEach((project) => {
            projectsListContainer.appendChild(
                domBuilder.createProjectDiv(project.name)
            )
        })
    }

    const showProjectName = ( projectName ) => {
        const projectNameDiv = document.querySelector('.project-name');
        projectNameDiv.textContent = projectName;
    }

    const showTodosList = ( projectName ) => {
        const todosList = storage.getTodosList(projectName);
        const todosListContainer = document.querySelector('.todos-list');
        todosListContainer.innerHTML = '';
            if(!!todosList){
                todosList.forEach( (todos) => {
                    todosListContainer.appendChild(
                        domBuilder.createTodosDiv(todos)
                    )
            });
        } 
    }


    return {
        showProjects,
        showProjectName,
        showTodosList,
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
            const updateBtn = createIconDiv(updateIcon);
            const deleteBtn = createIconDiv(deleteIcon);
            iconsContainer.appendChild( updateBtn );
            iconsContainer.appendChild( deleteBtn );



        myDiv.appendChild(p);
        myDiv.appendChild(iconsContainer);

        //add event click to delete ,update btns
        deleteBtn.addEventListener('click', () => {
            mainHandler.deleteProject(projectName);
        })
        
        myDiv.addEventListener('click', () => {
            domHandler.showProjectName(projectName);
            domHandler.showTodosList(projectName);
        })
        return myDiv;
    }

    const createTodosDiv = (todosObj) => {
        const myDiv = document.createElement('div');
        myDiv.classList.add('todos');
            const leftDiv = document.createElement('div');
                const completedDiv = createIconDiv(doneIcon);
                completedDiv.classList.add('completed');

                const title = document.createElement('p');
                title.classList.add('title');
                title.textContent = todosObj.title;

            leftDiv.appendChild(completedDiv);
            leftDiv.appendChild(title);

            const rightDiv = document.createElement('div');
                const date = document.createElement('div');
                date.classList.add('date');
                date.textContent = todosObj.dueDate;

            rightDiv.appendChild(date);   
            rightDiv.appendChild( createIconDiv(updateIcon) );     
            rightDiv.appendChild( createIconDiv(deleteIcon) );     
            rightDiv.appendChild( createIconDiv(infoIcon)   );     


        myDiv.appendChild(leftDiv);    
        myDiv.appendChild(rightDiv);    
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
        createTodosDiv
    }
})();

export { domHandler };