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

function flyAnimation() {
    renderFlies();
    requestAnimationFrame(flyAnimation);
};
flyAnimation();


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

