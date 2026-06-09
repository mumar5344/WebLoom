let list = document.querySelector('.list');
let totalCount = document.querySelector('.totalCount');
let pendingCount = document.querySelector('.pendingCount');
let doneCount = document.querySelector('.doneCount');
let proceed = document.querySelector('.proceed');
let insBar = document.querySelector('.insert');
let checkBox = document.querySelectorAll('.checkbox');
let crossButton = document.querySelector('.cross');
let toDo = document.querySelector('.todoTask');
let total = 0;
let pending = 0;
let done = 0;
let doneStatus = false;
function emptyList() {
    if (list.children.length === 0) {
        list.innerHTML = `<p class="empty">Nothing Here..</p>`;
        let emptyPara = document.querySelector('.empty');
        emptyPara.classList.toggle('.empty');
    }
}
emptyList();
function renderElements() {
    let value = insBar.value;
    if (value !== "")
    {
        list.innerHTML += `
            <div class="todoTask">
                <div class="todoArea">
                    <input type="checkbox" class="checkbox">
                    <p class="goal">${value}</p>
                </div>
                <button class="cross">x</button>
            </div>
        `;
        total += 1;
        pending += 1;
        insBar.value = "";
    }
}
if (list.children.length !== 0) {
    list.addEventListener('click', (e) => {
        if (e.target.classList.contains('checkbox'))
        {
            let checkBox = e.target;
            if(checkBox.checked) {
                checkBox.disabled = true;
                checkBox.nextElementSibling.textDecoration = "line-through";
                doneStatus = true;
                done += 1;
                if (pending !== 0) pending -= 1;
                numbPlus();
                // setInterval(() => {
                //     toDo.remove();
                // }, 1000)
            }
        }
    });
    list.addEventListener('click', (e) => {
        if(e.target.classList.contains('cross')) {
            let crossButton = e.target;
            crossButton.parentElement.remove();
            if (total !== 0 && doneStatus) {
                total -= 1;
                numbPlus();
            } else if (total !== 0 && !doneStatus) {
                total -= 1;
                numbPlus();
            }
            if (pending !== 0 && doneStatus) {
                pending -= 1;
                numbPlus();
            } else if(pending !== 0 && !doneStatus) {
                pending -= 1;
                numbPlus();
            }
            if (done !== 0 && doneStatus) {
                done -= 1;
                numbPlus();
            } else if(done !== 0 && !doneStatus) {
                done -= 1;
                numbPlus();
            }
        }
    });
    function numbPlus() {
        totalCount.textContent = `${total}`;
        doneCount.textContent = `${done}`;
        pendingCount.textContent = `${pending}`;
    }
}
insBar.addEventListener('keydown', (e) => {
    if(e.key === "Enter") {
        renderElements();
        numbPlus();
    }
    list.addEventListener('click', (e) => {
        if(e.target.classList.contains('empty')) {
            emptyPara = e.target;
            if(list.children.length !== 0) {
                emptyPara.remove();
            }
        }
    });
});
proceed.addEventListener('click', () => {
    renderElements();
    list.addEventListener('click', (e) => {
        if(e.target.classList.contains('empty')) {
            emptyPara = e.target;
                emptyPara.parentElement.remove();
        }
    });
})