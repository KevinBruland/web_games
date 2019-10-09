// FLIES
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

var flyArray = [];

function FlyConstructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 5;
};

function generateFly(x, y){
    var newFly = new FlyConstructor(x, y);
        flyArray.push(newFly);
}

function generateFlies() {
    for (var i = 0; i < 10; i++) {
        generateFly(Math.random() * canvas.width, Math.random() * canvas.height);
    }
}

function renderFlies() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#574556";

    for (var i = 0; i < flyArray.length; i++) {
        var fly = flyArray[i];

        if (fly.x - fly.r < canvas.width){
            ctx.beginPath();
            ctx.arc(fly.x, fly.y, fly.r, 0, Math.PI * 2);
            ctx.fill();

            fly.x += 1;
            fly.y += Math.random() > .5 ? 1 : -1;
        }
        else {
            flyArray.splice(i,1);
            i--;
            generateFly(0, Math.random() * canvas.height);
        }

    }
}

generateFlies();
window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    generateFlies();
});


// PLANT POT
var plantPotCanvas = document.getElementById("plantPotCanvas");
var potCtx = plantPotCanvas.getContext("2d");

plantPotCanvas.width = plantPotCanvas.offsetWidth;
plantPotCanvas.height = plantPotCanvas.offsetHeight;

var potWidth = 80;
var potSlantRatio = .2;
var potHeight = 150;

potCtx.fillStyle = "#ff9d6c";
potCtx.beginPath();
potCtx.moveTo(plantPotCanvas.width / 2 + potWidth, plantPotCanvas.height);
potCtx.lineTo(plantPotCanvas.width / 2 - potWidth, plantPotCanvas.height);
potCtx.lineTo(plantPotCanvas.width / 2 - potWidth - potHeight*potSlantRatio, plantPotCanvas.height - potHeight)
potCtx.lineTo(plantPotCanvas.width / 2 + potWidth + potHeight*potSlantRatio, plantPotCanvas.height - potHeight);
potCtx.lineTo(plantPotCanvas.width / 2 + potWidth, plantPotCanvas.height);
potCtx.fill();


// FLY TRAP
var flyTrapCanvas = document.getElementById("flyTrapCanvas");
var trapCtx = flyTrapCanvas.getContext("2d");

flyTrapCanvas.width = flyTrapCanvas.offsetWidth;
flyTrapCanvas.height = flyTrapCanvas.offsetHeight;

// FLY TRAP CONTROL
var mouseX = 0;
var mouseY = 0;
var canvasBoundary;

function getMouseMovement(e){
    canvasBoundary = canvas.getBoundingClientRect();
    mouseX = e.clientX;
    mouseY = e.clientY - canvasBoundary.top;
}

document.getElementById("gameArea").addEventListener("mousemove", function(e){
    getMouseMovement(e);
});

trapCtx.fillStyle ="#81AB77";
trapCtx.strokeStyle ="#81AB77";
trapCtx.lineWidth = "10";

function renderPlant(){
    trapCtx.clearRect(0, 0, flyTrapCanvas.width, flyTrapCanvas.height);
    trapCtx.beginPath();
    trapCtx.arc(mouseX, mouseY, 40, 0, 2 * Math.PI);
    trapCtx.fill();
    trapCtx.moveTo(mouseX, mouseY);
    trapCtx.lineTo(plantPotCanvas.width/2, plantPotCanvas.height - potHeight + 5);
    trapCtx.stroke();
}

function animationLoop() {
    renderFlies();
    renderPlant();
    requestAnimationFrame(animationLoop);
};
animationLoop();