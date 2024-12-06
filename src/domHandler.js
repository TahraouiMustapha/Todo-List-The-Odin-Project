import { storage } from "./storageHandler.js";
import { mainHandler } from "./mainHandler.js";
import updateIcon from "./assets/update.svg";
import deleteIcon from "./assets/delete.svg";
import doneIcon from "./assets/check.svg";
import infoIcon from "./assets/information.svg";
import dialogBuilder from "./dialogBuilder.js";

const domHandler = (function () {

    const showProjects = () => {
        const projectsListContainer = document.querySelector('.projects-list');
        projectsListContainer.innerHTML = ''; 
        const projects = storage.getProjects();
        changeProjectsNumber(projects.length);
        projects.forEach((project) => {
            projectsListContainer.appendChild(
                domBuilder.createProjectDiv(project.name)
            )
        })
    }


    const showTodosList = ( projectName, needToRemoveOldTasks = true ) => {
        const myProject = storage.getProjectByName(projectName);

        const projectNameDiv = document.querySelector('.project-name');
        if (needToRemoveOldTasks) projectNameDiv.textContent = myProject ? myProject.name : '';
        const todosList = myProject ? myProject.todosList : [];
        changeTodosNumber(todosList.length);
        const todosListContainer = document.querySelector('.todos-list');
        if (needToRemoveOldTasks) todosListContainer.innerHTML = '';
            if(!!todosList){
                todosList.forEach( (todos) => {
                    todosListContainer.appendChild(
                        domBuilder.createTodosDiv(myProject, todos)
                    )
            });
        } 
    }

// show all the todos using showTodosList func
    const showAllTodos = () => {
        const projectNameDiv = document.querySelector('.project-name');
        projectNameDiv.textContent = 'ALL';
        const projects = storage.getProjects();
        const todosListContainer = document.querySelector('.todos-list');
        todosListContainer.innerHTML = '';
        projects.forEach((project) => {
            showTodosList(project.name, false);
        })
        
    }

    const changeProjectsNumber = (length) => {
        const projectTitle = document.querySelector('.projects .head .title');
        projectTitle.innerHTML = '';
        const repos = document.createTextNode(`Projects (${length})`);
        projectTitle.appendChild(repos);
    }

    const changeTodosNumber = (length) => {
        const todosTitle = document.querySelector('.todos-container .head .title');
        todosTitle.innerHTML = '';
        const repos = document.createTextNode(`Tasks (${length})`);
        todosTitle.appendChild(repos);
    }

    return {
        showProjects,
        showTodosList,
        showAllTodos
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
        updateBtn.addEventListener('click', () => dialogBuilder.updateProjectDialog(projectName) );

        deleteBtn.addEventListener('click', () => dialogBuilder.deleteProjectDialog(projectName) )
        
        myDiv.addEventListener('click', () => {
            domHandler.showTodosList(projectName);
        })
        return myDiv;
    }

    const createTodosDiv = (projectObj, todosObj) => {
        const myDiv = document.createElement('div');
        myDiv.classList.add('todos');
        const index = projectObj.todosList.indexOf(todosObj);
            const leftDiv = document.createElement('div');
            leftDiv.dataset.index = index ;
            // to check achievement
            if(todosObj.achievement) leftDiv.classList.toggle('done');
                const completedDiv = createIconDiv(doneIcon);
                completedDiv.classList.add('achievement');
                completedDiv.classList.add(todosObj.priority);

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
            const updateBtn = createIconDiv(updateIcon);
            const deleteBtn = createIconDiv(deleteIcon);
            const infoBtn =  createIconDiv(infoIcon) ;
            rightDiv.appendChild( updateBtn );     
            rightDiv.appendChild( deleteBtn );    
            rightDiv.appendChild( infoBtn );     


        myDiv.appendChild(leftDiv);    
        myDiv.appendChild(rightDiv); 

        // add click event to update, see, delete todos
        updateBtn.addEventListener('click', () => dialogBuilder.updateTodosDialog(todosObj, index));
        deleteBtn.addEventListener('click', () =>  dialogBuilder.deleteTodosDialog(todosObj.title, projectObj.name, index));
        infoBtn.addEventListener('click', () => dialogBuilder.todosInfoDialog(todosObj));
        
        // add click event to toggle achievement of task
        leftDiv.addEventListener('click', (e) => {
            mainHandler.toggleTodosAchievement(projectObj, e.currentTarget.dataset.index) 
        }); 

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