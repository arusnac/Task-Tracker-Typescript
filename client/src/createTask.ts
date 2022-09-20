export function createTask(
  title: string,
  content: string,
  date?: string,
  time?: string
) {
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
  taskDiv?.appendChild(taskContainer);
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

function createTaskElement(
  type: string,
  classes: Array<string>,
  text?: string
) {
  const div = document.createElement(type);

  if (classes.length) div.classList.add(...classes);

  if (text) div.innerText = text;

  return div;
}
