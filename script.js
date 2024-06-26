const newTodoInput = document.getElementById('new-todo'); // Input field for new items
const addTodoButton = document.getElementById('add-todo'); // Button to add new items
const todoList = document.getElementById('todo-list'); // Unordered list for displaying items
const completedCount = document.getElementById('completed-count'); // Span for displaying completed tasks count
const uncompletedCount = document.getElementById('uncompleted-count'); // Span for displaying uncompleted tasks count

let completedTasks = 0; // Counter for completed tasks
let uncompletedTasks = 0; // Counter for uncompleted tasks

// Function to update the counters
function updateCounters() {
    completedCount.textContent = completedTasks; // Update completed tasks count
    uncompletedCount.textContent = uncompletedTasks; // Update uncompleted tasks count
}

// Function to add a new to-do item
function addTodo() {
    const todoText = newTodoInput.value.trim(); // Get the input value and trim whitespace

    if (todoText !== '') { // Check if the input is not empty
        const listItem = document.createElement('li'); // Create a new list item element

        const checkbox = document.createElement('input'); // Create a new checkbox element
        checkbox.type = 'checkbox'; // Set the checkbox type to checkbox
        checkbox.className = 'checkbox'; // Add a class for styling

        const textSpan = document.createElement('span'); // Create a span for the to-do text
        textSpan.className = 'todo-text'; // Add a class for styling
        textSpan.textContent = todoText; // Set the span text to the input value

        const editInput = document.createElement('input'); // Create an input field for editing
        editInput.type = 'text'; // Set the input type to text
        editInput.className = 'edit-input'; // Add a class for styling
        editInput.style.display = 'none'; // Initially hide the edit input

        const editIcon = document.createElement('i'); // Create an icon for editing
        editIcon.className = 'fas fa-edit'; // Add classes for Font Awesome icon

        const deleteIcon = document.createElement('i'); // Create an icon for deleting
        deleteIcon.className = 'fas fa-trash-alt'; // Add classes for Font Awesome icon

        const actionsSpan = document.createElement('span'); // Create a span for action icons
        actionsSpan.className = 'todo-actions'; // Add a class for styling
        actionsSpan.appendChild(editIcon); // Append the edit icon to the actions span
        actionsSpan.appendChild(deleteIcon); // Append the delete icon to the actions span

        listItem.appendChild(checkbox); // Add the checkbox to the list item
        listItem.appendChild(textSpan); // Add the text span to the list item
        listItem.appendChild(editInput); // Add the edit input to the list item
        listItem.appendChild(actionsSpan); // Add the actions span to the list item

        todoList.appendChild(listItem); // Append the list item to the unordered list
        newTodoInput.value = ''; // Clear the input field

        uncompletedTasks++; // Increment the uncompleted tasks counter
        updateCounters(); // Update the task counters

        // Event listener for checkbox change to update task status
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) { // If checkbox is checked
                completedTasks++; // Increment completed tasks counter
                uncompletedTasks--; // Decrement uncompleted tasks counter
                textSpan.style.textDecoration = 'line-through'; // Cross out the text
            } else { // If checkbox is unchecked
                completedTasks--; // Decrement completed tasks counter
                uncompletedTasks++; // Increment uncompleted tasks counter
                textSpan.style.textDecoration = 'none'; // Remove text decoration
            }
            updateCounters(); // Update the task counters
        });

        // Event listener for edit icon click to toggle edit mode
        editIcon.addEventListener('click', () => {
            if (editInput.style.display === 'none') { // If edit input is hidden
                editInput.value = textSpan.textContent; // Set edit input value to current text
                textSpan.style.display = 'none'; // Hide the text span
                editInput.style.display = 'block'; // Show the edit input
                editInput.focus(); // Focus the edit input
            }
        });

        // Event listener for 'Enter' or 'Tab' key to accept changes when editing
        editInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === 'Tab') { // If 'Enter' or 'Tab' key is pressed
                textSpan.textContent = editInput.value; // Update the text span with the new value
                textSpan.style.display = 'block'; // Show the text span
                editInput.style.display = 'none'; // Hide the edit input
                event.preventDefault(); // Prevent the default action of the key
            }
        });

        // Event listener for delete icon click to remove the list item
        deleteIcon.addEventListener('click', () => {
            if (!checkbox.checked) { // If the task is not completed
                uncompletedTasks--; // Decrement uncompleted tasks counter
            } else { // If the task is completed
                completedTasks--; // Decrement completed tasks counter
            }
            todoList.removeChild(listItem); // Remove the list item from the unordered list
            updateCounters(); // Update the task counters
        });
    }
}

// Add a click event listener to the button to call addTodo when clicked
addTodoButton.addEventListener('click', addTodo);

// Event listener for 'Enter' key to add item to the list
newTodoInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { // If 'Enter' key is pressed
        addTodo(); // Call the addTodo function
        event.preventDefault(); // Prevent the default action of the key
    }
});
