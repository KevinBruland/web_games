var mainCavnas = document.getElementById('mainCanvas');
var ctx = mainCavnas.getContext('2d');

// Set height and width of main canvas to elements size from CSS
mainCanvas.width = mainCanvas.offsetWidth;
mainCanvas.height = mainCanvas.offsetHeight;

var canvasWidth = mainCanvas.width;
var canvasHeight = mainCanvas.height;

ctx.fillRect(0, 0,mainCanvas.width, mainCanvas.height);

var squares = [],
    colors = ["#ff71ce", "#01cdfe", "#05ffa1", "#b967ff", "#fffb96"],
    colorsLen = colors.length;
    colorCounter = 0;

function RectangleGenerator(x, y, xGrowth, yGrowth, color){
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
        newSquare = new RectangleGenerator(x,y,xGrow,yGrow, colors[colorCounter % colorsLen]);
        
    colorCounter++
    
    squares.push(newSquare);
}

var globalCounter = 100,
    spawnSpeed = 100;

ctx.fillStyle = "white";

function renderSquare(square) {
    var xPos = square.x - square.width / 2,
        yPos = square.y - square.height / 2;

    ctx.fillStyle = square.color;

    ctx.strokeRect(
        xPos,
        yPos,
        square.width,
        square.height
    );

    ctx.fillRect(
        xPos, 
        yPos,
        square.width, 
        square.height
    );

    square.width += square.xGrow;
    square.height += square.yGrow;
}

function animationLoop() {
    globalCounter++;
    
    if(globalCounter % spawnSpeed === 0) {
        addRectangle();
    }

    for(var i = 0; i < squares.length; i++){
        renderSquare(squares[i]);
    }

    window.requestAnimationFrame(animationLoop);
}

animationLoop();