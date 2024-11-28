
class ProjectClass {
    constructor ( name ) {
        this.name = name;
        this.todosList = [];
    }

    addTodos (todos) {
        this.todosList.push(todos);
    }
    
    deleteTodos (index) {
        this.todosList.splice(index, 1);
    }
}

const createProject = ( name ) => {
    return new ProjectClass(name);
}
 
export { createProject }