import "./styles.css";
import { createDashboardElements } from "./elements";
import { renderAllTodoLists, renderAllProjects } from "./render";
import { Dashboard, Project } from "./classes";
import bindEvents from "./bindEvents";

document.addEventListener("DOMContentLoaded", () => {
    const defaultProject = new Project("Default", "None");
    Dashboard.addProject(defaultProject);
    createDashboardElements();
    bindEvents();
    renderAllProjects();
    renderAllTodoLists();
});