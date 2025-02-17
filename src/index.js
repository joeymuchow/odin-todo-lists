import "./styles.css";
import { createDashboardElements } from "./render";
import { Dashboard, Project } from "./classes";

document.addEventListener("DOMContentLoaded", () => {
    const defaultProject = new Project("Default", "None");
    Dashboard.addProject(defaultProject);
    createDashboardElements();
});