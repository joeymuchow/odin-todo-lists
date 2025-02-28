import { bindEvents, showAllTodos, showSingleProject, showSingleTodoList, showNewTodoItemModal, showNewTodoListModal } from "./bindEvents";
import { Dashboard } from "./classes";
import { createTodoListSummaryElement, createNewProjectModal, createNewTodoListModal, createTodoItemModal } from "./elements";
import xmarkCircle from "../icons/xmark-circle.svg";
import navArrowUp from "../icons/nav-arrow-up.svg";
import navArrowDown from "../icons/nav-arrow-down.svg";

const renderBody = () => {
    const body = document.querySelector("body");

    const content = document.createElement("div");
    content.classList.add("content");

    const titleContainer = document.createElement("div");
    const title = document.createElement("h1");
    title.textContent = "Todo Projects";
    titleContainer.append(title);

    // Create buttons for new projects and todo lists
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");
    const newProjectBtn = document.createElement("button");
    newProjectBtn.classList.add("new-project");
    newProjectBtn.textContent = "New project";
    const newTodoListBtn = document.createElement("button");
    newTodoListBtn.classList.add("new-todo-list");
    newTodoListBtn.textContent = "New todo list";
    buttonsContainer.append(newProjectBtn, newTodoListBtn);

    // Create modals
    const modalContainer = document.createElement("div");
    const newProjectModal = createNewProjectModal();
    const newTodoListModal = createNewTodoListModal();
    const newTodoItemModal = createTodoItemModal();
    modalContainer.append(newProjectModal, newTodoListModal, newTodoItemModal);

    const todoListsContainer = document.createElement("div");
    todoListsContainer.classList.add("todo-lists-container");

    // all todo lists view is the default view so hide other two
    const singleProjectContainer = document.createElement("div");
    singleProjectContainer.classList.add("single-project-container", "hide");

    const singleTodoListContainer = document.createElement("div");
    singleTodoListContainer.classList.add("single-todo-list-container", "hide");

    content.append(titleContainer, buttonsContainer, todoListsContainer, singleProjectContainer, singleTodoListContainer, modalContainer);

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
    body.append(sidebar, content);

    bindEvents();

    renderAllProjectsSidebar();
    renderAllTodoLists();
}

const renderProject = (project) => {
    // render a specific project
    showSingleProject();

    const container = document.querySelector(".single-project-container");
    container.replaceChildren();
    const card = document.createElement("div");
    card.classList.add("card");
    const projectName = document.createElement("h2");
    projectName.classList.add("project-name");
    projectName.textContent = project.name;
    const projectDueDate = document.createElement("p");
    projectDueDate.textContent = "Due date: " + project.dueDate;
    const line = document.createElement("hr");
    const todoLists = document.createElement("ul");
    
    for (let i = 0; i < project.todoLists.length; i++) {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.textContent = project.todoLists[i].name;
        link.addEventListener("click", () => {
            renderTodoList(project, project.todoLists[i]);
        });
        const deleteIcon = document.createElement("img");
        deleteIcon.classList.add("todo-list-delete");
        deleteIcon.src = xmarkCircle;
        deleteIcon.addEventListener("click", () => {
            project.deleteTodoList(i);
            renderProject(project);
        });
        li.append(link, deleteIcon);
        todoLists.append(li);
    }

    const addTodoListBtn = document.createElement("button");
    addTodoListBtn.classList.add("new-todo-list");
    addTodoListBtn.addEventListener("click", showNewTodoListModal);
    addTodoListBtn.textContent = "Add todo list";

    card.append(projectName, projectDueDate, line, todoLists, addTodoListBtn);
    container.append(card);
}

const renderTodoList = (project, todoList) => {
    // render a specific todo list from a specific project
    showSingleTodoList();

    const container = document.querySelector(".single-todo-list-container");
    container.replaceChildren();
    const card = document.createElement("div");
    card.classList.add("card");
    const todoListName = document.createElement("h2");
    todoListName.classList.add("todo-list-name");
    todoListName.textContent = todoList.name;

    // list each todo item from the todo list
    const todos = document.createElement("ul");

    for (let i = 0; i < todoList.todoList.length; i++) {
        const li = document.createElement("li");
        const name = document.createElement("p");
        name.textContent = todoList.todoList[i].name;
        name.classList.add("todo-item-name");
        const dueDate = document.createElement("input");
        dueDate.type = "date";
        dueDate.value = todoList.todoList[i].dueDate;
        dueDate.classList.add("todo-item-due-date", "hide");
        dueDate.addEventListener("change", (e) => {
            todoList.todoList[i].dueDate = e.target.value || todoList.todoList[i].dueDate;
        });
        const deleteIcon = document.createElement("img");
        deleteIcon.classList.add("todo-item-delete", "hide");
        deleteIcon.src = xmarkCircle;
        deleteIcon.addEventListener("click", () => {
            todoList.deleteTodo(i);
            renderTodoList(project, todoList);
        });
        const description = document.createElement("input");
        description.type = "text";
        description.value = todoList.todoList[i].description;
        description.classList.add("todo-item-description", "hide");
        description.addEventListener("change", (e) => {
            todoList.todoList[i].description = e.target.value || todoList.todoList[i].description;
        });
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todoList.todoList[i].complete;
        checkbox.addEventListener("change", () => {
            todoList.todoList[i].updateCompleteStatus();
        });
        const expandIcon = document.createElement("img");
        expandIcon.classList.add("todo-item-expand");
        expandIcon.src = navArrowDown;
        expandIcon.addEventListener("click", () => {
            dueDate.classList.toggle("hide");
            description.classList.toggle("hide");
            deleteIcon.classList.toggle("hide");
            expandIcon.src = description.classList.contains("hide") ? navArrowDown : navArrowUp;
        });

        // TODO use date-fns for displaying the date in a different form? or for actually saving the date in the item or list?

        // TODO add something to signify priority - bg color? icons?

        li.append(checkbox, name, expandIcon, deleteIcon, dueDate, description);
        todos.append(li);
    }

    const addTodoBtn = document.createElement("button");
    addTodoBtn.classList.add("new-todo-item");
    addTodoBtn.setAttribute("data-project-name", project.name);
    addTodoBtn.setAttribute("data-todo-list-name", todoList.name);
    addTodoBtn.addEventListener("click", showNewTodoItemModal);
    addTodoBtn.textContent = "Add todo";
    todos.append(addTodoBtn);

    card.append(todoListName, todos);
    container.append(card);
}

const renderAllTodoLists = () => {
    const todoListsContainer = document.querySelector(".todo-lists-container");
    todoListsContainer.replaceChildren();
    for (const project of Dashboard.projects) {
        for (const todoList of project.todoLists) {
            const element = createTodoListSummaryElement(project, todoList);
            todoListsContainer.append(element);
        }
    }
    showAllTodos();
}

const renderAllProjectsSidebar = () => {
    const projectsContainer = document.querySelector(".projects-container");
    projectsContainer.replaceChildren();
    for (const project of Dashboard.projects) {
        const projectElement = document.createElement("a");
        projectElement.classList.add("project");
        projectElement.textContent = project.name;
        projectElement.addEventListener("click", () => {
            renderProject(project);
            // create a function that bolds the project when it is selected
            // there is a selected css class for bolding
            // need to remove the class from any projects if there is one
            // also need to remove it when teh view changes to all todos
            // maybe it should stay when you look at a todo list inside a project
        });
        projectsContainer.append(projectElement);
    }
}

const renderTodoListProjectSelect = () => {
    const select = document.querySelector("#project-select");
    select.replaceChildren();
    for (const project of Dashboard.projects) {
        const option = document.createElement("option");
        option.textContent = project.name;
        option.value = project.name;
        select.append(option);
    }
}

export { renderBody, renderAllTodoLists, renderAllProjectsSidebar, renderTodoListProjectSelect, renderTodoList }