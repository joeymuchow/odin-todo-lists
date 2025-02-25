import { Dashboard } from "./classes";

const createNewProjectModal = () => {
    const newProjectModal = document.createElement("dialog");
    newProjectModal.classList.add("new-project-modal");

    const form = document.createElement("form");
    const title = document.createElement("h2");
    title.textContent = "New Project";

    // Project name input
    const projectNameInput = createInput("project-name", "text", "true", "project-name-error");

    // Project due date input
    const projectDueDateInput = createInput("project-due-date", "date", "true", "project-date-error");

    // Project form create and cancel buttons
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");
    const submitBtn = document.createElement("button");
    submitBtn.classList.add("create-project");
    submitBtn.type = "submit";
    submitBtn.textContent = "Create";
    const cancelBtn = document.createElement("button");
    cancelBtn.classList.add("cancel-project");
    cancelBtn.textContent = "Cancel";
    buttonsContainer.append(submitBtn, cancelBtn);

    form.append(title, projectNameInput, projectDueDateInput, buttonsContainer);
    newProjectModal.append(form);
    return newProjectModal;
}

const createNewTodoListModal = () => {
    const newTodoListModal = document.createElement("dialog");
    newTodoListModal.classList.add("new-todo-list-modal");

    const form = document.createElement("form");
    const title = document.createElement("h2");
    title.textContent = "New Todo List";

    // Todo list name input
    const todoListNameInput = createInput("todo-list-name", "text", "true", "todo-list-name-error");
    
    // Todo list project select
    const projectSelectContainer = document.createElement("div");
    projectSelectContainer.classList.add("input-container");
    const projectSelectLabel = document.createElement("label");
    projectSelectLabel.setAttribute("for", "project-select");
    projectSelectLabel.textContent = "Project";
    const projectSelect = document.createElement("select");
    projectSelect.id = "project-select";
    for (const project of Dashboard.projects) {
        const option = document.createElement("option");
        option.textContent = project.name;
        option.value = project.name;
        projectSelect.append(option);
    }
    projectSelectContainer.append(projectSelectLabel, projectSelect);

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

    form.append(title, todoListNameInput, projectSelectContainer, buttonsContainer);
    newTodoListModal.append(form);
    return newTodoListModal;
}

const createTodoItemModal = () => {
    const newTodoItemModal = document.createElement("dialog");
    newTodoItemModal.classList.add("new-todo-item-modal");

    const form = document.createElement("form");
    const title = document.createElement("h2");
    title.textContent = "New Todo";

    // Todo item name input
    const todoItemName = createInput("todo-item-name", "text", "true", "todo-item-name-error");

    // Todo item due date input
    const todoItemDueDate = createInput("todo-item-due-date", "date", "true", "todo-item-date-error");

    // Todo item description input
    const todoItemDesc = createInput("todo-item-description", "text", "true", "todo-item-desc-error");

    // Todo item priority select
    // probably use something else to make the select for priority

    form.append(title, todoItemName, todoItemDueDate, todoItemDesc);

    newTodoItemModal.append(form);
    return newTodoItemModal;
}

const createInput = (id, type, required, errorClass) => {
    const inputContainer = document.createElement("div");
    inputContainer.classList.add("input-container");

    const inputLabel = document.createElement("label");
    inputLabel.setAttribute("for", id);
    inputLabel.textContent = "Name";

    const input = document.createElement("input");
    input.id = id;
    input.type = type;
    input.required = required;

    const inputError = document.createElement("p");
    inputError.classList.add("error", errorClass);

    const spacer = document.createElement("span");
    inputContainer.append(inputLabel, input, spacer, inputError);

    return inputContainer;
}

const createTodoListSummaryElement = (todoList) => {
    const todoListContainer = document.createElement("div");
    todoListContainer.classList.add("todo-list");

    const name = document.createElement("h2");
    name.textContent = todoList.name;

    // create button for adding a todo list item
    // add event listener to handle that

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

    todoListContainer.append(name, todos);

    return todoListContainer;
}

export { createTodoListSummaryElement, createNewTodoListModal, createNewProjectModal, createTodoItemModal }