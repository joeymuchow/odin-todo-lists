import { Dashboard, Project, TodoList } from "./classes";
import { renderAllTodoLists } from "./render";

const cacheDom = {};

const cacheDomElements = () => {
    cacheDom.newProject = document.querySelector(".new-project");
    cacheDom.cancelProject = document.querySelector(".cancel-project");
    cacheDom.newTodoList = document.querySelector(".new-todo-list");
    cacheDom.cancelTodoList = document.querySelector(".cancel-todo-list");

    cacheDom.createProject = document.querySelector(".create-project");
    cacheDom.createTodoList = document.querySelector(".create-todo-list");

    cacheDom.projectName = document.querySelector("#project-name");
    cacheDom.projectDueDate = document.querySelector("#project-due-date");
    cacheDom.todoListName = document.querySelector("#todo-list-name");

    cacheDom.newProjectModal = document.querySelector(".new-project-modal");
    cacheDom.newTodoListModal = document.querySelector(".new-todo-list-modal");

    cacheDom.projectNameError = document.querySelector(".project-name-error");
    cacheDom.projectDateError = document.querySelector(".project-date-error");
    cacheDom.todoListNameError = document.querySelector(".todo-list-name-error");
}

const bindEvents = () => {
    cacheDomElements();

    cacheDom.newProject.addEventListener("click", showNewProjectModal);
    cacheDom.cancelProject.addEventListener("click", closeNewProjectModal);
    cacheDom.newTodoList.addEventListener("click", showNewTodoListModal);
    cacheDom.cancelTodoList.addEventListener("click", closeNewTodoListModal);

    cacheDom.createProject.addEventListener("click", createNewProject);
    cacheDom.createTodoList.addEventListener("click", createNewTodoList);

    cacheDom.projectName.addEventListener("keypress", clearProjectNameError);
    cacheDom.projectName.addEventListener("change", clearProjectNameError);
    cacheDom.projectDueDate.addEventListener("keypress", clearProjectDateError);
    cacheDom.projectDueDate.addEventListener("change", clearProjectDateError);
    cacheDom.todoListName.addEventListener("keypress", clearTodoListNameError);
    cacheDom.todoListName.addEventListener("change", clearTodoListNameError);
}

const showNewProjectModal = () => {
    cacheDom.newProjectModal.showModal();
}

const closeNewProjectModal = (e) => {
    e.preventDefault();
    clearProjectNameError();
    clearProjectDateError();
    cacheDom.projectName.value = "";
    cacheDom.projectDueDate.value = "";
    cacheDom.newProjectModal.close();
}

const showNewTodoListModal = () => {
    cacheDom.newTodoListModal.showModal();
}

const closeNewTodoListModal = (e) => {
    e.preventDefault();
    clearTodoListNameError();
    cacheDom.todoListName.value = "";
    cacheDom.newTodoListModal.close();
}

const createNewProject = (e) => {
    e.preventDefault();
    const nameIsValid = cacheDom.projectName.checkValidity();
    const dateIsValid = cacheDom.projectDueDate.checkValidity();
    if (nameIsValid && dateIsValid) {
        const form = e.target.form;
        const project = new Project(form[0].value, form[1].value);

        Dashboard.addProject(project);

        // render new project in sidebar
    } else {
        cacheDom.projectNameError.textContent = nameIsValid ? "" : "This field is required";
        cacheDom.projectDateError.textContent = dateIsValid ? "" : "This field is required";
    }
}

const createNewTodoList = (e) => {
    e.preventDefault();
    const nameIsValid = document.querySelector("#todo-list-name").checkValidity();
    if (nameIsValid) {
        const form = e.target.form;
        const todoList = new TodoList(form[0].value);
        // should the form have a select element with all the projects
        // then the chosen project gets the todoList added to it

        // create function that gets a project by its name, inside the dashboard class?

        // call a render all projects function?
        renderAllTodoLists();
    } else {
        cacheDom.todoListNameError.textContent = "This field is required"
    }
}

const clearProjectNameError = () => {
    cacheDom.projectNameError.textContent = "";
}

const clearProjectDateError = () => {
    cacheDom.projectDateError.textContent = "";
}

const clearTodoListNameError = () => {
    cacheDom.todoListNameError.textContent = "";
}

export default bindEvents;