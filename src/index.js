import "./styles.css";
import { renderBody } from "./render";
import { Dashboard, Project } from "./classes";
import { bindEvents } from "./bindEvents";

document.addEventListener("DOMContentLoaded", () => {
    const defaultProject = new Project("Default", "None");
    Dashboard.addProject(defaultProject);
    renderBody();
});