// Initialize total points
let totalPoints = 0;

function completeTask(taskId, url, points) {
    // Open the task URL in a new tab (for mobile apps, consider if Telegram will allow external links)
    window.open(url, '_blank');

    // Simulate task completion by updating the points
    setTimeout(() => {
        // Update the task UI to indicate completion
        const taskElement = document.getElementById(taskId);
        taskElement.innerHTML = "<p>Task completed!</p>";

        // Update the total points
        totalPoints += points;
        document.getElementById('totalPoints').innerText = totalPoints;

        // Log task completion for debugging
        console.log(`Completed ${taskId}: +${points} points`);
    }, 1000); // Adding a delay to simulate completion
}
