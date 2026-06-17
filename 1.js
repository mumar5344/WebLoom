let totalCount = document.querySelector('.totalCount');
let pendingCount = document.querySelector('.pendingCount');
let doneCount = document.querySelector('.doneCount');
let insBar = document.querySelector('.insert');
let proceed = document.querySelector('.proceed');
let list = document.querySelector('.list');
let todoPara = document.querySelector('.goal');
let cross = document.querySelector('.cross');
let date = document.querySelector('.date');
let priority = document.querySelector('.prioCheck');
let toDo = document.querySelector('.todoTask');
let prioCheck = false;
let done = 0, total = 0, pending = 0;
let todoList = [];
function emptyList() {
    list.innerHTML = 
        `
        <p class="empty">Nothing Here...</p>
        `;
}
window.addEventListener('load', () => {
        if(!list.contains(toDo)) {
            emptyList();
        }
});
function addToList() {
    let value = insBar.value;
    todoList.push(value);
}
function sum() {
    totalCount.textContent = total;
    pendingCount.textContent = pending;
    doneCount.textContent = done;
}
proceed.addEventListener('click', () => {
    let insValue = insBar.value;
    let dateValue = date.value;
    addToList();
    let i = todoList.length - 1;
    if(insValue !== "" && dateValue !== "") {
        total += 1;
        pending += 1;
        const emptyMsg = list.querySelector('.empty');
        if(emptyMsg) emptyMsg.remove();
        taskHTML = `
            <div class="todoTask ${priority.checked ? 'prio' : 'none'}">
                <div class="todoArea">
                    <input type="checkbox" class="checkbox">
                    <p class="goal">${todoList[i]}</p>
                    <p class="dateAdd">${dateValue}</p>
                </div>
                <button class="cross">x</button>
            </div>
        `;
        if(priority.checked) {
            list.insertAdjacentHTML('afterbegin', taskHTML);
            priority.checked = false;
            prioCheck = true;
        } else if(priority.checked === false) {
            list.insertAdjacentHTML('beforeend', taskHTML);
        }
        insBar.value = '';
        date.value = '';
    }
    sum();
});
let checkBox = document.querySelector('.checkbox');
list.addEventListener('change', (e) => {
    if(e.target.classList.contains('checkbox')) {
        const p = e.target.nextElementSibling;
        p.style.textDecoration = e.target.checked ? 'line-through' : 'none';
        if (e.target.checked) e.target.disabled = true;
        done += 1;
        total -= 1;
        pending -= 1;
        sum();
    }
})
list.addEventListener('click', (e) => {
    if(e.target.classList.contains('cross')) {
        const task = e.target.closest('.todoTask');
        const check = document.querySelector('.checkbox');
        if(check.checked && done !== 0) {
            done -= 1;
        } else if(!check.checked && total !== 0 && pending !== 0) {
            total -= 1;
            pending -= 1
        }
        sum();
        task.remove();
        if(list.querySelectorAll('.todoTask').length === 0) {
            emptyList();
        }
    }
});
