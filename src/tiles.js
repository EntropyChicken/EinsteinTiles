// tiles.js
// The 13-vertex einstein ("hat") tile shape, and primitive draw helpers.
// Depends on: coords.js (hexToRect, SQRT3)

// The hat tile is defined as a polygon in hex-rect space.
// Each vertex is a hexToRect call, computed once in setup() after SQRT3 is ready.
let einsteinVertices = [];

function initEinsteinVertices() {
  einsteinVertices = [
    hexToRect(1, 0, 0),
    hexToRect(1, 0, -0.5),
    hexToRect(1, 1, 0),
    hexToRect(1, 1.5, 1),

    hexToRect(0, 1, 0),
    hexToRect(-0.5, 1, 0),
    hexToRect(1, 2, 2),

    hexToRect(0, 0, 0.5),
    hexToRect(0, 0, 1),
    hexToRect(0, -1, 1),
    hexToRect(0.5, -1, 1),
    hexToRect(1, 0, 1),
    hexToRect(2, 0.5, 1)
  ];
}

// Draw a single einstein tile at pos, rotated by turns*60°, optionally reflected.
// pos defaults to origin; turns and reflect are optional.
function drawEinsteinTile(pos = { x: 0, y: 0 }, turns = 0, reflect = false) {
  let angle = turns * PI / 3;
  push();
  translate(pos.x, pos.y);
  if (angle !== 0) rotate(angle);
  if (reflect) scale(-1, 1);
  beginShape();
  for (let i = 0; i < einsteinVertices.length; i++) {
    vertex(einsteinVertices[i].x, einsteinVertices[i].y);
  }
  endShape(CLOSE);
  pop();
}

// Draw a regular hexagon centered at a (hex-rect point).
function drawHexagon(a) {
  push();
  translate(a.x, a.y);
  beginShape();
  vertexAt(hexToRect(1, 0, 0));
  vertexAt(hexToRect(1, 1, 0));
  vertexAt(hexToRect(0, 1, 0));
  vertexAt(hexToRect(0, 1, 1));
  vertexAt(hexToRect(0, 0, 1));
  vertexAt(hexToRect(1, 0, 1));
  endShape(CLOSE);
  pop();
}

// Shorthand: call vertex() with a hex-rect point.
function vertexAt(a) {
  vertex(a.x, a.y);
}

// Shorthand: call translate() to a hex-rect point.
function translateBy(a) {
  translate(a.x, a.y);
}

// --- Grid drawing helpers ---

function drawFullGrid() {
  for (let i = -10; i < 10; i++) {
    beginShape();
    vertexAt(hexToRect(0, i, -10));
    vertexAt(hexToRect(0, i, 10));
    endShape();
    beginShape();
    vertexAt(hexToRect(-10, i, 0));
    vertexAt(hexToRect(10, i, 0));
    endShape();
    beginShape();
    vertexAt(hexToRect(i, -10, 0));
    vertexAt(hexToRect(i, 10, 0));
    endShape();

    beginShape();
    vertexAt(hexToRect(10, i + 0.5, -10));
    vertexAt(hexToRect(-10, i + 0.5, 10));
    endShape();
    beginShape();
    vertexAt(hexToRect(-10, 10, i + 0.5));
    vertexAt(hexToRect(10, -10, i + 0.5));
    endShape();
    beginShape();
    vertexAt(hexToRect(i + 0.5, -10, 10));
    vertexAt(hexToRect(i + 0.5, 10, -10));
    endShape();

    beginShape();
    vertexAt(hexToRect(10, i, -10));
    vertexAt(hexToRect(-10, i, 10));
    endShape();
    beginShape();
    vertexAt(hexToRect(-10, 10, i));
    vertexAt(hexToRect(10, -10, i));
    endShape();
    beginShape();
    vertexAt(hexToRect(i, -10, 10));
    vertexAt(hexToRect(i, 10, -10));
    endShape();
  }
}

function drawSplitterGrid() {
  for (let i = -10; i < 10; i++) {
    beginShape();
    vertexAt(hexToRect(10, 1.5 * i - 1, -10));
    vertexAt(hexToRect(-10, 1.5 * i - 1, 10));
    endShape();
    beginShape();
    vertexAt(hexToRect(-10, 10, 1.5 * i - 1));
    vertexAt(hexToRect(10, -10, 1.5 * i - 1));
    endShape();
    beginShape();
    vertexAt(hexToRect(1.5 * i - 1, -10, 10));
    vertexAt(hexToRect(1.5 * i - 1, 10, -10));
    endShape();
  }
}

function drawHexTiling() {
  for (let y = -10; y < 10; y++) {
    for (let x = -10; x < 10; x++) {
      drawHexagon(hexToRect(y, -x - 1, x - y));
    }
  }
}
