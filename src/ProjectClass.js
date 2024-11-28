
class ProjectClass {
    constructor ( name ) {
        this.name = name;
        this.todosList = [];
    }

    addTodos (todos) {
        this.todosList.push(todos);
    }
}

const createProject = ( name ) => {
    return new ProjectClass(name);
}
 
export { createProject }