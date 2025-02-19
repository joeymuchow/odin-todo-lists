import { Dashboard } from "./classes";
import { createTodoListElement } from "./elements";

// TODO create functions for creating elements for viewing a specific project and its todo lists

// TODO make these functions
// renderBody - renders the html body with the sidebar and containers
// renderViewAllTodos - renders all the todo lists from every project
// renderProject - renders all the todo lists in a specific project
// refactor createDashboardElements so that the content part is in renderViewAllTodos and the containers part is in renderBody
// then call those in index.js

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

export { renderAllTodoLists, renderAllProjects, renderTodoListProjectSelect }