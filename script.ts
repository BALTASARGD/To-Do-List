const inputBox = document.getElementById(
  "input-box"
) as HTMLInputElement | null;
const listContainer = document.getElementById(
  "list-container"
) as HTMLElement | null;

function addTask(): void {
  if (!inputBox || !listContainer) return;

  if (inputBox.value.trim() === "") {
    alert("You must write something!");
  } else {
    const li = document.createElement("li");
    li.textContent = inputBox.value;
    listContainer.appendChild(li);

    const span = document.createElement("span");
    span.textContent = "\u00d7"; // Unicode for "×"
    li.appendChild(span);
  }

  inputBox.value = "";
  saveData();
}

listContainer?.addEventListener("click", function (e: MouseEvent): void {
  const target = e.target as HTMLElement;

  if (target.tagName === "LI") {
    target.classList.toggle("checked");
    saveData();
  } else if (target.tagName === "SPAN") {
    target.parentElement?.remove();
    saveData();
  }
});

inputBox?.addEventListener("keypress", function (e: KeyboardEvent): void {
  if (e.key === "Enter") {
    addTask();
  }
});

function saveData(): void {
  if (!listContainer) return;
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(): void {
  if (!listContainer) return;
  listContainer.innerHTML = localStorage.getItem("data") || "";
}

showTask();
