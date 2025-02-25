import { bindEvents, showAllTodos, showSingleProject, showSingleTodoList } from "./bindEvents";
import { Dashboard } from "./classes";
import { createTodoListElement, createNewProjectModal, createNewTodoListModal } from "./elements";

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

    const todoListsContainer = document.createElement("div");
    todoListsContainer.classList.add("todo-lists-container");

    // all todo lists view is the default view so hide other two
    const singleProjectContainer = document.createElement("div");
    singleProjectContainer.classList.add("single-project-container", "hide");

    const singleTodoListContainer = document.createElement("div");
    singleTodoListContainer.classList.add("single-todo-list-container", "hide");

    content.append(titleContainer, buttonsContainer, todoListsContainer, singleProjectContainer, singleTodoListContainer);

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

    // TODO maybe this event listener should just be in bind events
    viewAllTodos.addEventListener("click", renderAllTodoLists);
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
    
    for (const todoList of project.todoLists) {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.textContent = todoList.name;
        li.append(link);
        todoLists.append(li);
        link.addEventListener("click", () => {
            renderTodoList(project, todoList);
        });
    }

    card.append(projectName, projectDueDate, line, todoLists);
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

    for (const todo of todoList.todoList) {
        const li = document.createElement("li");
        const name = document.createElement("p");
        name.textContent = todo.name;
        const dueDate = document.createElement("p");
        dueDate.textContent = todo.dueDate;
        const description = document.createElement("p");
        description.textContent = todo.description;
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.complete;
        checkbox.addEventListener("change", () => {
            todo.updateCompleteStatus();
        });

        li.append(checkbox, name, dueDate, description);
        todos.append(li);
    }

    const addTodoBtn = document.createElement("button");
    addTodoBtn.classList.add("create-todo-item");
    addTodoBtn.setAttribute("data-project-name", project.name);
    addTodoBtn.setAttribute("data-todo-list-name", todoList.name);
    addTodoBtn.addEventListener("click", showNewTodoModal);

    card.append(todoListName, todos);
    container.append(card);
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

export { renderBody, renderAllTodoLists, renderAllProjectsSidebar, renderTodoListProjectSelect }