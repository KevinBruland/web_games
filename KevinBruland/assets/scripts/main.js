var mainCavnas = document.getElementById('mainCanvas');
var ctx = mainCavnas.getContext('2d');

// Set height and width of main canvas to elements size from CSS
mainCanvas.width = mainCanvas.offsetWidth;
mainCanvas.height = mainCanvas.offsetHeight;

var canvasWidth = mainCanvas.width;
var canvasHeight = mainCanvas.height;
var startBtn = document.getElementById("start");

var squares,colors,colorsLen,globalCounter,globalFrameCounter,spawnSpeed,mousePos, canvasBoundary, score, loopAnimation, gameDuration, timeRemaining, gameTimeInterval;

function initVars() {    
    squares = [];
    colors = ["#ff71ce", "#01cdfe", "#05ffa1", "#b967ff", "#fffb96"];
    colorsLen = colors.length;
    colorCounter = 0;
    globalFrameCounter = 100;
    spawnSpeed = 100;
    mousePos = {
        x: 0,
        y: 0
    };
    canvasBoundary = mainCanvas.getBoundingClientRect();
    score = 0;
    loopAnimation = true;
    gameDuration = 31000;
    timeRemaining = 30;
}

ctx.font = "30px monospace";

function RectangleGenerator(x, y, xGrowth, yGrowth, color) {
    this.x = x;
    this.y = y;
    this.width = 0;
    this.height = 0;
    this.xGrow = xGrowth;
    this.yGrow = yGrowth;
    this.color = color;
}

function addRectangle() {
    var x = Math.random() * canvasWidth,
        y = Math.random() * canvasHeight,
        xGrow = .5,
        yGrow = .5,
        newSquare = new RectangleGenerator(x, y, xGrow, yGrow, colors[colorCounter % colorsLen]);

    colorCounter++;

    squares.push(newSquare);
}

function renderSquare(square) {
    var xPos = square.x - square.width / 2,
        yPos = square.y - square.height / 2;

    ctx.fillStyle = square.color;

    if (square.width > 30) {
        var alpha = (130 - square.width) / 100;
        ctx.globalAlpha = alpha;
    } else {
        ctx.globalAlpha = 1;
    }

    ctx.strokeRect(
        square.x,
        square.y,
        square.width,
        square.height
    );

    ctx.fillRect(
        square.x,
        square.y,
        square.width,
        square.height
    );

    square.width += square.xGrow;
    square.x -= square.xGrow / 2;
    square.height += square.yGrow;
    square.y -= square.yGrow / 2;
}

function renderSquares() {
    for (var i = 0; i < squares.length; i++) {
        var curSquare = squares[i];

        // If the mouse is within the square
        if (
            mousePos.x > curSquare.x && 
            mousePos.x < curSquare.x + curSquare.width &&
            mousePos.y > curSquare.y &&
            mousePos.y < curSquare.y + curSquare.height
        ) {
            squares.splice(i, 1);
            i--;
            score++;  
        } else if (curSquare.width >= 129) {
            squares.splice(i, 1);
            i--;
            addRectangle();
        } else {
            renderSquare(curSquare);
        }
    }
}


mainCanvas.addEventListener('mousemove', function (e) {
    // TODO: Move to setting canvasBoundary on window resize / scroll possible?
    canvasBoundary = mainCanvas.getBoundingClientRect();
    mousePos.x = e.clientX - canvasBoundary.left;
    mousePos.y = e.clientY - canvasBoundary.top;

})

function renderScore() {
    ctx.fillText("score: " + score, 10, 30);
}

function renderTimeRemaining() {
    ctx.fillText("Time: " + timeRemaining, 10, 60);
}

function animationLoop() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    globalFrameCounter++;

    if (squares.length) {
        renderSquares();        
    } else {
        addRectangle();
    }

    ctx.globalAlpha = 1;
    ctx.fillStyle = "#01cdfe";
    renderScore();
    renderTimeRemaining();

    if (loopAnimation) {
        window.requestAnimationFrame(animationLoop);
    }
}

function stopGame() {
    timeRemaining = 0;
    loopAnimation = false;
    startBtn.classList.remove('hide');
    clearInterval(gameTimeInterval);
}

function startClock() {
    gameTimeInterval = setInterval(function(){        
        gameDuration -= 50;
        if(gameDuration <= 0) {
            stopGame();
        } else {
            timeRemaining = Math.floor(gameDuration / 1000);
        }
    }, 50);
}

function start() {
    startBtn.classList.add('hide');
    initVars();
    startClock();
    animationLoop();
}

document.getElementById("start").addEventListener('click', start);