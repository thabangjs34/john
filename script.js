// Initialize total points and retrieve task completion status from localStorage
let totalPoints = parseInt(localStorage.getItem('totalPoints')) || 0;
const tasks = [
    { id: 'task1', description: 'Subscribe to YouTube Channel', url: 'https://www.youtube.com/@metaflix24', points: 10 },
    { id: 'task2', description: 'Watch our latest video', url: 'https://youtu.be/KrAzMfO_TCQ', points: 5 },
    { id: 'task3', description: 'Refer a friend', url: 'https://t.me/mflx_bot', points: 1 },
    { id: 'task4', description: 'Join Our Community', url: 'https://t.me/metaflix24', points: 0 }
];

// Display total points on load
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('totalPoints').innerText = totalPoints;
    loadTasks();
});

// Load tasks and mark completed tasks
function loadTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '<h2>Available Tasks</h2>'; // Reset task list

     tasks.forEach(task => {
        // Check if task is completed in localStorage (skip for referral task)
        const isCompleted = localStorage.getItem(task.id) === 'completed' && !task.isReferral;
         

        // Create task element
        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        taskElement.id = task.id;

        if (isCompleted) {
            taskElement.innerHTML = `<p>${task.description} - Completed!</p>`;
        } else {
            if (task.id === 'task3') {
                // Special case for the referral task
                taskElement.innerHTML = `
                    <p>${task.description}</p>
                    <button onclick="shareReferralLink('${task.url}')">Share Referral Link</button>
                `;
            } else {
                taskElement.innerHTML = `
                    <p>${task.description}</p>
                    <button onclick="completeTask('${task.id}', '${task.url}', ${task.points})">Complete Task</button>
                `;
            }
        }
        
        // Add new tasks to the top of the task list if not completed
        taskList.insertBefore(taskElement, taskList.firstChild);
    });
}

// Mark task as completed and update points
function completeTask(taskId, url, points) {
    window.open(url, '_blank');

    setTimeout(() => {
        // Update task status to completed
        localStorage.setItem(taskId, 'completed');

        // Update points and save to localStorage
        totalPoints += points;
        document.getElementById('totalPoints').innerText = totalPoints;
        localStorage.setItem('totalPoints', totalPoints);

        // Reload tasks to reflect the completed task
        loadTasks();
    }, 1000);
}

// Function to share referral link and copy to clipboard
function shareReferralLink(referralLink) {
    navigator.clipboard.writeText(referralLink).then(() => {
        alert("Referral link copied! 🎉\nShare it with your friends: " + referralLink);
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
}

// Optional: Function to add new tasks dynamically
function addNewTask(taskId, description, url, points) {
    tasks.unshift({ id: taskId, description, url, points });
    loadTasks();
}
