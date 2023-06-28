//знаходимо елементи на сторінці
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

//для збереження даних
let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
}

tasks.forEach(function (task) {
    //формуємо сss клас для span 
    const cssClass = task.done ? 'task-title task-title--done' : 'task-title';

    //формуємо розмітку для нового завдання
    const taskHTML = `
                <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
					<span class="${cssClass}">${task.text}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>`;
    //додаємо завдання на сторінку тег ul
    tasksList.insertAdjacentHTML('beforeend', taskHTML);
})


//додаємо завдання
form.addEventListener('submit', addTask);

//видаляємо завдання
tasksList.addEventListener('click', deleteTask);

//відмічаємо виконане завдання
tasksList.addEventListener('click', doneTask);


//ф-ція для додавання завдання
function addTask(event) {
    //відміна стандартної поведінки браузера
    event.preventDefault();

    //дістаємо текст завдання з інпута
    const taskText = taskInput.value;

    //описуємо задачу в виді обєкту
    const newTask = {
        id: Date.now(), //в id буде записуватись поточна дата в мілісекундах
        text: taskText, 
        done: false,
    };
    
    //додаємо задачу в масив з задачами
    tasks.push(newTask);

    //збегіраємо список завдань в сховище LS
    saveToLocalStorage();

    //формуємо сss клас для span 
    const cssClass = newTask.done ? 'task-title task-title--done' : 'task-title';

    //формуємо розмітку для нового завдання
    const taskHTML = `
                <li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
					<span class="${cssClass}">${newTask.text}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>`;
    //додаємо завдання на сторінку тег ul
    tasksList.insertAdjacentHTML('beforeend', taskHTML);

    //очищуємо інпут, додаємо фокус на нього
    taskInput.value = ''
    taskInput.focus();

    checkEmptyList();
}

//ф-ція для видалення завдання
function deleteTask(event) { 
    //оптимізували: якщо клік НЕ по кнопці delete - код зупиняється
    if (event.target.dataset.action !== 'delete') retutn;
    //інакше:
    const parentNode = event.target.closest('.list-group-item');

    //опреділяємо id завдання
    const id = Number(parentNode.id);

    //видаляємо завдання через фільтрацію масиву
    //дослівно: перебираємо усі task, якщо task.id !== тому id який хочемо видалити - true - запише завдання в масив 
    //стрілочна ф-ція, return підставляється
    tasks = tasks.filter((task) => task.id !== id);

    //збегіраємо список завдань в сховище LS
    saveToLocalStorage();

    //видаляємо завдання з розмітки
    parentNode.remove();

    checkEmptyList();

    
    /* //перевіряємо, що клік був по кнопці button type="button" data-action="delete"
    if (event.target.dataset.action === 'delete') {
        //closest - шукає найближчий батьківський елемент
        const parentNode = event.target.closest('.list-group-item');
        parentNode.remove()
    }
    //показуємо emptyList (список справ пустий) якщо в списку завдань 1 елемент 
    if (tasksList.children.length === 1) {
        emptyList.classList.remove('none')
    } */
}

//ф-ція виконаного завдання
function doneTask(event) {
    //оптимізували: якщо клік був НЕ по кнопці done
    if (event.target.dataset.action !== 'done') return;
    //інакше:
    const parentNode = event.target.closest('.list-group-item');

    //опреділяємо id завдання
    const id = Number(parentNode.id);
    const task = tasks.find((task) => task.id === id);
    //змінюємо статус done(true/false) в масиві newTask, який записується в масив tasks
    task.done = !task.done

    //збегіраємо список завдань в сховище LS
    saveToLocalStorage();

    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done');
    //перевіряємо що клік був по кнопці <button type="button" data-action="done"
    /* if (event.target.dataset.action === 'done') {
        const parentNode = event.target.closest('.list-group-item');
        const taskTitle = parentNode.querySelector('.task-title');
        taskTitle.classList.toggle('task-title--done');
    } */
}

//ф-ція показу emptylist
function checkEmptyList() {
    //якщо масив tasks пустий - вставляємо emptylist
    if (tasks.length === 0) {
        const emptyListHTML = `
                <li id="emptyList" class="list-group-item empty-list">
					<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
					<div class="empty-list__title">Task list is empty</div>
				</li>
                `
        tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
    }

    if (tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;
    }
}

//ф-ція зберігання в LS
function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}