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
	/* else if (e.code == 'ShiftLeft') {
		camera_info.pos = [0,-3,0];
		Entities[0].pos = [0.5,-3.3,0.3];
	}*/
});
document.addEventListener('keyup', function(e) {
	keys[e.code] = false;
	if (e.code == 'ControlRight' || e.code == 'ControlLeft' || e.code == 'ShiftLeft') {
		camera_info.pos = [0,0,0];
		Entities[0].pos = [0.5,-0.3,0.3];
	}
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
	
	/*
	if (keys['KeyW']) {
		flashlight.rot[0] -= 1;
	}
	if (keys['KeyS']) {
		flashlight.rot[0] += 1;
	}
	if (keys['KeyA']) {
		flashlight.rot[1] += 1;
	}
	if (keys['KeyD']) {
		flashlight.rot[1] -= 1;
	}*/
	
	//Stops the Camera from rotating fully about the X axis (no sumersaults for you)
	camera_info.rot = enforcePerspectiveRestraint(camera_info.rot);
	
	camera_info.tar = rotateCameraX(camera_info.starttar, camera_info.rot[0]);
	camera_info.tar = rotateCameraY(camera_info.tar, camera_info.rot[1]);

	//Make the Flashlight move
	//flashlight.rot = camera_info.rot;
	//flashlight.rot = enforcePerspectiveRestraint(flashlight.rot);
	//flashlight.tar = rotateCameraX(camera_info.starttar, flashlight.rot[0]);
	//flashlight.tar = rotateCameraY(flashlight.tar, flashlight.rot[1]);
	//flashlight.rot = LookAt(flashlight.pos, camera_info.tar);
	//console.log(LookAt(flashlight.pos, camera_info.tar));

	//These things happen 60 times every second
	Entities[0].rot[0] -= 1;
}
