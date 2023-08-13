let snakeVel = {x: 0, y: 0};
const eating = new Audio('food.mp3');
const movement = new Audio('movement.mp3');
const gameover = new Audio('oof.mp3');
const bgmusic = new Audio('bgmusic_2.mp3');
let speed = 5;
let score = 0;
let scoreElement = document.getElementById('score');
let lastPaintTime = 0;
let playGround = document.getElementById('playground');
let snakeObject = [
    {x: 10, y: 10}
]

let food = {
    x: 10, y: 15
};

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gamePlayer();
}

function isDead(sob) {
    for (let i = 1; i < snakeObject.length; i++) {
        if(sob[i].x === sob[0].x && sob[i].y === sob[0].y){
            return true;
        }
    }
    if(sob[0].x >= 20 || sob[0].x <= 0 || sob[0].y >= 20 || sob[0].y <= 0){
        console.log(sob[0].x, sob[0].y);
        return true;
    }
}

function gamePlayer() {
    if(isDead(snakeObject)){
        gameover.play();
        bgmusic.pause();
        score = 0;
        snakeVel = {x:0, y:0};
        alert("YOU DIED");
        snakeObject = [{x:10, y:10}];
        bgmusic.play();
    }

    if(snakeObject[0].y === food.y && snakeObject[0].x === food.x){
        eating.play();
        score += 1;     
        scoreElement.innerHTML = "Score: "+ score;
        snakeObject.unshift({x: snakeObject[0].x + snakeVel.x, y: snakeObject[0].y + snakeVel.y});
        let a = 1;
        let b = 18;
        food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())}
    }

    for (let i = snakeObject.length - 2; i >= 0; i--) {
        // const element = snakeObject[i];
        snakeObject[i+1] = {...snakeObject[i]};
    }

    snakeObject[0].x += snakeVel.x;
    snakeObject[0].y += snakeVel.y;

    playGround.innerHTML = "";
    snakeObject.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('body');
        }
        playGround.appendChild(snakeElement);
    })
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    playGround.appendChild(foodElement);
};



window.requestAnimationFrame(main);
window.addEventListener('keydown' ,e=>{
    snakeVel = {  x: 0, y: 1 };
    movement.play();
    bgmusic.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            snakeVel.x = 0;
            snakeVel.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            snakeVel.x = 0;
            snakeVel.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            snakeVel.x = -1;
            snakeVel.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            snakeVel.x = 1;
            snakeVel.y = 0;
            break;
        default:
            break;
    }
})



















