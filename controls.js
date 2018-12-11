//Add Event Listeners
keys = {};
document.addEventListener('keydown', function(e) {
	keys[e.code] = true;
	//Toggle the SWARM
	if (e.code == "Space") {
		if (swarming) {
			swarming = false;
		} else {
			swarming = true;
		}
	}
});
document.addEventListener('keyup', function(e) {
	keys[e.code] = false;
});

//Update all of the User-Control Operations
function update() {
	if (keys['ArrowUp']) {
		camera_info.rot[0] -= 1;
	}
	if (keys['ArrowDown']) {
		camera_info.rot[0] += 1;
	}
	if (keys['ArrowLeft']) {
		camera_info.rot[1] += 1;
	}
	if (keys['ArrowRight']) {
		camera_info.rot[1] -= 1;
	}
	if (keys['ShiftLeft']) {
		camera_info.pos = [0,-3,0];
		Entities[0].pos = [0.5,-3.3,0.5];
	} else {
		camera_info.pos = [0,0,0];
		Entities[0].pos = [0.5,-0.3,0.5];
	}
	//Stops the Camera from rotating fully about the X axis (no sumersaults for you)
	camera_info.rot = enforcePerspectiveRestraint(camera_info.rot);
	
	camera_info.tar = rotateCameraX([0,0,3], camera_info.rot[0]);
	camera_info.tar = rotateCameraY(camera_info.tar, camera_info.rot[1]);
	
	//Render a Random ghost at the spot we're looking at
	//Entities[3].pos = camera_info.tar;

	//Make the Flashlight move
	//Entities[0].rot = camera_info.rot;

	//These things happen 60 times every second
	Entities[1].rot[0] -= 1;
	//Entities[3].rot[1] += 1;
	//Entities[4].rot[1] += 1;
}
