# Interactive Task List with JavaScript

This code implements an interactive task list in a web browser using JavaScript. Below is a step-by-step breakdown:

## General Structure

```javascript
document.addEventListener("DOMContentLoaded", () => {
```
This code runs when the HTML document has finished loading (the `DOMContentLoaded` event). Within this event, it is guaranteed that the DOM elements are available for manipulation.

## Initial Variables

```javascript
const inputBox = document.getElementById("input-box") as HTMLInputElement | null;
const listContainer = document.getElementById("list-container") as HTMLUListElement | null;
```
- **`inputBox`**: Refers to the HTML input element where the user writes the task. If it does not exist, it will be `null`.
- **`listContainer`**: Refers to the container where tasks will be added as `<li>` elements.

Both elements are typed with `as` to define their types (`HTMLInputElement` and `HTMLUListElement`), ensuring type safety.

## Event to Detect "Enter"

```javascript
inputBox.addEventListener("keypress", function (e: KeyboardEvent): void {
    if (e.key === "Enter") {
        addTask();
    }
});
```
- `inputBox.addEventListener`: Listens for the `keypress` event on the text box.
- `e.key === "Enter"`: If the user presses the "Enter" key, the `addTask()` function is called to add a task.

## `addTask` Function

This function is responsible for adding a new task to the list.

### Initial Checks

```javascript
if (!inputBox || !listContainer) return;
```
If the elements are not available (`null`), the function terminates to avoid errors.

### Input Validation

```javascript
if (inputBox.value.trim() === "") {
    alert("You must write something!");
}
```
If the input value is empty (or only contains spaces), an alert message is displayed.

### Task Creation

```javascript
const li = document.createElement("li");
li.textContent = inputBox.value;
listContainer.appendChild(li);
```
- A `<li>` element is created to contain the task text.
- It is added to the `listContainer`.

### Delete Button

```javascript
const span = document.createElement("span");
span.textContent = "\u00d7"; // Unicode for "×"
li.appendChild(span);
```
- A `<span>` element is created to act as a delete button.
- It is added to the `<li>` element.

### Input Cleanup and Saving

```javascript
inputBox.value = "";
saveData();
```
- The input is cleared to allow the user to write another task.
- `saveData()` is called to save the list in `localStorage`.

## Event to Complete or Delete Tasks

```javascript
listContainer.addEventListener("click", function (e: MouseEvent): void {
    const target = e.target as HTMLElement;

    if (target.tagName === "LI") {
        target.classList.toggle("checked");
        saveData();
    } else if (target.tagName === "SPAN") {
        target.parentElement?.remove();
        saveData();
    }
});
```

### Detect Clicked Element

```javascript
const target = e.target as HTMLElement;
```
The `click` event detects which element was clicked (`target`).

### Mark as Completed

```javascript
if (target.tagName === "LI") {
    target.classList.toggle("checked");
    saveData();
}
```
- If the user clicks on a task (`LI`), it toggles the `checked` class to mark it as completed or uncompleted.
- Then saves the changes in `localStorage`.

### Delete Task

```javascript
else if (target.tagName === "SPAN") {
    target.parentElement?.remove();
    saveData();
}
```
- If the click was on the delete button (`SPAN`), it removes the parent element (`LI`).
- Saves the changes in `localStorage`.

## `saveData` Function

```javascript
function saveData(): void {
    if (!listContainer) return;
    localStorage.setItem("data", listContainer.innerHTML);
}
```
- **Objective**: Save the content of `listContainer` (the tasks) in the browser's local storage (`localStorage`).
- `localStorage.setItem`: Stores the `innerHTML` property of the container under the key "data", which includes both the tasks and their buttons.

## `showTask` Function

```javascript
function showTask(): void {
    if (!listContainer) return;
    listContainer.innerHTML = localStorage.getItem("data") || "";
}
```
- **Objective**: Restore the tasks from `localStorage` when reloading the page.
- `localStorage.getItem`: Retrieves the data stored under the key "data". If there is no data, it uses an empty string as the default value.

### Invocation of `showTask`

```javascript
showTask();
```
When the page loads, `showTask()` is called to display the previously saved tasks.

## Complete Flow Summary

1. When the page loads, `showTask()` retrieves and displays the saved tasks.
2. The user can add tasks by pressing "Enter", which creates a new `<li>` element with a delete button.
3. The user can:
     - Click on a task to mark it as completed (toggle `checked` class).
     - Click on the delete button to remove the task.
4. Each change (add, complete, delete) is saved in `localStorage` via `saveData()`.

This ensures that the task list is persistent even when the page is reloaded.
