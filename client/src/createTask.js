"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = void 0;
function createTask(title, content, date, time) {
    const taskDiv = document.querySelector(".tasks");
    const taskTitleContainer = createTaskElement("div", ["task-title-container"]);
    const taskTitle = createTaskElement("h4", ["task-title"], `${title}`);
    const taskDate = createTaskElement("p", ["task-date"], `${date}`);
    const taskTime = createTaskElement("p", ["task-time"], `${time}`);
    const taskContent = createTaskElement("div", ["task-content"], `${content}`);
    const taskDateTime = createTaskElement("div", ["task-datetime"]);
    const actionContainer = createTaskElement("div", ["action-area"]);
    const completeButton = createTaskElement("button", ["complete-button"]);
    const checkIcon = createTaskElement("i", ["fa-solid", "fa-check"]);
    const cancelIcon = createTaskElement("i", ["fa-solid", "fa-trash"]);
    // `<i class="fa-solid fa-check"></i>`
    const deleteButton = createTaskElement("button", ["delete-button"]);
    const taskContainer = createTaskElement("div", ["task-container"]);
    taskDiv === null || taskDiv === void 0 ? void 0 : taskDiv.appendChild(taskContainer);
    taskContainer.appendChild(taskTitleContainer);
    taskTitleContainer.appendChild(taskTitle);
    taskContainer.appendChild(taskContent);
    if (date || time) {
        taskContainer.appendChild(taskDateTime);
        taskDateTime.appendChild(taskDate);
        taskDateTime.appendChild(taskTime);
    }
    taskContainer.appendChild(actionContainer);
    actionContainer.appendChild(completeButton);
    completeButton.appendChild(checkIcon);
    actionContainer.appendChild(deleteButton);
    deleteButton.appendChild(cancelIcon);
}
exports.createTask = createTask;
function createTaskElement(type, classes, text) {
    const div = document.createElement(type);
    if (classes.length)
        div.classList.add(...classes);
    if (text)
        div.innerText = text;
    return div;
}
