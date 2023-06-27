//знаходимо елементи на сторінці
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

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

    //формуємо розмітку для нового завдання
    const taskHTML = `
                <li class="list-group-item d-flex justify-content-between task-item">
					<span class="task-title">${taskText}</span>
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
    taskInput.focus()

    //приховуємо emptyList (список справ пустий) якщо є завдання
    if (tasksList.children.length > 1) {
        emptyList.classList.add('none')
    }
}

//ф-ція для видалення завдання
function deleteTask(event) {
    //перевіряємо, що клік був по кнопці button type="button" data-action="delete"
    if (event.target.dataset.action === 'delete') {
        //closest - шукає найближчий батьківський елемент
        const parentNode = event.target.closest('.list-group-item');
        parentNode.remove()
    }
    //показуємо emptyList (список справ пустий) якщо в списку завдань 1 елемент
    if (tasksList.children.length === 1) {
        emptyList.classList.remove('none')
    }
}

//ф-ція виконаного завдання
function doneTask(event) {
    //перевіряємо що клік був по кнопці <button type="button" data-action="done"
    if (event.target.dataset.action === 'done') {
        const parentNode = event.target.closest('.list-group-item');
        const taskTitle = parentNode.querySelector('.task-title');
        taskTitle.classList.toggle('task-title--done');
    }
}