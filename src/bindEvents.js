import { Dashboard, Project, TodoList } from "./classes";
import { renderAllTodoLists } from "./render";

const bindEvents = () => {
    document.querySelector(".new-project").addEventListener("click", showNewProjectModal);
    document.querySelector(".cancel-project").addEventListener("click", closeNewProjectModal);
    document.querySelector(".new-todo-list").addEventListener("click", showNewTodoListModal);
    document.querySelector(".cancel-todo-list").addEventListener("click", closeNewTodoListModal);

    document.querySelector(".create-project").addEventListener("click", createNewProject);
    document.querySelector(".create-todo-list").addEventListener("click", createNewTodoList);

    document.querySelector("#project-name").addEventListener("keypress", clearProjectNameError);
    document.querySelector("#project-due-date").addEventListener("keypress", clearProjectDateError);
    document.querySelector("#todo-list-name").addEventListener("keypress", clearTodoListNameError);
}

const showNewProjectModal = () => {
    document.querySelector(".new-project-modal").showModal();
}

const closeNewProjectModal = (e) => {
    e.preventDefault();
    document.querySelector(".new-project-modal").close();
}

const showNewTodoListModal = () => {
    document.querySelector(".new-todo-list-modal").showModal();
}

const closeNewTodoListModal = (e) => {
    e.preventDefault();
    document.querySelector(".new-todo-list-modal").close();
}

const createNewProject = (e) => {
    e.preventDefault();
    const nameIsValid = document.querySelector("#project-name").checkValidity();
    const dateIsValid = document.querySelector("#due-date-name").checkValidity();
    if (!nameIsValid && !dateIsValid) {
        const form = e.target.form;
        const project = new Project(form[0].value, form[1].value);

        Dashboard.addProject(project);

        // render new project in sidebar
    }
}

const createNewTodoList = (e) => {
    e.preventDefault();
    const nameIsValid = document.querySelector("#todo-list-name").checkValidity();
    if (!nameIsValid) {
        const form = e.target.form;
        const todoList = new TodoList(form[0].value);
        // should the form have a select element with all the projects
        // then the chosen project gets the todoList added to it

        // create function that gets a project by its name, inside the dashboard class?

        // call a render all projects function?
        renderAllTodoLists();
    } else {
        document.querySelector(".name-error").textContent = "This field is required"
    }
}

const clearProjectNameError = () => {
    document.querySelector(".project-name-error").textContent = "";
}

const clearProjectDateError = () => {
    document.querySelector(".project-date-error").textContent = "";
}

const clearTodoListNameError = () => {
    document.querySelector(".todo-list-name-error").textContent = "";
}

export default bindEvents;