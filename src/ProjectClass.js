
class ProjectClass {
    constructor ( name ) {
        this.name = name;
        this.todosList = [];
    }
}

ProjectClass.prototype.addTodos =  function (todos){
    this.todosList.push(todos);
}  




const createProject = ( name ) => {
    return new ProjectClass(name);
}
 
export { createProject }