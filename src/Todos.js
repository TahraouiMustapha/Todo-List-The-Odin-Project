
class Todos {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}


const createTodos = (title, description, dueDate, priority) => {
    return new Todos(title, description, dueDate, priority);
}

export { createTodos };
