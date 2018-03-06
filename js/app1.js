var moves = "";

// Rover Object Goes Here
// ======================
var roverRobot = {
  position: [0, 0],
  tempPosition: [0, 0],
  direction: "N",
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

function createMap(rows, cols, initial) { // a dimensional array is generated, initial is the value at which it begins
  var dArray = [];
  for (var x = 0; x < rows; x++) {
    var columns = []
    for (var y = 0; y < cols; y++) {
      columns[y] = "[" + x + "," + y + "]";
    }
    dArray[x] = columns;
  }
  return dArray;
}

function startMap() { // place the objects on the map
  map.grid[obstacles.obstaclesPosition[0]][obstacles.obstaclesPosition[1]] = "ROCK";
  //map.grid[0][0] = "Rover";
  map.rover = '[0,0]';
  map.roverNewPosition = '[0,0]';
  map.roverPx = 0;
  map.roverPy = 0;
  map.roverPxNew = 0;
  map.roverPyNew = 0;
}

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
    return true;
  }
  return false;
}
function roverMove(moves) {
  if (!verifyMoves(moves)) {
    return false;
  } else {
    roverRobot.command = moves;
    console.log(roverRobot.command);
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
  return true;
}
function verifyMoves(command) {
  if (command === undefined || command == "") {
    //console.log("Please , enter the rover moves, in format 'f b l r'. Exampl: fffrfflfffbb\n f:forward \n b: back \n l: left\n r:right");
  } else if (command === null) {
    return false;
  } else {
    for (var i = 0; i < command.length; i++) {
      if ((command[i] != "F" || command[i] != "f") && (command[i] != "B" || command[i] != "b") && (command[i] != "L" || command[i] != "l") && (command[i] != "R" || command[i] != "r")) {
        //console.log("Please , enter the rover moves, in format 'f b l r'. Exampl: fffrfflfffbb\n f:forward \n b: back \n l: left\n r:right");
      }
    }
    return true;
  }
}


function turnLeft(move) {
  if (move === 'l') {
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
}

function turnRight(move) {
  if (move === 'r') {
    if (roverRobot.direction === 'N') {
      roverRobot.direction = 'E';
    }
    else if (roverRobot.direction === 'S') {
      roverRobot.direction = 'W';
    }
    else if (roverRobot.direction === 'E') {
      roverRobot.direction = 'S';roverRobot
    }
    else if (roverRobot.direction === 'W') {
      roverRobot.direction = 'N';
    }
  }
}

function moveForward(move) {
  var posx = 0, posy = 0;

  if (roverRobot.direction === "N" || roverRobot.direction === "n") {
    posx = 1;
  }
  if (roverRobot.direction === "S" || roverRobot.direction === "s") {
    posx = -1;
  }
  if (roverRobot.direction === "E" || roverRobot.direction === "e") {
    posy = 1;
  }
  if (roverRobot.direction === "W" || roverRobot.direction === "w") {
    posy = -1;
  }
  if (roverRobot.position[0] == 9 && posx == 1) {
    roverRobot.tempPosition[0] = 0;
  } else if (roverRobot.position[0] == 9 && posx == -1) {
    roverRobot.tempPosition[0] = 9;
  } else {
    roverRobot.tempPosition[0] += posx;
  }
  if (roverRobot.position[1] == 9 && posy == 1) {
    roverRobot.tempPosition[1] = 0;
  } else if (roverRobot.position[1] == 9 && posy == -1) {
    roverRobot.tempPosition[1] = 9;
  } else {
    roverRobot.tempPosition[1] += posy;
  }
  if (existObstacle(roverRobot.tempPosition)) {
    return false;
  } else {
    roverRobot.position[0] = roverRobot.tempPosition[0];
    roverRobot.position[1] = roverRobot.tempPosition[1];
    map.roverPxNew =roverRobot.position[0];
    map.roverPyNew =roverRobot.position[1];
    map.roverNewPosition= "[" + roverRobot.position[0] + "," + roverRobot.position[1] + "]";
    return true;
  }
}

// ======================

// Print result
// ======================

function printOutPut() {
  console.log("Last rover position : [" + roverRobot.position[0] + ", " + roverRobot.position[1] + "]");
  console.log("Block position : [" + obstacles.obstaclesPosition[0] + "," + obstacles.obstaclesPosition[1] + "]");
  if (roverRobot.command === undefined) {
    console.log("Command : No command introduced");
  }
  else {
    console.log("Command :" + roverRobot.command);
  }
  console.log("------");
  if (roverMove()) {
    console.log("Final rover position: [" + roverRobot.position[0] + ", " + roverRobot.position[1] + "]");
    refreshMap();
    console.log("The grid Map :\n" + map.grid);
    console.log("------");

  }
}


// ======================

startMap();
console.log("The Initial grid Map :\n" + map.grid);
printOutPut();