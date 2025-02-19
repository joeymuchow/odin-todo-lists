import { Dashboard } from "./classes";

// TODO create functions for creating elements for viewing a specific project and its todo lists

// also I think when switching between these views we will need to call bindEvents again (or have different bind event calls for each view?)

// Maybe createDashboardElements should have a content section that is a view that changes depending on what the user wants to view

const createDashboardElements = () => {
    // create dashboard html
    const body = document.querySelector("body");

    const contentContainer = document.createElement("div");
    contentContainer.classList.add("content");

    const sidebar = document.createElement("div");
    sidebar.classList.add("sidebar");

    const viewAllTodos = document.createElement("a");
    viewAllTodos.classList.add("view-all-todos");
    viewAllTodos.textContent = "View all todo lists";

    const projectsLabel = document.createElement("h3");
    projectsLabel.textContent = "Projects";
    const projectsContainer = document.createElement("div");
    projectsContainer.classList.add(("projects-container"));

    sidebar.append(viewAllTodos, projectsLabel, projectsContainer);

    const titleContainer = document.createElement("div");
    const title = document.createElement("h1");
    title.textContent = "Todo Projects";
    titleContainer.append(title);

    // create sidebar nav that will show projects and view all todos

    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");
    const newProjectBtn = document.createElement("button");
    newProjectBtn.classList.add("new-project");
    newProjectBtn.textContent = "New project";
    const newProjectModal = createNewProjectModal();
    const newTodoListBtn = document.createElement("button");
    newTodoListBtn.classList.add("new-todo-list");
    newTodoListBtn.textContent = "New todo list";
    const newTodoListModal = createNewTodoListModal();
    buttonsContainer.append(newProjectBtn, newProjectModal, newTodoListBtn, newTodoListModal);

    const todoListsContainer = document.createElement("div");
    todoListsContainer.classList.add("todo-lists-container");

    contentContainer.append(titleContainer, buttonsContainer, todoListsContainer);

    body.append(sidebar, contentContainer);
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
    const todoListNameError = document.createElement("p");
    todoListNameError.classList.add("error", "todo-list-name-error");
    const spacer = document.createElement("span");
    todoListName.append(todoListNameLabel, todoListNameInput, spacer, todoListNameError);
    
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

    form.append(title, todoListName, projectSelectContainer, buttonsContainer);
    newTodoListModal.append(form);
    return newTodoListModal;
}

const createNewProjectModal = () => {
    const newProjectModal = document.createElement("dialog");
    newProjectModal.classList.add("new-project-modal");

    const form = document.createElement("form");
    const title = document.createElement("h2");
    title.textContent = "New Project";

    // Project name input
    const projectName = document.createElement("div");
    projectName.classList.add("input-container");
    const projectNameLabel = document.createElement("label");
    projectNameLabel.setAttribute("for", "project-name");
    projectNameLabel.textContent = "Name";
    const projectNameInput = document.createElement("input");
    projectNameInput.id = "project-name";
    projectNameInput.required = "true";
    const projectNameError = document.createElement("p");
    projectNameError.classList.add("error", "project-name-error");
    const nameSpacer = document.createElement("span");
    projectName.append(projectNameLabel, projectNameInput, nameSpacer, projectNameError);

    // Project due date input
    const dueDate = document.createElement("div");
    dueDate.classList.add("input-container");
    const dueDateLabel = document.createElement("label");
    dueDateLabel.textContent = "Due Date";
    dueDateLabel.setAttribute("for", "project-due-date");
    const dueDateInput = document.createElement("input");
    dueDateInput.type = "date";
    dueDateInput.id = "project-due-date";
    dueDateInput.required = "true";
    const dueDateError = document.createElement("p");
    dueDateError.classList.add("error", "project-date-error");
    const dateSpacer = document.createElement("span");
    dueDate.append(dueDateLabel, dueDateInput, dateSpacer, dueDateError);

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

    form.append(title, projectName, dueDate, buttonsContainer);
    newProjectModal.append(form);
    return newProjectModal;
}

// TODO create function to render projects in the sidebar

const createTodoListElement = (todoList) => {
    // create a todo list
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

const renderAllTodoLists = () => {
    const todoListsContainer = document.querySelector(".todo-lists-container");
    todoListsContainer.replaceChildren();
    for (const project of Dashboard.projects) {
        for (const todoList of project.todoLists) {
            const element = createTodoListElement(todoList);
            todoListsContainer.append(element);
        }
    }
}

const renderAllProjects = () => {
    const projectsContainer = document.querySelector(".projects-container");
    projectsContainer.replaceChildren();
    for (const project of Dashboard.projects) {
        const projectElement = document.createElement("a");
        projectElement.classList.add("project");
        projectElement.textContent = project.name;
        projectsContainer.append(projectElement);
    }
}

export { createDashboardElements, renderAllTodoLists, renderAllProjects }