import { mainHandler } from "./mainHandler.js";
import closeIcon from "./assets/close.svg";
import { format } from "date-fns";


const dialogBuilder = (function() {
 
    const createHead = (titleContent) => {
        const myDiv = document.createElement('div');
        myDiv.classList.add('head');
            const myTitle = document.createElement('p');
            myTitle.classList.add('title');
            myTitle.textContent = titleContent;

            const closeBtn = document.createElement('a');
                const img = document.createElement('img');
                img.src = closeIcon;
                img.alt = "icon";
            closeBtn.appendChild(img);


        myDiv.appendChild(myTitle);
        myDiv.appendChild(closeBtn);

        closeBtn.addEventListener('click', () => {
            const dialog = document.querySelector('dialog[open]');
            dialog.close();
        })
        return myDiv;
    }

    const createTitleInput = (title = '') => {
        const inputContainer = document.createElement('p');
            const label = document.createElement('label');
            label.setAttribute('for', 'title');
            label.textContent = 'Title';

            const input = document.createElement('input');
            input.value = title;
            input.setAttribute('type', 'text');
            input.setAttribute('id', 'title');
            input.setAttribute('name', 'todos_title');
            input.setAttribute('placeholder', 'Title');
            input.setAttribute('required', 'true');


        inputContainer.appendChild(label);    
        inputContainer.appendChild(input);    

        return inputContainer;
    }

    const createDescInput = (desc = '') => {
        const inputContainer = document.createElement('p');
            const label = document.createElement('label');
            label.setAttribute('for', 'desc');
            label.textContent = 'Description';

            const input = document.createElement('textarea');
            input.value = desc;
            input.setAttribute('id', 'desc');
            input.setAttribute('name', 'todos_desc');
            input.setAttribute('placeholder', 'Description');
            input.setAttribute('required', 'true');


        inputContainer.appendChild(label);    
        inputContainer.appendChild(input);    

        return inputContainer;        
    }
 
    const createDueDateInput = (date = '') => {
        const inputContainer = document.createElement('p');
            const label = document.createElement('label');
            label.setAttribute('for', 'dueDate');
            label.textContent = 'Due Date';

            const input = document.createElement('input');
            input.value = date; 
            input.setAttribute('type', 'date');
            input.setAttribute('id', 'dueDate');
            input.setAttribute('name', 'todos_dueDate');
            input.setAttribute('required', 'true');


        inputContainer.appendChild(label);    
        inputContainer.appendChild(input);    

        return inputContainer;
    }

    const createOption = (value, txt) => {
        const opt = document.createElement('option');
            opt.setAttribute('value', value);
            opt.textContent = txt;
        return opt;
    }

    const createPriorityInput = (selectedValue = '') => {
        const inputContainer = document.createElement('p');
            const label = document.createElement('label');
            label.setAttribute('for', 'priority');
            label.textContent = 'Priority';

            const select = document.createElement('select');
            select.setAttribute('id', 'priority');
            select.setAttribute('name', 'todos_priority');

            const firstOpt = document.createElement('option');
            firstOpt.textContent = 'How much important to you?';
            firstOpt.setAttribute('disabled', 'true');
            firstOpt.setAttribute('value', '');
            select.appendChild(firstOpt);
            const options = [   
                            createOption('notImportant', 'Not Important'),
                            createOption('aBitImportant', 'A bit Important'),
                            createOption('veryImportant', 'Very Important')
                        ];

            options.forEach((opt) => select.appendChild(opt));
            if(!selectedValue) {
                firstOpt.setAttribute('selected', 'true');
            } else {
                const optSelected = options.find((opt) => opt.value == selectedValue);
                optSelected.setAttribute('selected', 'true');
            }            




        inputContainer.appendChild(label);    
        inputContainer.appendChild(select);    

        return inputContainer;
    }

    const createAddBtn = (txt = 'Add') => {
        const btn = document.createElement('button');
            btn.setAttribute('id', 'dialog-add-btn');
            btn.textContent = txt ;
        return btn;
    }

    const createCancelBtn = () => {
        const btn = document.createElement('button');
            btn.setAttribute('type', 'button');
            btn.textContent = 'Cancel';
        return btn;
    }

    const getProjectInputs = () => {
        const title = document.querySelector('dialog[open] input[name="todos_title"]').value;
        return title;
    }

    const getTodosInputs = () => {
        const title = document.querySelector('dialog[open] input[name="todos_title"]').value;
        const description = document.querySelector('dialog[open] textarea').value;
        const dateValue = document.querySelector(' input[name="todos_dueDate"]').value;
        const dueDate = format(new Date(dateValue), "yyyy-MM-dd");
        
        const selected = document.querySelector('dialog[open] select').value;

            
        
        return {
            title, 
            description, 
            dueDate, 
            priority: selected,
        }  
    }

    const checkInputs = () => {
        const title = document.querySelector('input[name="todos_title"]').value;
        const desc = document.querySelector('dialog[open] textarea').value;
        const dueDate = document.querySelector('input[name="todos_dueDate"]').value;
        const selected = document.querySelector('dialog[open] select').value;

        return (!!title && !!desc && !!dueDate && !!selected);
    }

    // functions that appears the dialogs
    const addNewTodosDialog = () => {
        const dialog = document.createElement('dialog');
        const form = document.createElement('form');
        form.setAttribute('method', 'dialog');

            //create the div of inputs
            const inputsDiv = document.createElement('div');
            inputsDiv.classList.add('inputs-div');
                inputsDiv.appendChild(createTitleInput())
                inputsDiv.appendChild(createDescInput());
                inputsDiv.appendChild(createDueDateInput());
                inputsDiv.appendChild(createPriorityInput());
            //create div of btns    
            const btnsDiv = document.createElement('div');
            btnsDiv.classList.add('btns-div');
            const cancelBtn = createCancelBtn();
            const addBtn = createAddBtn();
            btnsDiv.appendChild(cancelBtn);
            btnsDiv.appendChild(addBtn);

        form.appendChild(inputsDiv);                        
        form.appendChild(btnsDiv);                        


        //insert head div
        dialog.appendChild(createHead('Add Task'));
        dialog.appendChild(form);

        document.body.appendChild(dialog);
        dialog.showModal();

        //add click event to close dialog
        cancelBtn.addEventListener('click', () => dialog.close());
        addBtn.addEventListener('click', (event) => {
            event.preventDefault();
            if(checkInputs()) {
                const obj = getTodosInputs();
                const projectName = document.querySelector('.project-name').textContent;
                mainHandler.addNewTodos(projectName, obj);
                dialog.close();
            }  
        })

    }

    const addNewProjectDialog = () => {
        const dialog = document.createElement('dialog');
        const form = document.createElement('form');
        form.setAttribute('method', 'dialog');

            //create the div of inputs
            const inputsDiv = document.createElement('div');
            inputsDiv.classList.add('inputs-div');
                inputsDiv.appendChild(createTitleInput())

            //create div of btns    
            const btnsDiv = document.createElement('div');
            btnsDiv.classList.add('btns-div');
            const cancelBtn = createCancelBtn();
            const addBtn = createAddBtn();
            btnsDiv.appendChild(cancelBtn);
            btnsDiv.appendChild(addBtn);

        form.appendChild(inputsDiv);                        
        form.appendChild(btnsDiv);                        


        //insert head div
        dialog.appendChild(createHead('Add Project'));
        dialog.appendChild(form);

        document.body.appendChild(dialog);
        dialog.showModal();   

        //add click event to buttons
        cancelBtn.addEventListener('click', () => dialog.close());
        addBtn.addEventListener('click', () => mainHandler.addNewProject());
    }

    const updateProjectDialog = (projectName) => {
        const dialog = document.createElement('dialog');
        const form = document.createElement('form');
        form.setAttribute('method', 'dialog');

            // create the div of inputs
            const inputsDiv = document.createElement('div');
            inputsDiv.classList.add('inputs-div');
                inputsDiv.appendChild(createTitleInput(projectName))

            // create div of btns    
            const btnsDiv = document.createElement('div');
            btnsDiv.classList.add('btns-div');
            const cancelBtn = createCancelBtn();
            const updateBtn = createAddBtn('Update');
            btnsDiv.appendChild(cancelBtn);
            btnsDiv.appendChild(updateBtn);

        form.appendChild(inputsDiv);                        
        form.appendChild(btnsDiv);                        


        // insert head div
        dialog.appendChild(createHead('Update Project'));
        dialog.appendChild(form);

        document.body.appendChild(dialog);
        dialog.showModal();   

        // add click event to buttons
        cancelBtn.addEventListener('click', () => dialog.close());
        updateBtn.addEventListener('click', () => mainHandler.updateProjectName(projectName, getProjectInputs()));
    }

    const deleteProjectDialog = (projectName) => {
        const dialog = document.createElement('dialog');
        const form = document.createElement('form');

            //create the div of inputs
            const inputsDiv = document.createElement('div');
            inputsDiv.classList.add('inputs-div');
            
                const repos = document.createTextNode(`Delete the project : `);
                const strong = document.createElement('strong');
                strong.textContent = projectName;
                inputsDiv.appendChild(repos);
                inputsDiv.appendChild(strong);

            //create div of btns    
            const btnsDiv = document.createElement('div');
            btnsDiv.classList.add('btns-div');
            const cancelBtn = createCancelBtn();
            const deleteBtn = createAddBtn('Delete');
            btnsDiv.appendChild(cancelBtn);
            btnsDiv.appendChild(deleteBtn);

        form.appendChild(inputsDiv);                        
        form.appendChild(btnsDiv);                        


        //insert head div
        const myHead = createHead('Delete Project');
        myHead.classList.add('delete');
        dialog.appendChild(myHead);
        dialog.appendChild(form);

        document.body.appendChild(dialog);
        dialog.showModal();   

        //add click event to buttons
        cancelBtn.addEventListener('click', () => dialog.close());
        deleteBtn.addEventListener('click', (event) => {
            event.preventDefault();
            mainHandler.deleteProject(projectName);
            dialog.close();
        });
    }

    const updateTodosDialog = (todosObj, index) => {
        const dialog = document.createElement('dialog');
        const form = document.createElement('form');
        form.setAttribute('method', 'dialog');

            //create the div of inputs
            const inputsDiv = document.createElement('div');
            inputsDiv.classList.add('inputs-div');
                inputsDiv.appendChild(createTitleInput(todosObj.title))
                inputsDiv.appendChild(createDescInput(todosObj.description));
                inputsDiv.appendChild(createDueDateInput(todosObj.dueDate));
                inputsDiv.appendChild(createPriorityInput(todosObj.priority));
            //create div of btns    
            const btnsDiv = document.createElement('div');
            btnsDiv.classList.add('btns-div');
            const cancelBtn = createCancelBtn();
            const updateBtn = createAddBtn('Update');
            btnsDiv.appendChild(cancelBtn);
            btnsDiv.appendChild(updateBtn);

        form.appendChild(inputsDiv);                        
        form.appendChild(btnsDiv);                        


        //insert head div
        dialog.appendChild(createHead('Add Task'));
        dialog.appendChild(form);

        document.body.appendChild(dialog);
        dialog.showModal();

        //add click event to close dialog
        cancelBtn.addEventListener('click', () => dialog.close());
        updateBtn.addEventListener('click', (event) => {
            event.preventDefault();
            if(checkInputs()) {
                const obj = getTodosInputs();
                const projectName = document.querySelector('.project-name').textContent;
                mainHandler.updateTodos(projectName, index, obj);
                dialog.close();
            }  
        })

    }

    const deleteTodosDialog = (todosTitle, projectName, index) => {
        const dialog = document.createElement('dialog');
        const form = document.createElement('form');

            //create the div of inputs
            const inputsDiv = document.createElement('div');
            inputsDiv.classList.add('inputs-div');
            
                const repos = document.createTextNode(`Delete the Task : `);
                const strong = document.createElement('strong');
                strong.textContent = todosTitle ;
                inputsDiv.appendChild(repos);
                inputsDiv.appendChild(strong);

            //create div of btns    
            const btnsDiv = document.createElement('div');
            btnsDiv.classList.add('btns-div');
            const cancelBtn = createCancelBtn();
            const deleteBtn = createAddBtn('Delete');
            btnsDiv.appendChild(cancelBtn);
            btnsDiv.appendChild(deleteBtn);

        form.appendChild(inputsDiv);                        
        form.appendChild(btnsDiv);                        


        //insert head div
        const myHead = createHead('Delete Task');
        myHead.classList.add('delete');
        dialog.appendChild(myHead);
        dialog.appendChild(form);

        document.body.appendChild(dialog);
        dialog.showModal();   

        //add click event to buttons
        cancelBtn.addEventListener('click', () => dialog.close());
        deleteBtn.addEventListener('click', (event) => {
            event.preventDefault();
            mainHandler.deleteTodos(projectName, index);
            dialog.close();
        });
    }

    const todosInfoDialog = (todosObj) => {
        const dialog = document.createElement('dialog');
        const form = document.createElement('form');

            //create the div of inputs
            const inputsDiv = document.createElement('div');
            inputsDiv.classList.add('inputs-div');
                inputsDiv.appendChild(createTitleInput(todosObj.title))
                inputsDiv.appendChild(createDescInput(todosObj.description));
                inputsDiv.appendChild(createDueDateInput(todosObj.dueDate));
                inputsDiv.appendChild(createPriorityInput(todosObj.priority));
            //create div of btns    
            const btnsDiv = document.createElement('div');
            btnsDiv.classList.add('btns-div');
            const cancelBtn = createCancelBtn();
            btnsDiv.appendChild(cancelBtn);

        form.appendChild(inputsDiv);                        
        form.appendChild(btnsDiv);                        


        //insert head div
        dialog.appendChild(createHead('Task Information'));
        dialog.appendChild(form);

        document.body.appendChild(dialog);
        dialog.showModal();

        //add click event to close dialog
        cancelBtn.addEventListener('click', () => dialog.close());
    }




    return {
        addNewProjectDialog,
        addNewTodosDialog,
        updateProjectDialog,
        updateTodosDialog,
        todosInfoDialog,
        deleteProjectDialog,
        deleteTodosDialog
    }

})(); 

export default dialogBuilder ;