import "./styles.css";
import { renderBody } from "./render";
import { Dashboard, Project, TodoList, TodoItem } from "./classes";

document.addEventListener("DOMContentLoaded", () => {
    if (storageAvailable("localStorage")) {
        const dashboard = localStorage.getItem("dashboard-projects");
        if (dashboard) {
            const dashboardProjects = JSON.parse(dashboard);
            for (const project of dashboardProjects) {
                const newProject = new Project(project.name, project.dueDate);
                for (const todoList of project.todoLists) {
                    const newTodoList = new TodoList(todoList.name);
                    for (const todoItem of todoList.todoList) {
                        const item = new TodoItem(todoItem.name, todoItem.dueDate, todoItem.description, todoItem.priority);
                        if (todoItem.complete) {
                            item.updateCompleteStatus();
                        }
                        newTodoList.addTodo(item);
                    }
                    newProject.addTodoList(newTodoList);
                }
                Dashboard.addProject(newProject);
            }
        } else {
            const defaultProject = new Project("Default", "None");
            Dashboard.addProject(defaultProject);
            Dashboard.saveDashboard();
        }
      } else {
        const defaultProject = new Project("Default", "None");
        Dashboard.addProject(defaultProject);
      }
    renderBody();
});

const storageAvailable = (type) => {
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
        );
    }
}

export { storageAvailable }