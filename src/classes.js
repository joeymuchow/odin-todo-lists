import { storageAvailable } from "./index";

class Dashboard {
    static projects = [];

    static addProject(project) {
        this.projects.push(project);
        this.saveDashboard();
    }

    static deleteProject(index) {
        this.projects.splice(index, 1);
        this.saveDashboard();
    }

    static getProject(name) {
        let result;
        for (const project of this.projects) {
            if (project.name.toLowerCase() === name.toLowerCase()) {
                result = project;
                break;
            }
        }
        return result;
    }

    static saveDashboard() {
        if (storageAvailable("localStorage")) {
            localStorage.setItem("dashboard-projects", JSON.stringify(Dashboard.projects));
        }
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
        Dashboard.saveDashboard();
    }

    deleteTodoList(index) {
        this.todoLists.splice(index, 1);
        Dashboard.saveDashboard();
    }

    getTodoList(name) {
        let result;
        for (const todoList of this.todoLists) {
            if (todoList.name.toLowerCase() === name.toLowerCase()) {
                result = todoList;
                break;
            }
        }
        return result;
    }

    toJSON() {
        return {
            name: this.name,
            dueDate: this.dueDate,
            todoLists: this.todoLists
        }
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
        Dashboard.saveDashboard();
    }

    deleteTodo(index) {
        this.todoList.splice(index, 1);
        Dashboard.saveDashboard();
    }

    toJSON() {
        return {
            name: this.name,
            todoList: this.todoList
        }
    }
}

class TodoItem {
    constructor(name, dueDate, description, priority) {
        this._name = name;
        this._dueDate = dueDate;
        this._description = description;
        this._priority = priority;
        this._complete = false;
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
        Dashboard.saveDashboard();
    }

    toJSON() {
        return {
            name: this.name,
            dueDate: this.dueDate,
            description: this.description,
            priority: this.priority,
            complete: this.complete
        }
    }
}

export { Dashboard, Project, TodoList, TodoItem }