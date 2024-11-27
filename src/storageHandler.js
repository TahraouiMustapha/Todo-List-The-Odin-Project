
const storage = ( function() {
    const storeAProject = (project) => {
        localStorage.setItem(project.name, JSON.stringify(project));
    }

    const getProjectByName = (name) => {
        return JSON.parse(localStorage.getItem(name)) ;
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
        const myProject = localStorage.getItem(projectName);
        if(!!myProject) {
            return JSON.parse(myProject).todosList ;
        }
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