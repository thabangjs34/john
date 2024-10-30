const wordsWithHints = [
    { word: ["M", "E", "T", "A", "F", "L", "I", "X"], hint: "Streaming Service" },
    { word: ["S", "E", "R", "I", "E", "S"], hint: "Multiple Episodes" },
    { word: ["A", "C", "T", "O", "R"], hint: "Performer" },
    { word: ["D", "I", "R", "E", "C", "T", "O", "R"], hint: "Film Maker" },
    { word: ["C", "I", "N", "E", "M", "A"], hint: "Movie Theater" }
];

let currentWord = getCurrentWord();
let shuffledOrder = shuffleArray([...currentWord.word]);

document.addEventListener("DOMContentLoaded", () => {
    const tilesContainer = document.getElementById("tilesContainer");
    tilesContainer.innerHTML = "";

    shuffledOrder.forEach(letter => {
        const tile = document.createElement("div");
        tile.className = "tile";
        tile.draggable = true;
        tile.textContent = letter;
        tile.setAttribute("data-letter", letter);
        tilesContainer.appendChild(tile);

        tile.addEventListener("dragstart", handleDragStart);
        tile.addEventListener("dragover", handleDragOver);
        tile.addEventListener("drop", handleDrop);
        tile.addEventListener("dragend", handleDragEnd);

        tile.addEventListener("touchstart", handleTouchStart);
        tile.addEventListener("touchmove", handleTouchMove);
        tile.addEventListener("touchend", handleTouchEnd);
    });

    document.getElementById("submit-button").addEventListener("click", checkPuzzle);
    document.getElementById("hint").textContent = `Hint: ${currentWord.hint}`;
    updateTimer();
});

let draggedTile = null;
let touchTile = null;
let touchStartX = 0;
let touchStartY = 0;

function handleDragStart(event) {
    draggedTile = event.target;
    draggedTile.classList.add("dragging");
}

function handleDragOver(event) {
    event.preventDefault();
}

function handleDrop(event) {
    event.preventDefault();
    if (draggedTile !== event.target) {
        const temp = draggedTile.textContent;
        draggedTile.textContent = event.target.textContent;
        event.target.textContent = temp;
    }
}

function handleDragEnd(event) {
    if (draggedTile) {
        draggedTile.classList.remove("dragging");
        draggedTile = null;
    }
}

function handleTouchStart(event) {
    touchTile = event.target;
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
}

function handleTouchMove(event) {
    event.preventDefault();
}

function handleTouchEnd(event) {
    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;

    const targetTile = document.elementFromPoint(touchEndX, touchEndY);

    if (targetTile && targetTile.classList.contains("tile") && touchTile !== targetTile) {
        const temp = touchTile.textContent;
        touchTile.textContent = targetTile.textContent;
        targetTile.textContent = temp;
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function checkPuzzle() {
    const currentOrder = Array.from(document.querySelectorAll(".tile")).map(tile => tile.textContent);
    if (currentOrder.join("") === currentWord.word.join("")) {
        document.getElementById("result-message").textContent = "You've earned 250 $MFLX";
        updatePoints(250);
        localStorage.setItem("puzzleLastCompleted", Date.now());
        document.getElementById("submit-button").disabled = true;
    } else {
        document.getElementById("result-message").textContent = "Dummy! Try again.";
    }
}

function updatePoints(points) {
    let totalPoints = parseInt(localStorage.getItem('totalPoints')) || 0;
    totalPoints += points;
    localStorage.setItem('totalPoints', totalPoints);
}

function updateTimer() {
    const lastCompletedTime = localStorage.getItem("puzzleLastCompleted");
    if (lastCompletedTime) {
        const elapsed = Date.now() - parseInt(lastCompletedTime);
        const remaining = Math.max(0, 8 * 60 * 60 * 1000 - elapsed);

        if (remaining > 0) {
            document.getElementById("submit-button").disabled = true;
            document.getElementById("timerFill").style.width = `${(elapsed / (8 * 60 * 60 * 1000)) * 100}%`;

            setInterval(() => {
                const newElapsed = Date.now() - parseInt(lastCompletedTime);
                document.getElementById("timerFill").style.width = `${(newElapsed / (8 * 60 * 60 * 1000)) * 100}%`;
                if (newElapsed >= 8 * 60 * 60 * 1000) {
                    document.getElementById("submit-button").disabled = false;
                    updateCurrentWord();
                }
            }, 1000);
        }
    } else {
        updateCurrentWord();
    }
}

function getCurrentWord() {
    const lastWordIndex = parseInt(localStorage.getItem("lastWordIndex"));
    const lastUpdatedTime = parseInt(localStorage.getItem("lastUpdatedTime"));
    const now = Date.now();

    if (!lastUpdatedTime || now - lastUpdatedTime >= 8 * 60 * 60 * 1000) {
        return updateCurrentWord();
    } else {
        return wordsWithHints[lastWordIndex];
    }
}

function updateCurrentWord() {
    const newWordIndex = Math.floor(Math.random() * wordsWithHints.length);
    const newWord = wordsWithHints[newWordIndex];

    localStorage.setItem("lastWordIndex", newWordIndex);
    localStorage.setItem("lastUpdatedTime", Date.now());
    shuffledOrder = shuffleArray([...newWord.word]);

    const tilesContainer = document.getElementById("tilesContainer");
    tilesContainer.innerHTML = "";

    shuffledOrder.forEach(letter => {
        const tile = document.createElement("div");
        tile.className = "tile";
        tile.draggable = true;
        tile.textContent = letter;
        tile.setAttribute("data-letter", letter);
        tilesContainer.appendChild(tile);

        tile.addEventListener("dragstart", handleDragStart);
        tile.addEventListener("dragover", handleDragOver);
        tile.addEventListener("drop", handleDrop);
        tile.addEventListener("dragend", handleDragEnd);

        tile.addEventListener("touchstart", handleTouchStart);
        tile.addEventListener("touchmove", handleTouchMove);
        tile.addEventListener("touchend", handleTouchEnd);
    });

    document.getElementById("hint").textContent = `Hint: ${newWord.hint}`;
    return newWord;
}
