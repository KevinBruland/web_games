console.log("Hello, Alex");

var canvasObjects=[];
var canvas = document.getElementById('mouseTrainer');
var ctx = canvas.getContext('2d');

function Square(x,y,height,width){
    this.color="black";
    this.height=(Math.ceil(Math.random()*100));
    this.width=(Math.ceil(Math.random()*100));
    this.x=(Math.floor(Math.random()*canvas.width));
    this.y=(Math.floor(Math.random()*canvas.height));

    if(this.x+this.width>canvas.width)
    {
        this.x=500-this.width;
    };
    if(this.y+this.height>canvas.height)
    {
        this.x=500-this.height;
    };


};



function draw(){
   

    ctx.fillStyle= 'rgb(219,193,198)';
    ctx.fillRect(10,10,50,50)


    ctx.fillStyle = 'rgba(0,102,0,1)';
    ctx.fillRect(30,300,50,50);
    
    
    
};

function render(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    var currentObject;
    for(var i=0; i<canvasObjects.length;i++){
        currentObject = canvasObjects[i];
        ctx.fillRect(currentObject.x, currentObject.y, currentObject.width, currentObject.height);

    }

}

function myClick(event){
    var x = event.offsetX;
    var y = event.offsetY;
    console.log("x: "+x + ", y: " + y);
    
    
    if(canvasObjects.length==0)
    {
        var newSquare= new Square();
        canvasObjects.push(newSquare);
    }

    else{

        if(!isSquareClick(x,y)){
            var newSquare= new Square();
            canvasObjects.push(newSquare);
        };
    };
   
    console.log(newSquare);

    
    render();

}

function isSquareClick(x, y){
    var currentObject;
    var clickedSquare=false;
    for(var i=0; i<canvasObjects.length;i++){
        currentObject = canvasObjects[i];
        if(x>=currentObject.x && x<=currentObject.x+currentObject.width && y>=currentObject.y && y<=currentObject.y+currentObject.height){
            canvasObjects.splice(i,1);
            clickedSquare=true;
        }
    }
   return clickedSquare;
};

document.onload = draw();

