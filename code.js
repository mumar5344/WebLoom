let totalCount = document.querySelector('.totalCount');
let pendingCount = document.querySelector('.pendingCount');
let doneCount = document.querySelector('.doneCount');
let insBar = document.querySelector('.insert');
let line = document.querySelector('.line');
let proceed = document.querySelector('.proceed');
let list = document.querySelector('.list');
let todoPara = document.querySelector('.goal');
let cross = document.querySelector('.cross');
let date = document.querySelector('.date');
let priority = document.querySelector('.prioCheck');
let modes = document.querySelector('.modeSwitch');
let prioCheck;
let doneStatus;
let checkbox = document.querySelector('.checkbox');
let divHeading = document.querySelector('.divHeading');
let counts = document.querySelector('.count');
let container = document.querySelector('.confirmation');
let yes = document.querySelector('.yes');
let no = document.querySelector('.no');
let todoList = JSON.parse(localStorage.getItem('inputValue')) || [];
let dateList = JSON.parse(localStorage.getItem('dateListValue')) || [];
let checkedList = JSON.parse(localStorage.getItem('checkedListValue')) || [];
let prioList = JSON.parse(localStorage.getItem('prioSaved')) || [];
let mode = localStorage.getItem('storedMode') || "dark";
let body = document.querySelector('body');
let night = "./Icons/nightMode.png";
let light = "./Icons/lightMode.png";
let taskNumber = {
    done: 0,
    pending: 0,
    total: 0
}
function setMode(currentMode) {
    if(currentMode === "dark") {
        body.style.background = "rgb(28, 28, 28)";
        divHeading.style.color = "white";
        counts.style.color = "white";
        line.style.color = "white";
        modes.src = light;
    } else {
        body.style.background = "rgb(255, 255, 255)";
        divHeading.style.color = "black";
        counts.style.color = "black";
        line.style.color = "black";
        modes.src = night;
    }
}
setMode(mode);
modes.addEventListener('click', () => {
    if(mode === "dark") {
        mode = "light";
    } else if(mode === "light") {
        mode = "dark";
    }
    localStorage.setItem("storedMode", mode);
    setMode(mode);
    console.log(mode);
});
function checkEmpty() {
    if(todoList.length === 0) {
        list.innerHTML = `<p class="empty">Nothing Here</p>`;
    }
}
window.addEventListener("click", () => {
    let value = insBar.value;
    let dateValue = date.value;
    if(value) {
        insBar.style.borderColor = "rgb(255, 165, 0)";
        insBar.style.boxShadow = "none";
    }
    if(dateValue) {
        date.style.borderColor = "rgb(255, 165, 0)";
        date.style.boxShadow = "none";
    }
});
window.addEventListener('load', () => {
    let savedTasks = localStorage.getItem('savedTaskNumber');
    if(savedTasks) {
        taskNumber = JSON.parse(savedTasks);
    }
    showTaskNumber();
});
document.addEventListener("DOMContentLoaded", () => {
    checkEmpty();
});
function setValue() {
    let value = insBar.value;
    let dateValue = date.value;
    if (value === "") {
        insBar.style.borderColor = "rgb(255, 0, 0)";
        insBar.style.boxShadow = "0px 0px 2px 0px rgb(255, 0, 0)";
    } else {
        insBar.style.borderColor = "rgb(255, 165, 0)";
        insBar.style.boxShadow = "none";
    }
    if (dateValue === "") {
        date.style.borderColor = "rgb(255, 0, 0)";
        date.style.boxShadow = "0px 0px 10px rgb(255, 0, 0)";
    } else {
        date.style.borderColor = "rgb(255, 165, 0)";
        date.style.boxShadow = "none";
    }
    if(value !== "") {
        if(dateValue !== "") {
            doneStatus = false;
            todoList.push(value);
            dateList.push(dateValue);
            checkedList.push(doneStatus);
            if(priority.checked === false) {
                prioList.push(false);
            } else if (priority.checked === true) {
                prioList.push(true);
                priority.checked = false;
            }
            localStorage.setItem('prioSaved', JSON.stringify(prioList));
            localStorage.setItem('checkedListValue', JSON.stringify(checkedList));
            localStorage.setItem('inputValue', JSON.stringify(todoList));
            localStorage.setItem('dateListValue', JSON.stringify(dateList));
            taskNumber.total += 1;
            taskNumber.pending += 1;
            localStorage.setItem('savedTaskNumber', JSON.stringify(taskNumber));
            showTaskNumber();
            insBar.value = "";
            date.value = "";
            date.style.borderColor = "rgb(255, 165, 0)";
            insBar.style.borderColor = "rgb(255, 165, 0)";
        }
    }
}
let show;
function renderSaveList() {
    list.innerHTML = '';
    todoList.forEach((item, index) => {
    let isDone = checkedList[index];
    let isDone1;
    prioCheck = prioList[index];
    show = `
        <div class="todoTask" style="${prioCheck ? "border-color: red; box-shadow: 0px 0px 10px rgb(255, 0, 0)": "border-color: rgb(255, 255, 255); box-shadow: 0px 0px 10px rgb(255, 255, 255);"}">
            <div class="todoArea">
                <input type="checkbox" class="checkbox" data-index="${index}" ${isDone ? "checked disabled" : ""}>
                <div class="pad" style="${isDone ? "text-decoration: line-through;" : ""}">
                    <p class="goal">${item}</p>
                </div>
            </div>
            <div class="flexEnd">
                <p class="dateAdd">${dateList[index]}</p>
                <button class="cross" onclick="requestDelete(${index})">x</button>
            </div>
        </div>
    `;
    if(prioCheck === true) {
        list.insertAdjacentHTML("afterbegin", show);
    } else if (prioCheck === false) {
        list.insertAdjacentHTML("beforeend", show);
    }
});
}
let deleteIndex = null;
function requestDelete(index) {
    deleteIndex = index;
    container.style.display = "flex";
}
yes.addEventListener('click', () => {
    if (deleteIndex === null) return;
    let index = deleteIndex;
    let isDone1 = checkedList[index];
    todoList.splice(index, 1);
    dateList.splice(index, 1);
    checkedList.splice(index, 1);
    prioList.splice(index, 1);
    localStorage.setItem('inputValue', JSON.stringify(todoList));
    localStorage.setItem('dateListValue', JSON.stringify(dateList));
    localStorage.setItem('checkedListValue', JSON.stringify(checkedList));
    localStorage.setItem('prioSaved', JSON.stringify(prioList));
    taskNumber.total -= 1;
    if (isDone1 && taskNumber.done !== 0) {
        taskNumber.done -= 1;
    } else if(taskNumber.pending !== 0) {
        taskNumber.pending -= 1;
    }
    localStorage.setItem('savedTaskNumber', JSON.stringify(taskNumber));
    showTaskNumber();
    renderSaveList();
    checkEmpty();
    pendingDeleteIndex = null;
    container.style.display = 'none'; 
});
no.addEventListener('click', () => {
    deleteIndex = null;
    container.style.display = 'none';
});
list.addEventListener('click', (e) => {
    if(e.target.classList.contains('checkbox')) {
        let checkBox = e.target;
        if(checkBox.checked) {
            let idx = Number(checkBox.dataset.index);
            checkBox.disabled = true;
            checkBox.nextElementSibling.style.textDecoration = "line-through";
            doneStatus = true;
            checkedList[idx] = doneStatus;
            localStorage.setItem('checkedListValue', JSON.stringify(checkedList));
            taskNumber.pending -= 1;
            taskNumber.done += 1;
            localStorage.setItem('savedTaskNumber', JSON.stringify(taskNumber));
            showTaskNumber();
        }
    }
})
renderSaveList();
showTaskNumber();
function showTaskNumber() {
    totalCount.textContent = taskNumber.total;
    pendingCount.textContent = taskNumber.pending;
    doneCount.textContent = taskNumber.done;
}
proceed.addEventListener('click', () => {
    setValue();
    renderSaveList();
    checkEmpty();
    showTaskNumber();
});
insBar.addEventListener('keydown', (event) => {
    if(event.key === "Enter") {
        setValue();
        renderSaveList();
        checkEmpty();
        showTaskNumber();
    }
});
