let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
	if (localStorage.length > 0) {
		return JSON.parse(localStorage.getItem('tasks'));
	} 
	return items;
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

  textElement.textContent = item;
	deleteButton.addEventListener('click', () => {
		clone.remove();
		const items = getTasksFromDOM();
		saveTasks(items);
	});
	duplicateButton.addEventListener('click', () => {
		const newItem = createItem(item);
		listElement.prepend(newItem);
		const items = getTasksFromDOM();
		saveTasks(items);
	});
	editButton.addEventListener('click', () => {
		textElement.setAttribute('contenteditable', 'true');
		textElement.focus()
	});
	textElement.addEventListener('blur', () => {
		textElement.setAttribute('contenteditable', 'false');
		const items = getTasksFromDOM();
		saveTasks(items);
	})

	return clone;
	
}

function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll('.to-do__item-text');
	const tasks = [];
	itemsNamesElements.forEach(elem => {
		tasks.push(elem.textContent);
	})
	return tasks;
}

function saveTasks(tasks) {
	const stringTasks = JSON.stringify(tasks);
	localStorage.setItem('tasks', stringTasks)
}



formElement.addEventListener('submit', (event) => {
	event.preventDefault();
	const text = inputElement.value;

	const item = createItem(text);
	listElement.prepend(item);

	items = getTasksFromDOM();
	saveTasks(items);
	formElement.reset();
})


items = loadTasks();

items.forEach(elem => {
	listElement.append(createItem(elem));
})
