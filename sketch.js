//Create variables here
var dog,happyDog,database,foodS,foodStock;
var dogImg,lastFed,fedTime,foodObject;
var gameState;

function preload()
{
  dogImg = loadImage("Dog.png");
  happyDog=loadImage("happydog.png");



	//load images here
}

function setup() {
  createCanvas(1100, 500);
  dog = createSprite(950,350,30,30);
  dog.addImage(dogImg);
  dog.scale=0.2;
  database=firebase.database();
 foodStock=database.ref('Food');
  foodStock.on("value",readStock);

foodObject = new Food();

 feed = createButton("Feed the dog");
 feed.position(700,95);
 feed.mousePressed(feedDog);

 addFood = createButton("Add Food");
 addFood.position(800,95);
 addFood.mousePressed(addFoods);
 foodObject = new Food();

 
  
}


function draw() {  
  background(36,139,87);

  foodObject.display();

  fill(255,255,254);
  textSize(15);


  
  
  

  if(lastFed>=12){
    text("Last Feed : "+lastFed%+12+ "PM",350,30);
  }
  else if(lastFed==0){
    text("Last Feed : 12  AM",350,30);
  }
  else{
    text("Last Feed : "+lastFed + "AM",350,30);
  }
fedTime=database.ref('FeedTime');
fedTime.on("value",function(data){

  lastFed=data.val();
});
  
  drawSprites();
  //add styles here

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
Food:x
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObject.updateFoodStock(foodObject.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObject.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:FoodS
  })
}
function update(state){
  database.ref('/').update({
    gameState:state
  });
}