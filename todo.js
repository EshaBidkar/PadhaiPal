const form = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('task-title').value.trim();
  const description = document.getElementById('task-desc').value.trim();
  const deadline = document.getElementById('task-deadline').value;

  if (!title || !description || !deadline) return;

  const taskCard = document.createElement('div');
  taskCard.classList.add('task-card');

  taskCard.innerHTML = `
    <div class="task-header">
      <div class="task-title-container">
        <input type="checkbox" class="task-complete-checkbox">
        <span class="task-title">${title}</span>
      </div>
      <span class="task-deadline">Due: ${deadline}</span>
    </div>
    <div class="task-desc">${description}</div>
    <div class="subtasks"></div>
    <form class="add-subtask-form">
      <input type="text" placeholder="Add subtask...">
      <button type="submit">+</button>
    </form>
  `;

  // Add event listener for checkbox
  const checkbox = taskCard.querySelector('.task-complete-checkbox');
  checkbox.addEventListener('change', () => {
    taskCard.classList.toggle('completed', checkbox.checked);
  });

  // Add event listener for adding subtasks
  const subtaskForm = taskCard.querySelector('.add-subtask-form');
  const subtasksContainer = taskCard.querySelector('.subtasks');

  subtaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = subtaskForm.querySelector('input');
    const subtaskText = input.value.trim();
    if (!subtaskText) return;

    const subtask = document.createElement('div');
    subtask.classList.add('subtask');
    subtask.innerHTML = `<span>➤</span>${subtaskText}`;
    subtasksContainer.appendChild(subtask);

    input.value = '';
  });

  taskList.appendChild(taskCard);

  form.reset();
});
