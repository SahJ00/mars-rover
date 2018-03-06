// Rover Object Goes Here
// ======================
var roverRobot = {
  position: [0, 0],
  tempPosition: [0, 0],
  direction: "N",
  travel: [],
  command: "",
};
// ======================

// Create the map (GRID)
// ======================
var map = {
  grid: createMap(10, 10, 0),
};

// Create the obstacles on the map
var obstacles = {
  obstaclesPosition: [Math.floor((Math.random() * 9) + 1), Math.floor((Math.random() * 10))] // generated randomly but does not affect the [0,0] (rover position)
}

// a dimensional array is generated, initial is the value at which it begins
function createMap(rows, cols, initial) {
  var matrix = [];
  for (var x = 0; x < rows; x++) {
    var columns = []
    for (var y = 0; y < cols; y++) {
      columns[y] = "[" + x + "," + y + "]";
    }
    matrix[x] = columns;
  }
  return matrix;
}

// place the objects on the map
function startMap() {
  map.grid[obstacles.obstaclesPosition[0]][obstacles.obstaclesPosition[1]] = "ROCK";
  map.grid[0][0] = "Rover";
  map.rover = '[0,0]';
  map.roverNewPosition = '[0,0]';
  map.roverPx = 0;
  map.roverPy = 0;
  map.roverPxNew = 0;
  map.roverPyNew = 0;
}

// update the grid with the new positions
function refreshMap() {
  map.grid[map.roverPx][map.roverPy] = map.rover;
  map.grid[map.roverPxNew][map.roverPyNew] = "Rover";
  map.rover = map.roverNewPosition;
  map.roverPy = map.roverPyNew;
  map.roverPx = map.roverPxNew;
}
// ======================

// Move around the map

// ======================
// Compare the temporary position of the rover with the last (before moving) to know if there are obstacles
function existObstacle(tempPosition) {
  if ((obstacles.obstaclesPosition[0] === roverRobot.tempPosition[0]) && (obstacles.obstaclesPosition[1] === roverRobot.tempPosition[1])) {
    console.log("There are some obstacle");
    return true;
  }
  return false;
}

// function that rotates to the left
function turnLeft(move) {
  if (move === 'l' || move === 'L') {
    if (roverRobot.direction === 'N') {
      roverRobot.direction = 'W';
    }
    else if (roverRobot.direction === 'S') {
      roverRobot.direction = 'E';
    }
    else if (roverRobot.direction === 'E') {
      roverRobot.direction = 'N';
    }
    else if (roverRobot.direction === 'W') {
      roverRobot.direction = 'S';
    }
  }
  console.log("Rovers looks now towards " + roverRobot.direction);
}

// function that rotates to the right
function turnRight(move) {
  if (move === 'r' || move === 'R') {
    if (roverRobot.direction === 'N') {
      roverRobot.direction = 'E';
    }
    else if (roverRobot.direction === 'S') {
      roverRobot.direction = 'W';
    }
    else if (roverRobot.direction === 'E') {
      roverRobot.direction = 'S'; roverRobot
    }
    else if (roverRobot.direction === 'W') {
      roverRobot.direction = 'N';
    }
  }
  console.log("Rovers looks now towards " + roverRobot.direction);
}

// function that moves forward or backward
function moveForward(move) {
  var posx = 0, posy = 0;
  //move forward
  if (move === 'f' || move === 'F') {
    if (roverRobot.direction === "N") {
      posx = -1;
    }
    if (roverRobot.direction === "S") {
      posx = 1;
    }
    if (roverRobot.direction === "E") {
      posy = 1;
    }
    if (roverRobot.direction === "W") {
      posy = -1;
    }
  }
  // move backward
  if (move === 'b' || move === 'B') {
    if (roverRobot.direction === "N") {
      posx = 1;
    }
    if (roverRobot.direction === "S") {
      posx = -1;
    }
    if (roverRobot.direction === "E") {
      posy = -1;
    }
    if (roverRobot.direction === "W") {
      posy = 1;
    }
  }
  // the grid is controlled x
  if (roverRobot.position[0] == 9 && posx == 1) {
    //roverRobot.tempPosition[0] = 0;
    console.log("you leave the map, you should select another path [" + roverRobot.position[0] + "," + roverRobot.position[1] + "]");
  } else if (roverRobot.position[0] == 0 && posx == -1) {
    //roverRobot.tempPosition[0] = 9;
    console.log("you leave the map, you should select another path [" + roverRobot.position[0] + "," + roverRobot.position[1] + "]");
  } else {
    roverRobot.tempPosition[0] += posx;
  }
  // the grid is controlled y
  if (roverRobot.position[1] == 9 && posy == 1) {
    //roverRobot.tempPosition[1] = 0;
    console.log("you leave the map, you should select another path [" + roverRobot.position[0] + "," + roverRobot.position[1] + "]");
  } else if (roverRobot.position[1] == 0 && posy == -1) {
    //roverRobot.tempPosition[1] = 9;
    console.log("you leave the map, you should select another path [" + roverRobot.position[0] + "," + roverRobot.position[1] + "]");
  } else {
    roverRobot.tempPosition[1] += posy;
  }
  // update the var to update the positions
  if (existObstacle(roverRobot.tempPosition)) {
    return false;
  } else {
    roverRobot.position[0] = roverRobot.tempPosition[0];
    roverRobot.position[1] = roverRobot.tempPosition[1];
    map.roverPxNew = roverRobot.position[0];
    map.roverPyNew = roverRobot.position[1];
    map.roverNewPosition = "[" + roverRobot.position[0] + "," + roverRobot.position[1] + "]";
    roverRobot.travel.push(map.roverNewPosition);
    return true;
  }
}

// function to control movements
function verifyMoves(command) {
  if (command === undefined || command == "") {
  } else if (command === null) {
    return false;
  } else {
    for (var i = 0; i < command.length; i++) {
      if ((command[i] != "F" || command[i] != "f") && (command[i] != "B" || command[i] != "b") && (command[i] != "L" || command[i] != "l") && (command[i] != "R" || command[i] != "r")) {
        console.log("Please , use the roverMove() to move to rover. Example: roverMove('fffrf')\n f: forward \n b: back \n l: left\n r: right");
      }
    }
    return true;
  }
}
// function to move rovers
function roverMove(moves) {
  if (!verifyMoves(moves)) {
    return false;
  } else {
    roverRobot.command = moves;
    //console.log(roverRobot.command);
  }
  for (var i = 0; i < moves.length; i++) {
    var instruction = moves[i];
    if (instruction === "F" || instruction === "f" || instruction === "B" || instruction === "b") {
      if (!moveForward(instruction)) {
        break;
      }
    } else if (instruction === "L" || instruction === "l") {
      turnLeft(instruction);
    } else if (instruction === "R" || instruction === "r") {
      turnRight(instruction);
    }
  }
  refreshMap();
  printOutPut();
  return true;
}
// ======================

// print the data

// ======================
function printOutPut() {
  console.log("Block position : [" + obstacles.obstaclesPosition[0] + "," + obstacles.obstaclesPosition[1] + "]");
  console.log("rovers travel : " +  roverRobot.travel);
  console.log("------");
  console.log("The grid Map :\n" + map.grid);
}
// ======================

startMap();
console.log("Please , use the roverMove() to move to rover. Example: roverMove('fffrf')\n f: forward \n b: back \n l: left\n r: right");
printOutPut();