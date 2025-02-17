import { renderAllTodoLists } from "./render";
import { TodoList } from "./todoList";

const bindEvents = () => {
    document.querySelector(".new-todo-list").addEventListener("click", showNewTodoListModal);
    document.querySelector(".cancel-todo-list").addEventListener("click", closeNewTodoListModal);
    document.querySelector(".create-todo-list").addEventListener("click", createNewTodoList);
    document.querySelector("#todo-list-name").addEventListener("keypress", clearNameError);
}

const showNewTodoListModal = () => {
    document.querySelector(".new-todo-list-modal").showModal();
}

const closeNewTodoListModal = (e) => {
    e.preventDefault();
    document.querySelector(".new-todo-list-modal").close();
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

const clearNameError = () => {
    document.querySelector(".name-error").textContent = "";
}

export default bindEvents;