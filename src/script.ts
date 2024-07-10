const newTodoInput = document.getElementById('new-todo') as HTMLInputElement;
const addTodoButton = document.getElementById('add-todo') as HTMLButtonElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const completedCount = document.getElementById('completed-count') as HTMLSpanElement;
const uncompletedCount = document.getElementById('uncompleted-count') as HTMLSpanElement;

let completedTasks = 0;
let uncompletedTasks = 0;

interface TodoItem {
    listItem: HTMLLIElement;
    checkbox: HTMLInputElement;
    textSpan: HTMLSpanElement;
    editInput: HTMLInputElement;
    editIcon: HTMLElement;
    deleteIcon: HTMLElement;
}

// Function to update the counters
function updateCounters(): void {
    completedCount.textContent = completedTasks.toString();
    uncompletedCount.textContent = uncompletedTasks.toString();
}

// Function to add a new to-do item
function addTodo(): void {
    const todoText: string = newTodoInput.value.trim();

    if (todoText !== '') {
        const listItem = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox';

        const textSpan = document.createElement('span');
        textSpan.className = 'todo-text';
        textSpan.textContent = todoText;

        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'edit-input';
        editInput.style.display = 'none';

        const editIcon = document.createElement('i');
        editIcon.className = 'fas fa-edit';

        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'fas fa-trash-alt';

        const actionsSpan = document.createElement('span');
        actionsSpan.className = 'todo-actions';
        actionsSpan.appendChild(editIcon);
        actionsSpan.appendChild(deleteIcon);

        listItem.appendChild(checkbox);
        listItem.appendChild(textSpan);
        listItem.appendChild(editInput);
        listItem.appendChild(actionsSpan);

        todoList.appendChild(listItem);
        newTodoInput.value = '';

        uncompletedTasks++;
        updateCounters();

        // Event listener for checkbox change to update task status
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                completedTasks++;
                uncompletedTasks--;
                textSpan.style.textDecoration = 'line-through';
            } else {
                completedTasks--;
                uncompletedTasks++;
                textSpan.style.textDecoration = 'none';
            }
            updateCounters();
        });

        // Event listener for edit icon click to toggle edit mode
        editIcon.addEventListener('click', () => {
            if (editInput.style.display === 'none') {
                editInput.value = textSpan.textContent || '';
                textSpan.style.display = 'none';
                editInput.style.display = 'block';
                editInput.focus();
            }
        });

        // Event listener for 'Enter' or 'Tab' key to accept changes when editing
        editInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === 'Tab') {
                textSpan.textContent = editInput.value;
                textSpan.style.display = 'block';
                editInput.style.display = 'none';
                event.preventDefault();
            }
        });

        // Event listener for delete icon click to remove the list item
        deleteIcon.addEventListener('click', () => {
            if (!checkbox.checked) {
                uncompletedTasks--;
            } else {
                completedTasks--;
            }
            todoList.removeChild(listItem);
            updateCounters();
        });
    }
}

addTodoButton.addEventListener('click', addTodo);

newTodoInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTodo();
        event.preventDefault();
    }
});
