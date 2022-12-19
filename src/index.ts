import './styles/style.css'
import { getRandomNumber } from './helpers'

let score: number = 0;

const config: { step: number, maxStep: number, sizeCell: number, sizeBerry: number } = {
    step: 0,
    maxStep: 6,
    sizeCell: 16,
    sizeBerry: 16 / 4
}

const snake: { x: number, y: number, dx: number, dy: number, tails: any[], maxTails: number } = {
    x: 160,
    y: 160,
    dx: config.sizeCell,
    dy: 0,
    tails: [],
    maxTails: 3,
}

let berry: { x: number, y: number } = {
    x: 0,
    y: 0,
}

const collisionBorder = (): void => {
    if (snake.x < 0) {
        snake.x = canvas!.width - config.sizeCell;
    } else if (snake.x >= canvas!.width) {
        snake.x = 0;
    }

    if (snake.y < 0) {
        snake.y = canvas!.height - config.sizeCell;
    } else if (snake.y >= canvas!.height) {
        snake.y = 0;
    }
}

const incScore = (): void => {
    score++;
    drawScore();
}

const randomPositionBerry = (): void => {
    berry.x = getRandomNumber(0, canvas!.width / config.sizeCell) * config.sizeCell;
    berry.y = getRandomNumber(0, canvas!.height / config.sizeCell) * config.sizeCell;
}

const drawSnake = (): void => {
    snake.x += snake.dx;
    snake.y += snake.dy;

    collisionBorder();

    snake.tails.unshift({ x: snake.x, y: snake.y });

    if (snake.tails.length > snake.maxTails) {
        snake.tails.pop();
    }

    snake.tails.forEach((item, index) => {
        if (index === 0) {
            context!.fillStyle = "#FFE604";
        } else {
            context!.fillStyle = "#FF9B04";
        }
        context!.fillRect(item.x, item.y, config.sizeCell, config.sizeCell);

        if (item.x === berry.x && item.y === berry.y) {
            snake.maxTails++;
            incScore();
            randomPositionBerry();
        }

        for (let i = index + 1; i < snake.tails.length; i++) {

            if (item.x == snake.tails[i].x && item.y == snake.tails[i].y) {
                refreshGame();
            }

        }

    });
}

const drawScore = (): number => scoreBlock.innerHTML = score;

const refreshGame = (): void => {
    score = 0;
    drawScore();

    snake.x = 160;
    snake.y = 160;
    snake.tails = [];
    snake.maxTails = 3;
    snake.dx = config.sizeCell;
    snake.dy = 0;

    randomPositionBerry();
}

let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
let context = canvas!.getContext("2d");
const scoreBlock: any = document.querySelector(".game-score .score-count");
drawScore();

const gameLoop = (): void => {

    requestAnimationFrame(gameLoop);
    if (config.step++ < config.maxStep) {
        return;
    }
    config.step = 0;

    context!.clearRect(0, 0, canvas!.width, canvas!.height);
    drawBerry();
    drawSnake();
}

requestAnimationFrame(gameLoop);

const drawBerry = (): void => {
    context!.beginPath();
    context!.fillStyle = "#FFE604";
    context!.arc(berry.x + (config.sizeCell / 2), berry.y + (config.sizeCell / 2), config.sizeBerry, 0, 2 * Math.PI);
    context!.fill();
}

document.addEventListener("keydown", (e) => {
    if (e.code === "KeyW") {
        snake.dy = -config.sizeCell;
        snake.dx = 0;
    } else if (e.code === "KeyA") {
        snake.dx = -config.sizeCell;
        snake.dy = 0;
    } else if (e.code === "KeyS") {
        snake.dy = config.sizeCell;
        snake.dx = 0;
    } else if (e.code === "KeyD") {
        snake.dx = config.sizeCell;
        snake.dy = 0;
    }
});

// todo

// реализовать паузу
// исправить коллизию
// запись результатов игроков
// старт и конец игры