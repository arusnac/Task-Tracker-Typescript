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

console.log(setDeadline);

function addTask(e: Event) {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const formProps = Object.fromEntries(formData);
  console.log(formProps);
  createTask(
    formProps["task-title"] as string,
    formProps.task as string,
    formProps.deadline as string,
    formProps.time as string
  );
  modal.style.display = "none";

  Axios.post("http://localhost:8000" + "/new", {
    username: "arusnac",
  });
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

addBtn.addEventListener("click", toggleAddModal);
taskForm?.addEventListener("submit", addTask);
setDeadline.addEventListener("click", toggleDeadline);
//Close the modal on click
cancelBtn.addEventListener("click", function () {
  modal.style.display = "none";
});
//formBtn.addEventListener("click", printMessage);
createTask("TTTTTIIITLE", "CONNNNNTENT", "2/2/22", "05:50");
// modal.addEventListener("click", function () {
//   modal.style.display = "none";
// });
