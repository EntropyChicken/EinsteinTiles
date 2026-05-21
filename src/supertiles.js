// supertiles.js
// The recursive supertile engine. drawSuperTile(letter, level, pos, turns, reflect, col)
// draws a supertile of the given type and level by recursively drawing its children.
// At level 0, draws the raw einstein tile(s) for that metatile type.
// Depends on: coords.js, tiles.js

// function drawSuperTile(letter, level = 0, pos = {x:0, y:0}, turns = 0, reflect = false, col){
function drawSuperTile(letter, level = 0, pos = hexToRect(m.hc.up, m.hc.left, 0), turns = m.turns, reflect = m.reflect, col) {
  let angle = turns * PI / 3;
  push();
  translate(pos.x, pos.y);
  if (angle !== 0) rotate(angle);
  if (reflect) scale(-1, 1);


  if (letter == "H") {
    if (level == 0) {
      fill(col || color(255, 0, 255, alpha));
      drawEinsteinTile(hexToRect(1, 0, 0), 1, false, col);
      fill(col || color(255, alpha));
      drawEinsteinTile(hexToRect(1, -1, 1), 2, true, col);
      fill(col || color(255, alpha));
      drawEinsteinTile(hexToRect(1, -1, -2), 4, true, col);
      fill(col || color(255, alpha));
      drawEinsteinTile(hexToRect(-2, -1, -2), 2, true, col);
    }
    else {
      if (level == 1) {
        drawSuperTile("T", level - 1, hexToRect(0, 0, 0), 3, true, col);

        // this one is certain because it needs two right angles jutting outward
        drawSuperTile("H", level - 1, hexToRect(4, 2, 0), 2, false, col);
        drawSuperTile("P", level - 1, hexToRect(-4, 1, 0), 0, false, col);

        drawSuperTile("H", level - 1, hexToRect(-2, 2, 0), 0, false, col);
        drawSuperTile("P", level - 1, hexToRect(5, 4, 0), 2, false, col);

        // interesting ambiguity. i THOUGHT it was the recycling bin pattern but the F metatile at the bottom right (the lower one) implies it's not
        drawSuperTile("H", level - 1, hexToRect(-3, -3, 0), 0, false, col);
        drawSuperTile("P", level - 1, hexToRect(1, -3, 0), 1, false, col);
          // drawSuperTile("H",level-1,hexToRect(-1,-2,0),2,false,col);
          // drawSuperTile("P",level-1,hexToRect(-1,-5,0),4,false,col);

        drawSuperTile("F", level - 1, hexToRect(7, 5, 0), 0, false, col);
        drawSuperTile("F", level - 1, hexToRect(4, -1, 0), 4, false, col);
        drawSuperTile("F", level - 1, hexToRect(-2, -7, 0), 2, false, col);
        drawSuperTile("F", level - 1, hexToRect(-5, -4, 0), 0, false, col); // implies it's not a recycling bin pattern
        drawSuperTile("F", level - 1, hexToRect(-5, 2, 0), 4, false, col);
        drawSuperTile("F", level - 1, hexToRect(1, 5, 0), 2, false, col);
      }
      else if (level == 2) {
        drawSuperTile("T", 1, hexToRect(0, 1, 0), 1, false, col);
        drawSuperTile("H", 1, hexToRect(7, 2, 0), 2, false, col);
        drawSuperTile("H", 1, hexToRect(-5, -7, 0), 0, false, col);
        drawSuperTile("H", 1, hexToRect(-2, 5, 0), 0, false, col);
        drawSuperTile("F", 1, hexToRect(18, 12, 0), 0, false, col);
        drawSuperTile("F", 1, hexToRect(11, -2, 0), 4, false, col);
        drawSuperTile("F", 1, hexToRect(-6, -18, 0), 2, false, col);
        drawSuperTile("F", 1, hexToRect(-13, -11, 0), 0, false, col);
        drawSuperTile("F", 1, hexToRect(-12, 6, 0), 4, false, col);
        drawSuperTile("F", 1, hexToRect(2, 13, 0), 2, false, col);
        drawSuperTile("P", 1, hexToRect(-10, 1, 0), 0, false, col);
        drawSuperTile("P", 1, hexToRect(1, -9, 0), 1, false, col);
        drawSuperTile("P", 1, hexToRect(11, 10, 0), 2, false, col);
      }
    }
  }
  else if (letter == "T") {
    if (level == 0) {
      fill(col || color(0, 255, 0, alpha));
      drawEinsteinTile();
    }
    else {
      drawSuperTile("H", level - 1, hexToRect(0, 0, 0), 0, false, col);

      drawSuperTile("P", level - 1, hexToRect(0, 1, 2), 0, false, col);
      drawSuperTile("P", level - 1, hexToRect(4, 0, 0), 1, false, col);
      drawSuperTile("P", level - 1, hexToRect(3, 3, 0), 2, false, col);

      drawSuperTile("F", level - 1, hexToRect(1, 4, 2), 3, false, col);
      drawSuperTile("F", level - 1, hexToRect(4, 1, 5), 1, false, col);
      drawSuperTile("F", level - 1, hexToRect(5, 2, 0), 5, false, col);
    }
  }
  else if (letter == "P") {
    if (level == 0) {
      fill(col || color(0, 0, 255, alpha));
      drawEinsteinTile(hexToRect(0, 0, 0), 1, true);
      fill(col || color(0, 180, 255, alpha));
      drawEinsteinTile(hexToRect(0, -2, 0), 0, true);
    }
    else {
      // the diagram has two-fold rotational symmetry. it may be the case that you flip this over 180 degrees (would still sit in grid)
      // SHOULD PROBABLY USE THE 180 DEGREES FLIPPED VERSION OF THE CURRENT VERSION BECAUSE IT'S LIKE... NICER... lol

      drawSuperTile("P", level - 1, hexToRect(0, 0, 1), 5, false, col);

      drawSuperTile("H", level - 1, hexToRect(0, 1, 0), 5, false, col);
        // drawSuperTile("H",level-1,hexToRect(1,1,-1),3,false,col);

      drawSuperTile("H", level - 1, hexToRect(-2, -6, -1), 4, false, col);

      drawSuperTile("F", level - 1, hexToRect(3, 0, 0), 0, false, col);
      drawSuperTile("F", level - 1, hexToRect(0, -6, 0), 4, false, col);
      drawSuperTile("F", level - 1, hexToRect(-3, -8, 0), 1, false, col);
      drawSuperTile("F", level - 1, hexToRect(-3, -2, 0), 3, false, col);
      drawSuperTile("F", level - 1, hexToRect(0, 4, 0), 1, false, col);
      drawSuperTile("F", level - 1, hexToRect(3, 6, 0), 4, false, col);

      drawSuperTile("P", level - 1, hexToRect(4, 5, 0), 0, false, col);
      drawSuperTile("P", level - 1, hexToRect(-4, -5, 0), 0, false, col);



      // i thought this would be newer and nicer but it doesn't adapt easily into the F one so use the old version

//       drawSuperTile("P",level-1,hexToRect(0,0,0),2,false,col);

//       // i think this is certain because of F constraints
//       drawSuperTile("H",level-1,hexToRect(-1,-2,0),2,false,col);
//       drawSuperTile("P",level-1,hexToRect(-5,-6,0),3,false,col);
// //       drawSuperTile("H",level-1,hexToRect(-3,-3,0),0,false,col);
// //       drawSuperTile("P",level-1,hexToRect(-5,-4,0),0,false,col);

//       drawSuperTile("H",level-1,hexToRect(0,4,0),1,false,col);
//       drawSuperTile("P",level-1,hexToRect(3,4,0),3,false,col);

//       drawSuperTile("F",level-1,hexToRect(2,1,0),0,false,col);
//       drawSuperTile("F",level-1,hexToRect(-1,-5,0),4,false,col);
//       drawSuperTile("F",level-1,hexToRect(-4,-7,0),1,false,col);

//       drawSuperTile("F",level-1,hexToRect(-4,-1,0),3,false,col);
//       drawSuperTile("F",level-1,hexToRect(-1,5,0),1,false,col);
//       drawSuperTile("F",level-1,hexToRect(2,7,0),4,false,col);
    }
  }
  else if (letter == "F") {
    if (level == 0) {
      fill(col || color(255, 0, 0, alpha));
      drawEinsteinTile(hexToRect(0, 0, 0), 1, true);
      fill(col || color(255, 255, 0, alpha));
      drawEinsteinTile(hexToRect(0, -2, 0), 0, true);
    }
    else {

      // going back to adapt from the old version of P

      drawSuperTile("P", level - 1, hexToRect(0, 0, 1), 5, false, col);

      drawSuperTile("H", level - 1, hexToRect(0, 1, 0), 5, false, col);
        // drawSuperTile("H",level-1,hexToRect(1,1,-1),3,false,col);

      drawSuperTile("H", level - 1, hexToRect(-2, -6, -1), 4, false, col);

      drawSuperTile("F", level - 1, hexToRect(3, 0, 0), 0, false, col);
      drawSuperTile("F", level - 1, hexToRect(0, -6, 0), 4, false, col);
      drawSuperTile("F", level - 1, hexToRect(-1, -8, 0), 2, false, col);
      drawSuperTile("F", level - 1, hexToRect(-3, -2, 0), 3, false, col);
      drawSuperTile("F", level - 1, hexToRect(0, 4, 0), 1, false, col);
      drawSuperTile("F", level - 1, hexToRect(3, 6, 0), 4, false, col);

      drawSuperTile("P", level - 1, hexToRect(4, 5, 0), 0, false, col);
      drawSuperTile("F", level - 1, hexToRect(-4, -5, 0), 0, false, col);


      // wait bruh this actually can't work. i think we need the other version for the oddity to be on the right side (need both outward facing sides of the H to have double-right-angle receivers)

//       drawSuperTile("P",level-1,hexToRect(0,0,0),2,false,col);

//       // i think this is certain because of F constraints
//       // drawSuperTile("H",level-1,hexToRect(-1,-2,0),2,false,col);
//       // drawSuperTile("F",level-1,hexToRect(-5,-4,0),0,false,col);

//       drawSuperTile("H",level-1,hexToRect(-3,-3,0),0,false,col);
//       drawSuperTile("F",level-1,hexToRect(-5,-4,0),0,false,col);

//       drawSuperTile("H",level-1,hexToRect(0,4,0),1,false,col);
//       drawSuperTile("P",level-1,hexToRect(3,4,0),3,false,col);

//       drawSuperTile("F",level-1,hexToRect(2,1,0),0,false,col);
//       drawSuperTile("F",level-1,hexToRect(-1,-5,0),4,false,col);
//       drawSuperTile("F",level-1,hexToRect(-2,-7,0),2,false,col);

//       drawSuperTile("F",level-1,hexToRect(-4,-1,0),3,false,col);
//       drawSuperTile("F",level-1,hexToRect(-1,5,0),1,false,col);
//       drawSuperTile("F",level-1,hexToRect(2,7,0),4,false,col);
    }
  }

  pop();
}
