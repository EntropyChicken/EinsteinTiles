// sketch.js
// Main p5.js entry point. Kept thin: just setup(), draw(), and forwarded input handlers.
// All logic lives in src/coords.js, src/tiles.js, src/supertiles.js, src/camera.js

// 343 for the level 2 H supertile with redundant overlaps

let alpha = 255;

function setup() {
  createCanvas(windowWidth, windowHeight);
  SQRT3 = sqrt(3);
  initEinsteinVertices();
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  updateCamera();

  background(0);
  push();
  applyCameraTransform();

  // noStroke();
  stroke(0);
  strokeWeight(0.02);
  noFill();
  // drawHexTiling();
  // drawSplitterGrid();

  // fill(255, 0, 0, alpha);
  // drawEinsteinTile(hexToRect(0, 0, 0));
  // fill(255, 255, 0, alpha);
  // drawEinsteinTile(hexToRect(1, 2, 0), 2);
  // fill(0, 0, 255, alpha);
  // drawEinsteinTile(hexToRect(1, 0, -1));
  // fill(0, 255, 0, alpha);
  // drawEinsteinTile(hexToRect(1, -1, 1), 1);
  // fill(255, 0, 255, alpha);
  // drawEinsteinTile(hexToRect(1, 2, 3), 1, true);
  // fill(255, 100, 0, alpha);
  // drawEinsteinTile(hexToRect(0, 0, 3), 4);
  // fill(0, 180, 255, alpha);
  // drawEinsteinTile(hexToRect(1, 4, 2), 1);
  // fill(255,alpha);
  // drawEinsteinTile(hexToRect(0, 3, 3));

  // fill(0); if(random(0,15)<1) drawEinsteinTile();


//   drawSuperTile("H",1,hexToRect(0,12,0),0,false);
//   drawSuperTile("T",1,hexToRect(1,-6,2),0,false);
//   drawSuperTile("P",1,hexToRect(-1,0,10),0,false);
//   drawSuperTile("F",1,hexToRect(0,-2,-10),0,false);

    drawSuperTile("H", 2, hexToRect(0, 0, 0), 0, false);


  // drawFullGrid();




  drawCursorDot();

  pop();
}
