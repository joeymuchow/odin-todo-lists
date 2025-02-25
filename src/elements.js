import { Dashboard } from "./classes";

const createNewProjectModal = () => {
    const newProjectModal = document.createElement("dialog");
    newProjectModal.classList.add("new-project-modal");

    const form = document.createElement("form");
    const title = document.createElement("h2");
    title.textContent = "New Project";

    // Project name input
    const projectNameInput = createInput("project-name", "text", "Name", "true", "project-name-error");

    // Project due date input
    const projectDueDateInput = createInput("project-due-date", "date", "Date", "true", "project-date-error");

    // Project form create and cancel buttons
    const projectButtons = createModalButtons("create-project", "cancel-project");

    form.append(title, projectNameInput, projectDueDateInput, projectButtons);
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
    const todoListNameInput = createInput("todo-list-name", "text", "Name", "true", "todo-list-name-error");
    
    // Todo list project select
    const projectSelect = createSelect("project-select", "Project", Dashboard.projects);

    // Todo list form create and cancel buttons
    const todoListButtons = createModalButtons("create-todo-list", "cancel-todo-list");

    form.append(title, todoListNameInput, projectSelect, todoListButtons);
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
    const todoItemName = createInput("todo-item-name", "text", "Name", "true", "todo-item-name-error");

    // Todo item due date input
    const todoItemDueDate = createInput("todo-item-due-date", "date", "Date", "true", "todo-item-date-error");

    // Todo item description input
    const todoItemDesc = createInput("todo-item-description", "text", "Description", "true", "todo-item-desc-error");

    // Todo item priority select
    const todoItemPriority = createSelect("priority-select", "Priority", ["Low", "Medium", "High"]);

    // Todo item buttons container
    const todoItemButtons = createModalButtons("create-todo-item", "cancel-todo-item");

    form.append(title, todoItemName, todoItemDueDate, todoItemDesc, todoItemPriority, todoItemButtons);

    newTodoItemModal.append(form);
    return newTodoItemModal;
}

const createInput = (id, type, text, required, errorClass) => {
    const inputContainer = document.createElement("div");
    inputContainer.classList.add("input-container");

    const inputLabel = document.createElement("label");
    inputLabel.setAttribute("for", id);
    inputLabel.textContent = text;

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

const createSelect = (id, label, array) => {
    const selectContainer = document.createElement("div");
    selectContainer.classList.add("input-container");
    const selectLabel = document.createElement("label");
    selectLabel.setAttribute("for", id);
    selectLabel.textContent = label;
    const projectSelect = document.createElement("select");
    projectSelect.id = id;
    for (const item of array) {
        const option = document.createElement("option");
        // if item is a string set textContent and value to it
        // otherwise item will be an object so get its name
        option.textContent = typeof item === "string" ? item : item.name;
        option.value = typeof item === "string" ? item : item.name;
        projectSelect.append(option);
    }
    selectContainer.append(selectLabel, projectSelect);
    return selectContainer;
}

const createModalButtons = (createClass, cancelClass) => {
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");
    const submitBtn = document.createElement("button");
    submitBtn.classList.add(createClass);
    submitBtn.type = "submit";
    submitBtn.textContent = "Create";
    const cancelBtn = document.createElement("button");
    cancelBtn.classList.add(cancelClass);
    cancelBtn.textContent = "Cancel";
    buttonsContainer.append(submitBtn, cancelBtn);
    return buttonsContainer;
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