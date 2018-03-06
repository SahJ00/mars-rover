// Rover Object Goes Here
// ======================
var roverRobot = {
	direction : "N", 
	position : [0,0],
	temPosition : [0,0],
};
// ====================== 
// createMap
// ====================== 
var map = {
	grid : createMap(10, 10, 0), 
};
// createObstacle on the map
var obstacles = {
  obstaclesPosition: [Math.floor((Math.random() * 9) + 1), Math.floor((Math.random() * 10))] // generated randomly but does not affect the [0,0] (rover position)
}

function createMap(rows, cols, initial) {
	var dArray = []; 
	for (var x = 0; x < rows; x = x + 1){
		var columns = [];
		for (var y = 0; y < cols; y = y + 1){
			columns[y] = "["+x+","+y+"]";
		}	
	dArray[x] = columns;
	}
	return dArray;
}

function starMap(){
	map.grid[obstacles.obstaclesPosition[0]][obstacles.obstaclesPosition[1]] = "ROCK";
	map.grid[0][0] = "roverRobot"
	map.rover = '[0,0]';
	map.roverNewPosition = '[0,0]';
	map.roverRobotPx = 0;
	map.roverRobotPy = 0;
	map.roverRobotPxNew = 0;
	map.roverRobotPyNew = 0;
}

function refreshMap() {
	map.grid[map.roverRobotPx][map.roverRobotPy] = map.roverRobot;
	map.grid[map.roverRobotPxNew][map.roverRobotPyNew] = "roverRobot";
	map.roverRobot = map.roverRobotPyNewPosition;
	map.roverRobotPy = map.roverRobotPyNew;
	map.roverRobotPx = map.roverRobotPxNew;
}
// ====================== 
function existObstacle(tempPosition) {
  if ((obstacles.obstaclesPosition[0] === roverRobot.tempPosition[0]) && (obstacles.obstaclesPosition[1] === roverRobot.tempPosition[1])) {
    return true;
  }
  return false;
}





function turnLeft(rover){
  console.log("turnLeft was called!");

}

function turnRight(rover){
  console.log("turnRight was called!");
}

function moveForward(rover){
  console.log("moveForward was called")
}
