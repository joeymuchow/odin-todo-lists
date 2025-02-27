import "./styles.css";
import { renderBody } from "./render";
import { Dashboard, Project } from "./classes";

document.addEventListener("DOMContentLoaded", () => {
    const defaultProject = new Project("Default", "None");
    Dashboard.addProject(defaultProject);
    renderBody();
});

// TODO save projects to localStorage

// TODO load projects from localStorage