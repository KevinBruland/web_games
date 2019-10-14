console.log("Hello, Alex");


function draw(){
    var canvas = document.getElementById('mouseTrainer');
    var ctx = canvas.getContext('2d');

    ctx.fillStyle= 'rgb(219,193,198)';
    ctx.fillRect(10,10,50,50)


    ctx.fillStyle = 'rgba(0,102,0,1)';
    ctx.fillRect(30,30,50,50);
    
    
    
};

function myClick(event){
    var x = event.offsetX;
    var y = event.offsetY;
    console.log("x: "+x + ", y: " + y);
}



document.onload = draw();

