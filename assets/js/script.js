document.addEventListener("DOMContentLoaded", loadChecklist);

function addItem() {
    let input = document.getElementById("itemInput");
    let text = input.value.trim();
    if (text === "") return;

    let checklist = JSON.parse(localStorage.getItem("checklist")) || [];
    checklist.push({ text, completed: false });
    localStorage.setItem("checklist", JSON.stringify(checklist));
    input.value = "";
    renderChecklist();
}

function renderChecklist() {
    let checklist = JSON.parse(localStorage.getItem("checklist")) || [];
    let ul = document.getElementById("checklist");
    ul.innerHTML = "";
    checklist.forEach((item, index) => {
        let li = document.createElement("li");
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = item.completed;
        checkbox.onchange = () => toggleComplete(index);

        let span = document.createElement("span");
        span.textContent = item.text;
        if (item.completed) span.style.textDecoration = "line-through";
        
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteItem(index);

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        ul.appendChild(li);
    });
}

function toggleComplete(index) {
    let checklist = JSON.parse(localStorage.getItem("checklist"));
    checklist[index].completed = !checklist[index].completed;
    localStorage.setItem("checklist", JSON.stringify(checklist));
    renderChecklist();
}

function deleteItem(index) {
    let checklist = JSON.parse(localStorage.getItem("checklist"));
    checklist.splice(index, 1);
    localStorage.setItem("checklist", JSON.stringify(checklist));
    renderChecklist();
}

function saveToJson() {
    let checklist = localStorage.getItem("checklist");
    let blob = new Blob([checklist], { type: "application/json" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "checklist.json";
    a.click();
}

function loadChecklist() {
    renderChecklist();
}