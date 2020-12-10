
const DEFAULT_STEP_PERIOD = 500;
const SPEEDUP_STEP_PERIOD = 40;

var socket;

let stepPeriod;
let field;

let keyPress = false;

function setup() {
  /* Setup resolution */
  createCanvas(320, 576, P2D);

  /* new GameField(rows, columns); */
  field = new GameField(18, 10);

	console.log("your name is: " + player_name);

  socket = io.connect('185.221.124.205:3031', {
    reconnection: false
  });
}

setInterval(function(){ 

  var data = {
    cells: field.cells
  };
  
  socket.emit('cells', data);
  
}, 250);


// Timers
let keyPressTimer = 0;
let stepTimer = 0;

function draw() {

  /* Draw the Game field */

  field.draw(); 

  field.drawPredictedPosition();

  /* draw score */

  fill(255);
  textSize(20);
  textAlign(LEFT, TOP);
  text("score: "+field.score, 3, 3);

  textAlign(RIGHT, TOP);
  text("next:", width-3, 3);

  fill(255);
  stroke(0);
  strokeWeight(1);
  drawMiniShape(width-28, 30, field.nextShape, 12);

  /* Draw end */

  if (field.end) {
		/*
    noStroke();
    fill(0, 235);
    rect(0, 0, width, height);

    fill(255, 200, 120);
    textAlign(CENTER, CENTER);

    textSize(82);
    text("GAME\nOVER", width/2, height/4);

    textSize(30);
    text("score: " + field.score, width/2, height/2);

    textSize(16);
    text("Press <enter> key to restart", width/2, height-30);
		*/
  }

  /* Speed up key */
  if (keyIsDown(83)) { // Key 'S'
    stepPeriod = SPEEDUP_STEP_PERIOD;
  } else {
    stepPeriod = DEFAULT_STEP_PERIOD;
  }

  /* Timer for active shape shift down */
  if (stepTimer + stepPeriod < millis()) {
    stepTimer = millis();

    if (!field.end && field.step()) { // TRUE = shape hit some other shapes at the bottom
      // create next shape, if there is not enought space, end the game
      field.getNextShape();
    }
  }

  /* Key pressing timer */

  if (keyPressTimer + 100 < millis()) {
    keyPressTimer = millis();
    if (keyPress) { 
      keyPressing();
    }
  }
}

function drawMiniShape(px, py, s, cs) { // place x, y, shape, cell size

  let w = s[0].length; // get shape width
  let h = s.length; // get shape height

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (s[y][x] == 1) {
        rect(px + x*cs - (w*cs)/2, py + y*cs, cs, cs);
      }
    }
  }
}

function keyPressed() {

  keyPress = true;
  keyPressing();
  keyPressTimer = millis();
  // if the game is over return
  // rotate shape
  if (key == 'r' || key == 'R') {
    field.rotateShape();
  }
  // drop the shape down
  if (key == ' ') {
    // stepping till we stopped
    while (!field.step()) {
    }
    // create next shape, if there is not enought space, end the game
    field.getNextShape();
  }
}

function keyReleased() {
  keyPress = false;
}

function keyPressing() {
  // if the game is over return
  // moving the shape to the sides
  if (key == 'a' || key == 'A') { 
    field.moveX(-1);
  } // move left
  if (key == 'd' || key == 'D') {
    field.moveX(1);
  } // move right
}
