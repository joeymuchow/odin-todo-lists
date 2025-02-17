import { Dashboard } from "./classes";

const createDashboardElements = () => {
    // create dashboard html
    const body = document.querySelector("body");

    const titleContainer = document.createElement("div");
    const title = document.createElement("h1");
    title.textContent = "Todo Projects";
    titleContainer.append(title);

    // create sidebar nav that will show projects and view all todos

    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");
    // create new project button to add a project to dashboard class
    const newTodoListBtn = document.createElement("button");
    newTodoListBtn.classList.add("new-todo-list");
    newTodoListBtn.textContent = "New todo list";
    const newTodoListModal = createNewTodoListModal();
    buttonsContainer.append(newTodoListBtn, newTodoListModal);

    const todoListsContainer = document.createElement("div");
    todoListsContainer.classList.add("todo-lists-container");

    body.append(titleContainer, buttonsContainer, todoListsContainer);
}

const createNewTodoListModal = () => {
    const newTodoListModal = document.createElement("dialog");
    newTodoListModal.classList.add("new-todo-list-modal");

    const form = document.createElement("form");
    const title = document.createElement("h2");
    title.textContent = "New Todo List";

    // Todo list name input
    const todoListName = document.createElement("div");
    todoListName.classList.add("input-container");
    const todoListNameLabel = document.createElement("label");
    todoListNameLabel.setAttribute("for", "todo-list-name");
    todoListNameLabel.textContent = "Name";
    const todoListNameInput = document.createElement("input");
    todoListNameInput.id = "todo-list-name";
    todoListNameInput.required = "true";
    todoListName.append(todoListNameLabel, todoListNameInput);
    const todoListNameError = document.createElement("p");
    todoListNameError.classList.add("error", "name-error");

    // Todo list form create and cancel buttons
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");
    const submitBtn = document.createElement("button");
    submitBtn.classList.add("create-todo-list");
    submitBtn.type = "submit";
    submitBtn.textContent = "Create";
    const cancelBtn = document.createElement("button");
    cancelBtn.classList.add("cancel-todo-list");
    cancelBtn.textContent = "Cancel";
    buttonsContainer.append(submitBtn, cancelBtn);

    form.append(title, todoListName, todoListNameError, buttonsContainer);
    newTodoListModal.append(form);
    return newTodoListModal;
}

// TODO create new project modal
// use this as part of it
// Todo list due date input
// const dueDate = document.createElement("div");
// dueDate.classList.add("input-container");
// const dueDateLabel = document.createElement("label");
// dueDateLabel.textContent = "Due Date";
// dueDateLabel.setAttribute("for", "due-date");
// const dueDateInput = document.createElement("input");
// dueDateInput.type = "date";
// dueDateInput.id = "due-date";
// dueDateInput.required = "true";
// dueDate.append(dueDateLabel, dueDateInput);
// const todoListDueDateError = document.createElement("p");
// todoListDueDateError.classList.add("error", "date-error");

// TODO create function to render projects in the sidebar

const createTodoListElement = (todoList) => {
    // create a todo list
    const todoListContainer = document.createElement("div");
    todoListContainer.classList.add("todo-list");

    const name = document.createElement("h2");
    name.textContent = todoList.name;

    const todos = document.createElement("ul");
    for (const todoItem of todoList.todoList) {
        const li = document.createElement("li");

        const name = document.createElement("p");
        name.textContent = todoItem.name;

        const desc = document.createElement("p");
        desc.textContent = todoItem.description;

        li.append(name, desc);
        todos.append(li);
    }

    todoListContainer.append(name, todoList);

    return todoListContainer;
}

const renderAllTodoLists = () => {
    const listsToRender = [];
    const todoListsContainer = document.querySelector(".todo-lists-container");
    todoListsContainer.replaceChildren();
    for (const project of Dashboard.projects) {
        for (const todoList of project.todoLists) {
            const element = createTodoListElement(todoList);
            listsToRender.push(element);
        }
    }
    todoListsContainer.append(...listsToRender);
}

export { createDashboardElements, renderAllTodoLists }