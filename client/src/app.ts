import { createTask } from "./createTask";
import "../style.css";
import Axios from "axios";

const taskTitle = document.querySelector(
  '[name="task-title"]'
)! as HTMLInputElement;
const task = document.querySelector('[name="task"]')! as HTMLInputElement;
const datePicker = document.querySelector(
  '[name="deadline"]'
)! as HTMLInputElement;
const deadlineLabel = document.querySelector("#deadlineLabel") as HTMLElement;
const deadlineSection = document.querySelector(
  ".deadline-section"
) as HTMLElement;
const addBtn = document.querySelector(".add-button") as HTMLElement;
const taskFormContainer = document.querySelector(
  ".task-form-container"
) as HTMLElement;
const formBtn = document.querySelector(".formButton")!;
const cancelBtn = document.querySelector("#cancel") as HTMLElement;
const taskForm = document.querySelector(".task-form")! as HTMLFormElement;
const setDeadline = document.querySelector("#setDeadline") as HTMLInputElement;
const setTime = document.querySelector("#setTime") as HTMLInputElement;
const modal = document.querySelector(".overlay") as HTMLElement;

const BASE_URL = "http://localhost:8000";
const username = "arusnac";
let completeBtns: NodeListOf<Element>;
let deleteBtns: NodeListOf<Element>;
let taskElements: NodeListOf<Element>;

async function getTasks() {
  await Axios.get(BASE_URL + "/", {
    params: {
      username,
    },
  }).then((response) => {
    const tasks = response.data.tasks;
    console.log(response.data.tasks);
    for (let i in tasks) {
      createTask(
        tasks[i].title,
        tasks[i].content,
        tasks[i].date,
        tasks[i].time
      );
    }
    taskElements = document.querySelectorAll(".task-container");
    console.log(taskElements);
    completeBtns = document.querySelectorAll(".complete-button");
    deleteBtns = document.querySelectorAll(".delete-button");
    deleteTask();
    completeTask();
  });
}

getTasks();

function addTask(e: Event) {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const formProps = Object.fromEntries(formData);

  const title = formProps["task-title"] as string;
  const content = formProps.task as string;
  const date = formProps.deadline as string;
  const time = formProps.time as string;
  createTask(title, content, date, time);
  modal.style.display = "none";

  Axios.post(
    BASE_URL + "/add",
    { title, content, date, time },
    {
      params: { username: "arusnac" },
    }
  );
}

function toggleDeadline() {
  deadlineSection.classList.contains("hide-deadline")
    ? deadlineSection.classList.remove("hide-deadline")
    : deadlineSection.classList.add("hide-deadline");

  deadlineLabel.classList.contains("hide-deadline")
    ? deadlineLabel.classList.remove("hide-deadline")
    : deadlineLabel.classList.add("hide-deadline");
}

function toggleAddModal() {
  modal.style.display = "block";
  // taskFormContainer.classList.contains("hide-deadline")
  //   ? taskFormContainer.classList.remove("hide-deadline")
  //   : taskFormContainer.classList.add("hide-deadline");
}

async function completeTask() {
  for (let i in completeBtns) {
    completeBtns[i].addEventListener("click", function () {
      Axios.post(BASE_URL + "/delete", { username, index: i }).then(
        (response) => {
          taskElements[i].remove();
        }
      );
    });
  }
}
function deleteTask() {
  for (let i in deleteBtns) {
    deleteBtns[i].addEventListener("click", function () {
      Axios.post(BASE_URL + "/delete", { username, index: i }).then(
        (response) => {
          taskElements[i].remove();
        }
      );
    });
  }
}

addBtn.addEventListener("click", toggleAddModal);
taskForm?.addEventListener("submit", addTask);
setDeadline.addEventListener("click", toggleDeadline);
//Close the modal on click
cancelBtn.addEventListener("click", function () {
  modal.style.display = "none";
});
