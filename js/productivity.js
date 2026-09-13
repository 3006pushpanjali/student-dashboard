// --- WELCOME MESSAGE WIDGET ---
const savedProfile = localStorage.getItem("studentProfile");

if (savedProfile) {
    const userProfile = JSON.parse(savedProfile);
    document.getElementById("welcome-message").textContent = `Welcome, ${userProfile.name}!`;
}

// --- ATTENDANCE TRACKER (WITH PERMANENT MEMORY) ---
const attendanceList = document.getElementById('attendance-list');

// 1. Load existing records from memory, or start an empty array
let attendanceRecords = JSON.parse(localStorage.getItem('savedAttendance')) || [];

// 2. Function to draw the attendance records on the screen
function renderAttendance() {
  attendanceList.innerHTML = ''; 
  
  attendanceRecords.forEach((record, index) => {
    const div = document.createElement('div');
    div.className = 'list-item';
    div.innerHTML = `
      <span>${record.subject} (${record.attended}/${record.total})</span>
      <div>
        <span class="${record.statusClass}">${record.percentage}%</span>
        <button style="cursor:pointer; background:none; border:none; color:#ff5252; margin-left:15px;" onclick="removeAttendance(${index})">✕</button>
      </div>
    `;
    attendanceList.appendChild(div);
  });
}

// 3. Calculate and add new attendance
document.getElementById('add-attendance-btn').addEventListener('click', () => {
  const subject = document.getElementById('subject-name').value.trim();
  const attended = parseInt(document.getElementById('attended-classes').value);
  const total = parseInt(document.getElementById('total-classes').value);

  // Validate the inputs
  if (!subject || isNaN(attended) || isNaN(total) || total <= 0 || attended > total) {
    alert('Please enter valid attendance details.');
    return;
  }

  // Calculate percentage and determine safe/warning color
  const percentage = Math.round((attended / total) * 100);
  const statusClass = percentage >= 75 ? 'safe' : 'warning';

  // Save the new calculation to our array and update browser memory
  attendanceRecords.push({ subject, attended, total, percentage, statusClass });
  localStorage.setItem('savedAttendance', JSON.stringify(attendanceRecords));

  // Clear the input boxes
  document.getElementById('subject-name').value = '';
  document.getElementById('attended-classes').value = '';
  document.getElementById('total-classes').value = '';
  
  // Redraw the list
  renderAttendance();
});

// 4. Remove a specific attendance record
window.removeAttendance = function(index) {
  attendanceRecords.splice(index, 1);
  localStorage.setItem('savedAttendance', JSON.stringify(attendanceRecords));
  renderAttendance();
};

// 5. Draw the attendance records immediately when the page loads
renderAttendance();


// --- TO-DO LIST (WITH PERMANENT MEMORY) ---
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// 1. Load existing tasks from memory, or start an empty array if none exist
let tasks = JSON.parse(localStorage.getItem('savedTasks')) || [];

// 2. Function to draw the tasks on the screen
function renderTasks() {
  taskList.innerHTML = ''; // Clear the current display
  
  tasks.forEach((taskText, index) => {
    const li = document.createElement('li');
    li.className = 'list-item';
    li.innerHTML = `
      <span>${taskText}</span>
      <button style="cursor:pointer; background:none; border:none; color:#ff5252;" onclick="removeTask(${index})">✕</button>
    `;
    taskList.appendChild(li);
  });
}

// 3. Add a new task
addTaskBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (!text) return; // Stop if the input is empty

  tasks.push(text); // Add the new task to our array
  localStorage.setItem('savedTasks', JSON.stringify(tasks)); // Save the updated array to memory
  
  taskInput.value = ''; // Clear the input box
  renderTasks(); // Redraw the list
});

// 4. Remove a task
window.removeTask = function(index) {
  tasks.splice(index, 1); // Delete the specific task from the array
  localStorage.setItem('savedTasks', JSON.stringify(tasks)); // Save the updated array to memory
  renderTasks(); // Redraw the list
};

// 5. Draw the tasks immediately when the page loads
renderTasks();