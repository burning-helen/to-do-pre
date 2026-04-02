localStorage.clear()

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
	const savedTasks = localStorage.getItem('tasks');
	if (savedTasks) {
		return JSON.parse(saveTasks);
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
	const likeButton = clone.querySelector(".to-do__item-button_type_like");

    textElement.textContent = item;

	likeButton.addEventListener('click', function () {
    	likeButton.classList.toggle('to-do__item-button_type_like_active');
      
  })

	deleteButton.addEventListener('click', function() {
        clone.remove();
        const allItems = getTasksFromDOM();
        saveTasks(allItems);
    });

	duplicateButton.addEventListener('click', function() {
		const itemOldName = textElement.textContent;
		const newItemName = createItem(itemOldName);
		listElement.prepend(newItemName);

		const itemsUpdated = getTasksFromDOM();
		saveTasks(itemsUpdated);
	});

    editButton.addEventListener('click', function() {
        textElement.setAttribute('contenteditable', 'true');
        textElement.focus();
    });

    textElement.addEventListener('blur', function() {
        textElement.setAttribute('contenteditable', 'false');
        
        const itemsUpdated = getTasksFromDOM();
        saveTasks(itemsUpdated);
    });

    return clone;
}

function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll('.to-do__item-text');
	const tasksAll = [];
	itemsNamesElements.forEach(function(el){
		tasksAll.push(el.textContent)
	});

	return tasksAll;
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

items = loadTasks();

items.forEach(function(item){
	listElement.append(createItem(item))
});

formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    const taskText = inputElement.value;

    const newTask = createItem(taskText);
    listElement.prepend(newTask);
	const items = getTasksFromDOM();
	saveTasks(items);
    inputElement.value = '';
});

