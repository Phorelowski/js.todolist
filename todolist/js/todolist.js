const TASKDOM = document.querySelector("#task");
const LISTDOM = document.querySelector("#list");
const BTNADD = document.querySelector("#liveToastBtn");
const TOAST = document.querySelectorAll("#liveToast");
const TODOLIST = JSON.parse(localStorage.getItem("todolist")) || [];

TODOLIST.forEach((task) => {
  addTaskToList(task.text, task.checked);
});

function newElement() {
  const TASK = TASKDOM.value.trim();

  if (TASK) {
    addTaskToList(TASK, false);
    TASKDOM.value = "";
    showSuccessToast("Listeye eklendi.");
  } else {
    showErrorToast("Listeye boş ekleme yapamazsınız!");
  }
}

function addTaskToList(taskText, checked) {
  const LI = document.createElement("li");
  LI.textContent = taskText;

  if (checked) {
    LI.classList.add("checked");
  }

  const DLTSPN = document.createElement("span");
  DLTSPN.innerHTML = "&times;";
  DLTSPN.classList.add("close");
  DLTSPN.addEventListener("click", () => removeElement(LI));
  LI.appendChild(DLTSPN);
  LISTDOM.appendChild(LI);

  LI.addEventListener("click", () => {
    if (LI.classList.contains("checked")) {
      LI.classList.remove("checked");
    } else {
      LI.classList.add("checked");
    }
    saveToLocalStorage();
  });

  saveToLocalStorage();
}

const removeElement = (element) => {
  element.remove();
  saveToLocalStorage();
};

document.addEventListener("keypress", (event) => {
  if (event.key === "Enter") newElement();
});

function saveToLocalStorage() {
  const tasks = [];
  LISTDOM.querySelectorAll("li").forEach((item) => {
    tasks.push({
      text: item.textContent,
      checked: item.classList.contains("checked"),
    });
  });
  localStorage.setItem("todolist", JSON.stringify(tasks));
}

function showToast(toastElement, message) {
  toastElement.querySelector(".toast-body").textContent = message;

  $(toastElement).toast({
    autohide: false,
  });
  $(toastElement).toast("show");
}

function showSuccessToast(message) {
  showToast(TOAST[0], message);
}

function showErrorToast(message) {
  showToast(TOAST[1], message);
}
