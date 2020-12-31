var Engine = Matter.Engine,
    World = Matter.World,
    Events = Matter.Events,
    Bodies = Matter.Bodies; 
var particles = [];
var plinkos = [];
var divisions =[];
var particle;

var divisionHeight=300;
var score =0;
var count = 0;
var gameState ="start";

function setup() {
  createCanvas(480, 580);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/7, 10, divisionHeight));
   }
    for (var j = 30; j <=width; j=j+50) {
       plinkos.push(new Plinko(j,55));
    }

    for (var j = 50; j <=width-10; j=j+50) {
        plinkos.push(new Plinko(j,135));
    }

    for (var j = 30; j <=width; j=j+50) {
        plinkos.push(new Plinko(j,215));
    }

    for (var j = 50; j <=width-10; j=j+50) {
        plinkos.push(new Plinko(j,295));
    }
    
}
 
function draw() {
  background("black");
  textSize(30)
  text("Score : "+score,20,30);
  fill("white");
  //text(mouseX + "," + mouseY, 20, 50);
  textSize(35)
  text(" 500 ", 5, 420);
  text(" 500 ", 80, 420);
  text(" 500 ", 160, 420);
  text(" 500 ", 240, 420);
  text(" 100 ", 320, 420);
  text(" 100 ", 400, 420);
  text(" 100 ", 480, 420);
  text(" 200 ", 560, 420);
  text(" 200 ", 640, 420);
  text(" 200 ", 720, 420);
  Engine.update(engine);
  ground.display();
  
  if ( gameState =="end") {
    
    textSize(25);
    text("GameOver", 180, 180);
    //return
  }

  if(score>=2000){
    textSize(50);
    text("You Won !!",130,270)
    gameState="end";
  }

  

  for (var i = 0; i < plinkos.length; i++) {
     plinkos[i].display();  
  }
 
    if(particle!=null)
    {
       particle.display();
        
        if (particle.body.position.y>500)
        {
              if (particle.body.position.x < 300) 
              {
                  score=score+500;      
                  particle=null;
                  if ( count>= 5) gameState ="end";                          
              }


              else if (particle.body.position.x < 301 && particle.body.position.x > 601 ) 
              {
                    score = score + 100;
                    particle=null;
                    if ( count>= 5) gameState ="end";

              }
              else if (particle.body.position.x < 601 && particle.body.position.x > 900 )
              {
                    score = score + 200;
                    particle=null;
                    if ( count>= 5)  gameState ="end";

              }      
              
        }
  
      }

   for (var k = 0; k < divisions.length; k++) 
   {
     divisions[k].display();
   }
 
}


function mousePressed()
{
  if(gameState!=="end")
  {
      count++;
     particle=new Particle(mouseX, 10, 10, 10); 
  }   
}