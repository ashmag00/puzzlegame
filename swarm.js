
//Initialize the SWARM
//Shhhhhhh.... ;)
SWARM = [];
for (i = 0; i < 50; i++) {
	SWARM.push(new Entity(ghost_generate(gl, twgl), 0.2, [-0.25,-2,3], [0,0,0],"./textures/flashlight.jpeg"))
}

swarming = false;
SWARM.forEach(function(ghost, index, array) {
		ghost.dir = randomVec3();
		//ghost.pos = [ghost.pos[0]*-10,ghost.pos[1]*-10,ghost.pos[2]*-10]
});
function randomVec3() {
	var vec3 = [
		(Math.random()-0.5)*0.1,
		(Math.random()-0.5)*0.1,
		(Math.random()-0.5)*0.1
	]
	return vec3;
}

//Make the swarm move
function moveSWARM() {
	SWARM.forEach(function(ghost, index, array) {
		move(ghost, 1);
	});
}
function move(ghost, dir) {
	ghost.pos[0] += ghost.dir[0]*dir;
	ghost.pos[1] += ghost.dir[1]*dir;
	ghost.pos[2] += ghost.dir[2]*dir;
	ghost.rot[1] += ghost.dir[1]*90*dir;
		
	if (distance(ghost, [0,0,0]) > 9) {
		ghost.pos = [ghost.pos[0]*-1,ghost.pos[1]*-1,ghost.pos[2]*-1]
	}
}
function movehome() {
	SWARM.forEach(function(ghost, index, array) {
		if (!home(ghost)) {
			move(ghost, -1);
			move(ghost, -1);
		}
	});
}
function home(ghost) {
	if (distance(ghost, [-0.25,-2,3]) < .25) {
		ghost.pos = [-0.25,-2,3];
		return true;
	}
	return false;
}
function distance(ghost, point) {
	return Math.sqrt(Math.pow((ghost.pos[0]-point[0]), 2) + Math.pow((ghost.pos[1]-point[1]), 2) + Math.pow((ghost.pos[2]-point[2]), 2));
}
