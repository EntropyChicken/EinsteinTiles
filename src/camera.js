// camera.js
// Camera state (pan + zoom) and mouse/keyboard input handling.
// c = camera world position and zoom. m = mouse world position and interaction state.
// Depends on: coords.js (rectToHex, hexToRect)

// Camera: x/y is the world-space center, z is zoom (smaller = more zoomed in)
let c = {
  // x:-9.15, //-0.15
  x: -0.15,
  y: 0.35,
  z: 0.012,
};

// Mouse world state: x/y in world space, hc in hex coords, turns/reflect for tile placement
let m = {
  x: 0,
  y: 0,
  hc: {},
  turns: 0,
  reflect: false
};

function updateCamera() {
  // Update mouse world position
  m.x = c.x + map(mouseX, 0, width, -width, width) * c.z / 2;
  m.y = c.y + map(mouseY, 0, height, -height, height) * c.z / 2;
  m.hc = rectToHex(m.x, m.y);

  // Pan with WASD or arrow keys
  if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) {
    c.x -= 0.05;
  }
  if (keyIsDown(87) || keyIsDown(UP_ARROW)) {
    c.y -= 0.05;
  }
  if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
    c.x += 0.05;
  }
  if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) {
    c.y += 0.05;
  }

  // Zoom with SHIFT (zoom out) and SPACE (zoom in)
  if (keyIsDown(SHIFT)) {
    c.z -= 0.0002;
  }
  if (keyIsDown(32)) {
    c.z += 0.0002;
  }
  c.z = max(c.z, 0.0002);
}

// Apply the camera transform. Call this inside push()/pop() in draw().
function applyCameraTransform() {
  translate(width / 2, height / 2);
  scale(1 / c.z);
  translate(-c.x, -c.y);
}

// Draw a crosshair cursor dot at the rounded hex position under the mouse.
function drawCursorDot() {
  let roundedM = hexToRect(round(m.hc.up * 2) / 2, round(m.hc.left * 2) / 2, 0);
  strokeWeight(0.3);
  stroke(0);
  point(roundedM.x, roundedM.y);
  strokeWeight(0.25);
  stroke(255);
  point(roundedM.x, roundedM.y);
}

// Log the hex coordinate under the mouse on click (useful for finding tile placements)
function mousePressed() {
  // console.log(round(m.x*10000)/10000+", "+round(m.y*10000)/10000);
  console.log(",hexToRect(" + round(m.hc.up * 2) / 2 + "," + round(m.hc.left * 2) / 2 + ",0" + ")," + m.turns + "," + m.reflect);
  //,hexToRect(-2,-6,-1),4,false
}

// E to cycle tile turn, R to toggle reflect (for interactive tile placement)
function keyPressed() {
  if (keyCode === 69) {
    m.turns++;
    m.turns %= 6;
  }
  if (keyCode === 82) {
    m.reflect = !m.reflect;
  }
}
