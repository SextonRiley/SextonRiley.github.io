let size = 20
let run = false
let bubbles = []
let foods = []
let offscreen = 0
let numbers = 0

function setup(){
  createCanvas(850,850);
  for (let i = 0; i < 200; i++) {
    let bubble = {
      x: random(30, (width-30)),
      y: random(30, (height-30)),
      direction: Math.floor(random(5)),
      path: 0,
      size: 10,
      speed: 1,
      exit: 0,
      fed: 0,
      not: false,
      number: 0,
      color: {
        r: random(0,255),
        g: random(0,255),
        b: random(0,255)
      }
    }
    bubbles.push(bubble)
  }
  for (let i = 0; i < (bubbles.length - 1); i++) {
    let food = {
      x: random(30, (width-30)),
      y: random(30, (height-30)),
      color: {
        r: 0,
        g: 255,
        b: 0
      }
    }
    foods.push(food)
  }
  for(let bubble of bubbles){
    bubble.number = (numbers+1);
    numbers += 1;
  }
}

function draw(){
  background(0);
  for(let bubble of bubbles){
    for(let i = bubbles.length -1; i >= 0; i--){
      let distance = dist(bubble.x, bubble.y,bubbles[i].x, bubbles[i].y);
      if(distance <= bubble.size + bubbles[i].size && bubble !== bubbles[i]){
        fill(255,0,0);
        if(bubble.direction >= 1 && bubble.direction <= 3){
          bubble.direction += 1;
        }
        else if(bubble.direction === 4){
          bubble.direction = 1;
        }
        if(bubbles[i].direction >= 1 && bubbles[i].direction <= 3){
          bubbles[i].direction += 1;
        }
        else if(bubbles[i].direction === 4){
          bubbles[i].direction = 1;
        }
      }
    }
    if((foods.length !== 0 && bubble.fed < 3) || bubbles.length === 1){
      if(bubble.path >= 0){
        if((bubble.x - bubble.size) < 0 || (bubble.y - bubble.size) < 0 || (bubble.x + bubble.size) > width || (bubble.y + bubble.size) > height){
          if(bubble.direction === 1 || bubble.direction === 2){
            bubble.direction += 2;
          }
          else if(bubble.direction === 3 || bubble.direction === 4){
            bubble.direction += -2;
          }
        }
        if(bubble.direction === 1){
          bubble.y += (-1*bubble.speed);
        }
        else if(bubble.direction === 2){
          bubble.x += (1*bubble.speed);
        }
        else if(bubble.direction === 3){
          bubble.y += (1*bubble.speed);
        }
        else if(bubble.direction === 4){
          bubble.x += (-1*bubble.speed);
        }
        bubble.moves += -1;
        bubble.path += -1;
      }
      else{
        bubble.path = random(100,500);
        if(bubble.direction !== 4){
          bubble.direction += 1;
        }
        else{
          bubble.direction = 1;
        }
      }
    }
    else if((foods.length === 0 || bubble.fed >= 3) && bubbles.length !== 1){
      if((bubble.x + bubble.size) !== 0 || (bubble.y + bubble.size) !== 0 || (bubble.x - bubble.size) !== width || (bubble.y - bubble.size) !== height){
        if(bubble.exit === 0){
          if(bubble.x <= bubble.y){
            if((bubble.x + bubble.y) <= width){
              bubble.exit = 4;
            }
            else{
              bubble.exit = 3;
            }
          }
          else{
            if((bubble.x + bubble.y) >= height){
              bubble.exit = 2;
            }
            else{
              bubble.exit = 1;
            }
          }
        }
      }
      if(bubble.exit === 1){
        bubble.y += (-1*bubble.speed);
      }
      if(bubble.exit === 3){
        bubble.y += (1*bubble.speed);
      }
      if(bubble.exit === 2){
        bubble.x += (1*bubble.speed);
      }
      if(bubble.exit === 4){
        bubble.x += (-1*bubble.speed);
      }
    }
    if(((bubble.x + bubble.size) <= 0 || (bubble.y + bubble.size) <= 0 || (bubble.x - bubble.size) >= width || (bubble.y - bubble.size) >= height) && bubble.not === false){
      offscreen += 1;
      bubble.not = true;
    }
    if(offscreen >= bubbles.length){
      for(let i = bubbles.length -1; i >= 0; i--){
        if(bubbles[i].fed === 0){
          if(bubbles.length !== 1){
            bubbles.splice(i,1);
          }
        }
        else{
          bubbles[i].fed = 0;
          bubbles[i].exit = 0;
          bubbles[i].path = 0;
          bubbles[i].x = random(30, (width-30));
          bubbles[i].y = random(30, (height-30));
          bubbles[i].not = false;
        }
      }
      for (let k = 0; k < (bubbles.length - 1); k++) {
        food = {
          x: random(30, (width-30)),
          y: random(30, (height-30)),
          color: {
            r: 0,
            g: 255,
            b: 0
          }
        }
        foods.push(food);
      }
      offscreen = 0;
    }
    circle(bubble.x, bubble.y, bubble.size);
    textSize(bubble.size);
    fill(255);
    text(bubble.number, (bubble.x - (bubble.size)), (bubble.y + (bubble.size/2)));
    if(bubbles.length === 1){
      textSize(40);
      text('Winner!',200,200);
    }
    fill(bubble.color.r, bubble.color.g, bubble.color.b);
  }
  for(let j = foods.length-1; j >= 0; j--){
    let food = foods[j];
    fill(food.color.r, food.color.g, food.color.g);
    circle(food.x, food.y, 5);
    for(let i = bubbles.length -1; i >= 0; i--){
      let distance = dist(food.x, food.y,bubbles[i].x, bubbles[i].y);
      if(distance <= 5 + bubbles[i].size){
        bubbles[i].fed += 1;
        bubbles[i].size += 2;
        bubbles[i].speed += .1;
        foods.splice(j,1);
      }
    }
  }
}