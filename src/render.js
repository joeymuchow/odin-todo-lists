import { Dashboard } from "./classes";
import { createTodoListElement, createNewProjectModal, createNewTodoListModal } from "./elements";

// TODO create functions for creating elements for viewing a specific project and its todo lists

// TODO make these functions
// renderBody - renders the html body with the sidebar and containers
// renderViewAllTodos - renders all the todo lists from every project
// renderProject - renders all the todo lists in a specific project
// refactor createDashboardElements so that the content part is in renderViewAllTodos and the containers part is in renderBody
// then call those in index.js

const renderBody = () => {
    const body = document.querySelector("body");

    const content = document.createElement("div");
    content.classList.add("content");

    const titleContainer = document.createElement("div");
    const title = document.createElement("h1");
    title.textContent = "Todo Projects";
    titleContainer.append(title);

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

    content.append(titleContainer, buttonsContainer);

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
    renderAllProjectsSidebar();
}

renderViewAllTodos = () => {
    const content = document.querySelector(".content");
    
    const todoListsContainer = document.createElement("div");
    todoListsContainer.classList.add("todo-lists-container");

    content.append(todoListsContainer);
    renderAllTodoLists();
}

const renderProject = (project) => {
    // render the specific project passed in

    // 
}

const showAllTodosView = () => {
    
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

const renderAllProjectsSidebar = () => {
    const projectsContainer = document.querySelector(".projects-container");
    projectsContainer.replaceChildren();
    for (const project of Dashboard.projects) {
        const projectElement = document.createElement("a");
        projectElement.classList.add("project");
        projectElement.textContent = project.name;
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

export { renderBody, renderAllTodoLists, renderAllProjectsSidebar, renderTodoListProjectSelect }