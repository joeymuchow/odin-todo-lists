class Dashboard {
    static projects = [];

    static addProject(project) {
        this.projects.push(project);
    }

    static deleteProject(index) {
        this.projects.splice(index, 1);
    }

    static getProject(name) {
        let result;
        for (const project of this.projects) {
            if (project.name === name) {
                result = project;
            }
        }
        return result;
    }
}

class Project {
    constructor(name, dueDate) {
        this._name = name;
        this._dueDate = dueDate;
        this.todoLists = [];
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get dueDate() {
        return this._dueDate;
    }

    set dueDate(date) {
        this._dueDate = date;
    }

    addTodoList(todoList) {
        this.todoLists.push(todoList);
    }

    deleteTodoList(index) {
        this.todoLists.splice(index, 1);
    }
}

class TodoList {
    constructor(name) {
        this._name = name;
        this.todoList = [];
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    addTodo(todoItem) {
        this.todoList.push(todoItem);
    }

    deleteToDo(index) {
        this.todoList.splice(index, 1);
    }
}

class TodoItem {
    constructor(name, dueDate, description, priority, complete) {
        this._name = name;
        this._dueDate = dueDate;
        this._description = description;
        this._priority = priority;
        this._complete = complete;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get dueDate() {
        return this._dueDate;
    }

    set dueDate(date) {
        this._dueDate = date;
    }

    get description() {
        return this._description;
    }

    set description(desc) {
        this._description = desc;
    }

    get priority() {
        return this._priority;
    }

    set priority(value) {
        this._priority = value;
    }

    get complete() {
        return this._complete;
    }

    updateCompleteStatus() {
        this._complete = !this._complete;
    }
}

export { Dashboard, Project, TodoList, TodoItem }