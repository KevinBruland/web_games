// FLIES
var flyCanvas = document.getElementById("flyCanvas");
var ctx = flyCanvas.getContext("2d");

flyCanvas.width = flyCanvas.offsetWidth;
flyCanvas.height = flyCanvas.offsetHeight;

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
        generateFly(Math.random() * flyCanvas.width, Math.random() * flyCanvas.height);
    }
}

function renderFlies() {
    ctx.clearRect(0, 0, flyCanvas.width, flyCanvas.height);
    ctx.fillStyle = "#574556";

    for (var i = 0; i < flyArray.length; i++) {
        var fly = flyArray[i];

        if (fly.x - fly.r < flyCanvas.width){
            ctx.beginPath();
            ctx.arc(fly.x, fly.y, fly.r, 0, Math.PI * 2);
            ctx.fill();

            fly.x += 1;
            fly.y += Math.random() > .5 ? 1 : -1;
        }
        else {
            flyArray.splice(i,1);
            i--;
            generateFly(0, Math.random() * flyCanvas.height);
        }

    }
}

generateFlies();
window.addEventListener("resize", function () {
    flyCanvas.width = window.innerWidth;
    flyCanvas.height = window.innerHeight;
    generateFlies();
});


// PLANT POT
var plantPotCanvas = document.getElementById("plantPotCanvas");
var potCtx = plantPotCanvas.getContext("2d");

plantPotCanvas.width = plantPotCanvas.offsetWidth;
plantPotCanvas.height = plantPotCanvas.offsetHeight;

var potWidth = 60;
var potSlantRatio = .2;
var potHeight = 120;

// POT BASE
potCtx.fillStyle = "#ff9d6c";
potCtx.beginPath();
potCtx.moveTo(plantPotCanvas.width / 2 + potWidth, plantPotCanvas.height);
potCtx.lineTo(plantPotCanvas.width / 2 - potWidth, plantPotCanvas.height);
potCtx.lineTo(plantPotCanvas.width / 2 - potWidth - potHeight*potSlantRatio, plantPotCanvas.height - potHeight)
potCtx.lineTo(plantPotCanvas.width / 2 + potWidth + potHeight*potSlantRatio, plantPotCanvas.height - potHeight);
potCtx.lineTo(plantPotCanvas.width / 2 + potWidth, plantPotCanvas.height);
potCtx.fill();

// POT RIM
potCtx.beginPath();
potCtx.moveTo(plantPotCanvas.width / 2 - potWidth - 10 - potHeight*potSlantRatio, plantPotCanvas.height - potHeight);
potCtx.lineTo(plantPotCanvas.width / 2 - potWidth - 10 - potHeight*potSlantRatio, plantPotCanvas.height - potHeight - 30);
potCtx.lineTo(plantPotCanvas.width / 2 + potWidth + 10 + potHeight*potSlantRatio, plantPotCanvas.height - potHeight - 30);
potCtx.lineTo(plantPotCanvas.width / 2 + potWidth + 10 + potHeight*potSlantRatio, plantPotCanvas.height - potHeight);

potCtx.fill();

// STEM CANVAS SETUP
var stemCanvas = document.getElementById("stemCanvas");
var stemCtx = stemCanvas.getContext("2d");

stemCanvas.width = stemCanvas.offsetWidth;
stemCanvas.height = stemCanvas.offsetHeight;

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
    canvasBoundary = flyCanvas.getBoundingClientRect();
    mouseX = e.clientX;
    mouseY = e.clientY - canvasBoundary.top;
}

document.getElementById("gameArea").addEventListener("mousemove", function(e){
    getMouseMovement(e);
});

trapCtx.fillStyle ="#81AB77";

function renderHead(){
    trapCtx.clearRect(0, 0, flyTrapCanvas.width, flyTrapCanvas.height);
    trapCtx.beginPath();
    trapCtx.ellipse(mouseX, mouseY, 30, 15, 0, 40, 0, 2 * Math.PI);
    trapCtx.fill();
}

stemCtx.strokeStyle ="#81AB77";
stemCtx.lineWidth = "10";

function renderStem() {
    stemCtx.clearRect(0, 0, stemCanvas.width, stemCanvas.height);
    stemCtx.beginPath();
    stemCtx.moveTo(mouseX, mouseY);
    stemCtx.lineTo(plantPotCanvas.width/2, plantPotCanvas.height - potHeight - 28);
    stemCtx.stroke();
}

function animationLoop() {
    renderFlies();
    renderHead();
    renderStem();
    requestAnimationFrame(animationLoop);
};
animationLoop();