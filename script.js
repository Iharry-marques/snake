const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20;
let snake = [{x: 10 * box, y: 10 * box}];
let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};

let score = 0;
let d;
let game;
let startTime;
let timerInterval;

document.addEventListener('keydown', direction);
document.getElementById('restartButton').addEventListener('click', restartGame);

function direction(event) {
    if (event.keyCode == 37 && d != "RIGHT") d = "LEFT";
    else if (event.keyCode == 38 && d != "DOWN") d = "UP";
    else if (event.keyCode == 39 && d != "LEFT") d = "RIGHT";
    else if (event.keyCode == 40 && d != "UP") d = "DOWN";
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.beginPath();
        ctx.arc(snake[i].x + box/2, snake[i].y + box/2, box/2, 0, 2*Math.PI);
        ctx.fill();
        ctx.strokeStyle = "red";
        ctx.stroke();
    }

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(food.x + box/2, food.y + box/2, box/2, 0, 2*Math.PI);
    ctx.fill();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        document.getElementById('score').innerHTML = "Pontuação: " + score;
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        }
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    if (snakeX < 0 || snakeX > 19 * box || snakeY < 0 || snakeY > 19 * box || collision(newHead, snake)) {
        clearInterval(game);
        clearInterval(timerInterval);
        alert("Game Over! Sua pontuação foi: " + score);
    }

    snake.unshift(newHead);
}

function updateTimer() {
    const currentTime = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById('timer').innerHTML = "Tempo: " + currentTime + "s";
}

function startGame() {
    snake = [{x: 10 * box, y: 10 * box}];
    food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };
    score = 0;
    d = undefined;
    document.getElementById('score').innerHTML = "Pontuação: 0";
    startTime = Date.now();
    game = setInterval(draw, 100);
    timerInterval = setInterval(updateTimer, 1000);
}

function restartGame() {
    clearInterval(game);
    clearInterval(timerInterval);
    startGame();
}

startGame();