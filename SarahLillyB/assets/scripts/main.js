
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;


ctx.fillStyle = "blue";
ctx.fillRect(0, 0, canvas.width, canvas.height);

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
    ctx.fillStyle = "black";

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