import { Dashboard, Project, TodoList, TodoItem } from "./classes";
import { renderAllTodoLists, renderAllProjectsSidebar, renderTodoListProjectSelect, renderTodoList } from "./render";

const cacheDom = {};

const cacheDomElements = () => {
    cacheDom.viewAllTodos = document.querySelector(".view-all-todos");
    cacheDom.newProject = document.querySelector(".new-project");
    cacheDom.newTodoList = document.querySelector(".new-todo-list");

    cacheDom.createProject = document.querySelector(".create-project");
    cacheDom.cancelProject = document.querySelector(".cancel-project");
    cacheDom.createTodoList = document.querySelector(".create-todo-list");
    cacheDom.cancelTodoList = document.querySelector(".cancel-todo-list");
    cacheDom.createTodoItem = document.querySelector(".create-todo-item");
    cacheDom.cancelTodoItem = document.querySelector(".cancel-todo-item");

    cacheDom.projectName = document.querySelector("#project-name");
    cacheDom.projectDueDate = document.querySelector("#project-due-date");
    cacheDom.todoListName = document.querySelector("#todo-list-name");
    cacheDom.todoListProject = document.querySelector("#project-select");
    cacheDom.todoItemName = document.querySelector("#todo-item-name");
    cacheDom.todoItemDueDate = document.querySelector("#todo-item-due-date");
    cacheDom.todoItemDesc = document.querySelector("#todo-item-description");
    cacheDom.todoItemPriority = document.querySelector("#priority-select");

    cacheDom.newProjectModal = document.querySelector(".new-project-modal");
    cacheDom.newTodoListModal = document.querySelector(".new-todo-list-modal");
    cacheDom.newTodoItemModal = document.querySelector(".new-todo-item-modal");

    cacheDom.projectNameError = document.querySelector(".project-name-error");
    cacheDom.projectDateError = document.querySelector(".project-date-error");
    cacheDom.todoListNameError = document.querySelector(".todo-list-name-error");
    cacheDom.todoItemNameError = document.querySelector(".todo-item-name-error");
    cacheDom.todoItemDateError = document.querySelector(".todo-item-date-error");
    cacheDom.todoItemDescError = document.querySelector(".todo-item-desc-error");

    cacheDom.todoListsContainer = document.querySelector(".todo-lists-container");
    cacheDom.singleProjectContainer = document.querySelector(".single-project-container");
    cacheDom.singleTodoListContainer = document.querySelector(".single-todo-list-container");
}

const bindEvents = () => {
    cacheDomElements();

    cacheDom.viewAllTodos.addEventListener("click", renderAllTodoLists);

    cacheDom.newProject.addEventListener("click", showNewProjectModal);
    cacheDom.newTodoList.addEventListener("click", showNewTodoListModal);
    
    cacheDom.createProject.addEventListener("click", createNewProject);
    cacheDom.cancelProject.addEventListener("click", closeNewProjectModal);
    cacheDom.createTodoList.addEventListener("click", createNewTodoList);
    cacheDom.cancelTodoList.addEventListener("click", closeNewTodoListModal);
    cacheDom.createTodoItem.addEventListener("click", createNewTodoItem);
    cacheDom.cancelTodoItem.addEventListener("click", closeNewTodoItemModal);

    cacheDom.projectName.addEventListener("keypress", () => clearError(cacheDom.projectNameError));
    cacheDom.projectName.addEventListener("change", () => clearError(cacheDom.projectNameError));
    cacheDom.projectDueDate.addEventListener("keypress", () => clearError(cacheDom.projectDateError));
    cacheDom.projectDueDate.addEventListener("change", () => clearError(cacheDom.projectDateError));

    cacheDom.todoListName.addEventListener("keypress", () => clearError(cacheDom.todoListNameError));
    cacheDom.todoListName.addEventListener("change", () => clearError(cacheDom.todoListNameError));

    cacheDom.todoItemName.addEventListener("keypress", () => clearError(cacheDom.todoItemNameError));
    cacheDom.todoItemName.addEventListener("change", () => clearError(cacheDom.todoItemNameError));
    cacheDom.todoItemDueDate.addEventListener("keypress", () => clearError(cacheDom.todoItemDateError));
    cacheDom.todoItemDueDate.addEventListener("change", () => clearError(cacheDom.todoItemDateError));
    cacheDom.todoItemDesc.addEventListener("keypress", () => clearError(cacheDom.todoItemDescError));
    cacheDom.todoItemDesc.addEventListener("change", () => clearError(cacheDom.todoItemDescError));
}

const showNewProjectModal = () => {
    cacheDom.newProjectModal.showModal();
}

const closeNewProjectModal = (e) => {
    e.preventDefault();
    resetNewProjectModal();
    cacheDom.newProjectModal.close();
}

const resetNewProjectModal = () => {
    clearError(cacheDom.projectNameError);
    clearError(cacheDom.projectDateError);
    cacheDom.projectName.value = "";
    cacheDom.projectDueDate.value = "";
}

const showNewTodoListModal = () => {
    cacheDom.newTodoListModal.showModal();
}

const closeNewTodoListModal = (e) => {
    e.preventDefault();
    resetNewTodoListModal();
    cacheDom.newTodoListModal.close();
}

const resetNewTodoListModal = () => {
    clearError(cacheDom.todoListNameError);
    cacheDom.todoListName.value = "";
    // reset select element to first option ("Default")
    cacheDom.todoListProject.selectedIndex = 0;
}

const showNewTodoItemModal = () => {
    cacheDom.newTodoItemModal.showModal();
}

const closeNewTodoItemModal = (e) => {
    e.preventDefault();
    resetNewTodoItemModal();
    cacheDom.newTodoItemModal.close();
}

const resetNewTodoItemModal = () => {
    clearError(cacheDom.todoItemNameError);
    clearError(cacheDom.todoItemDateError);
    clearError(cacheDom.todoItemDescError);
    cacheDom.todoItemName.value = "";
    cacheDom.todoItemDueDate.value = "";
    cacheDom.todoItemDesc.value = "";
    // reset select element to first option ("Low")
    cacheDom.todoItemPriority.selectedIndex = 0;
}

const createNewProject = (e) => {
    e.preventDefault();
    const form = e.target.form;
    const nameIsValid = cacheDom.projectName.checkValidity();
    const nameIsAvailable = checkProjectNameAvailability(form[0].value.trim());
    const dateIsValid = cacheDom.projectDueDate.checkValidity();
    if (nameIsValid && dateIsValid && nameIsAvailable) {
        const project = new Project(form[0].value.trim(), form[1].value);

        Dashboard.addProject(project);

        closeNewProjectModal(e);
        renderAllProjectsSidebar();
        renderTodoListProjectSelect();
    } else {
        if (!nameIsValid) {
            cacheDom.projectNameError.textContent = "This field is required";
        } else if (!nameIsAvailable) {
            cacheDom.projectNameError.textContent = "Name is not available";
        } else {
            cacheDom.projectNameError.textContent = "";
        }
        cacheDom.projectDateError.textContent = dateIsValid ? "" : "This field is required";
    }
}

const createNewTodoList = (e) => {
    e.preventDefault();
    const form = e.target.form;
    const projectName = form[1].value;
    const project = Dashboard.getProject(projectName);
    const nameIsAvailable = checkTodoListNameAvailability(project, form[0].value.trim());
    const nameIsValid = document.querySelector("#todo-list-name").checkValidity();
    if (nameIsValid && nameIsAvailable) {
        const todoList = new TodoList(form[0].value.trim());
        project.addTodoList(todoList);
        closeNewTodoListModal(e);
        renderTodoList(project, todoList);
    } else {
        if (!nameIsValid) {
            cacheDom.todoListNameError.textContent = "This field is required";
        } else if (!nameIsAvailable) {
            cacheDom.todoListNameError.textContent = "Name is not available";
        } else {
            cacheDom.todoListNameError.textContent = "";
        }
    }
}

const createNewTodoItem = (e) => {
    e.preventDefault();
    const nameIsValid = document.querySelector("#todo-item-name").checkValidity();
    const dateIsValid = document.querySelector("#todo-item-due-date").checkValidity();
    const descIsValid = document.querySelector("#todo-item-description").checkValidity();
    if (nameIsValid && dateIsValid && descIsValid) {
        const dataset = document.querySelector(".new-todo-item").dataset;
        const projectName = dataset.projectName;
        const todoListName = dataset.todoListName;
        const project = Dashboard.getProject(projectName);
        const todoList = project.getTodoList(todoListName);
        const form = e.target.form;
        const name = form[0].value;
        const dueDate = form[1].value;
        const description = form[2].value;
        const priority = form[3].value;
        const todoItem = new TodoItem(name, dueDate, description, priority);
        // add item to todoList
        todoList.addTodo(todoItem);
        
        closeNewTodoItemModal(e);

        renderTodoList(project, todoList);
    } else {
        cacheDom.todoItemNameError.textContent = nameIsValid ? "" : "This field is required";
        cacheDom.todoItemDateError.textContent = dateIsValid ? "" : "This field is required";
        cacheDom.todoItemDescError.textContent = descIsValid ? "" : "This field is required";
    }
}

const clearError = (error) => {
    error.textContent = "";
}

const showAllTodos = () => {
    cacheDom.todoListsContainer.classList.remove("hide");
    cacheDom.singleProjectContainer.classList.add("hide");
    cacheDom.singleTodoListContainer.classList.add("hide");
}

const showSingleProject = () => {
    cacheDom.singleProjectContainer.classList.remove("hide");
    cacheDom.todoListsContainer.classList.add("hide");
    cacheDom.singleTodoListContainer.classList.add("hide");
}

const showSingleTodoList = () => {
    cacheDom.singleTodoListContainer.classList.remove("hide");
    cacheDom.todoListsContainer.classList.add("hide");
    cacheDom.singleProjectContainer.classList.add("hide");
}

const checkProjectNameAvailability = (name) => {
    return Dashboard.getProject(name) === undefined;
}

const checkTodoListNameAvailability = (project, name) => {
    return project.getTodoList(name) === undefined;
}

// TODO delete project button - default cannot be deleted, for now

export { bindEvents, showAllTodos, showSingleProject, showSingleTodoList, showNewTodoItemModal, showNewTodoListModal };