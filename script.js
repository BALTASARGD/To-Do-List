var inputBox = document.getElementById("input-box");
var listContainer = document.getElementById("list-container");
function addTask() {
    if (!inputBox || !listContainer)
        return;
    if (inputBox.value.trim() === "") {
        alert("You must write something!");
    }
    else {
        var li = document.createElement("li");
        li.textContent = inputBox.value;
        listContainer.appendChild(li);
        var span = document.createElement("span");
        span.textContent = "\u00d7"; // Unicode for "×"
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}
listContainer === null || listContainer === void 0 ? void 0 : listContainer.addEventListener("click", function (e) {
    var _a;
    var target = e.target;
    if (target.tagName === "LI") {
        target.classList.toggle("checked");
        saveData();
    }
    else if (target.tagName === "SPAN") {
        (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
        saveData();
    }
});
inputBox === null || inputBox === void 0 ? void 0 : inputBox.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});
function saveData() {
    if (!listContainer)
        return;
    localStorage.setItem("data", listContainer.innerHTML);
}
function showTask() {
    if (!listContainer)
        return;
    listContainer.innerHTML = localStorage.getItem("data") || "";
}
showTask();
