// coords.js
// Pure coordinate math — no p5 globals except SQRT3 (set in setup()).
// hexToRect uses a three-axis hex coordinate system: up, left, down.
// The constraint up + down = left is NOT enforced; the third axis is free,
// which lets you express tile offsets more naturally.

let SQRT3;

function hexToRect(up, left, down) {
  return {
    x: (up + down) / 2 - left,
    y: (down - up) * SQRT3 / 2
  };
}

function rectToHex(x, y) {
  let up = (-2 * y) / SQRT3;
  let left = (up / 2) - x;
  let down = 0;
  return { up, left, down };
}
