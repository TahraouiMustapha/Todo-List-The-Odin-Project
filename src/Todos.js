
class Todos {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.achievement = false;
    }

    toggleAchievement() {
        this.achievement = !this.achievement;
    }
}


const createTodos = (title, description, dueDate, priority) => {
    return new Todos(title, description, dueDate, priority);
}

export { createTodos };
