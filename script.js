// script.js

// Get the necessary DOM elements
const goalInput = document.getElementById('goal-input');
const addButton = document.getElementById('add-button');
const goalList = document.getElementById('goal-list');

// Retrieve goals from local storage or initialize an empty array
let goals = JSON.parse(localStorage.getItem('goals')) || [];

// Function to render the goals in the list
function renderGoals() {
  // Clear the goal list
  goalList.innerHTML = '';

  // Iterate through the goals array and create list items
  for (let i = 0; i < goals.length; i++) {
    const goal = goals[i];

    // Create a new list item
    const listItem = document.createElement('li');
    listItem.textContent = goal.text;

    // Add a completed class to the list item if the goal is completed
    if (goal.completed) {
      listItem.classList.add('completed');
    }

    // Create a delete button for each goal
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');

    // Add event listener to the delete button to remove the goal
    deleteButton.addEventListener('click', function() {
      goals.splice(i, 1); // Remove the goal from the array
      saveGoals(); // Save the updated goals to local storage
      renderGoals(); // Render the updated goals in the list
    });

    // Append the delete button to the list item
    listItem.appendChild(deleteButton);

    // Add event listener to toggle goal completion
    listItem.addEventListener('click', function() {
      goal.completed = !goal.completed; // Toggle the completed status
      saveGoals(); // Save the updated goals to local storage
      renderGoals(); // Render the updated goals in the list
    });

    // Append the list item to the goal list
    goalList.appendChild(listItem);
  }
}

// Function to add a new goal
function addGoal() {
  const text = goalInput.value.trim(); // Remove leading/trailing spaces

  if (text !== '') {
    const goal = {
      text: text,
      completed: false
    };

    goals.push(goal); // Add the goal to the goals array
    saveGoals(); // Save the updated goals to local storage
    renderGoals(); // Render the updated goals in the list

    goalInput.value = ''; // Clear the input field
  }
}

// Function to save goals to local storage
function saveGoals() {
  localStorage.setItem('goals', JSON.stringify(goals));
}

// Event listener for the add button
addButton.addEventListener('click', addGoal);

// Event listener for the Enter key in the input field
goalInput.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    addGoal();
  }
});

// Render the initial goals when the page loads
renderGoals();
