//Add Event Listeners
keys = {};
document.addEventListener('keydown', function(e) {
	keys[e.code] = true;
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
		Entities[0].pos = [1,-3.5,1];
	} else {
		camera_info.pos = [0,0,0];
		Entities[0].pos = [1,-1.5,1];
	}
	//Stops the Camera from rotating fully about the X axis (no sumersaults for you)
	camera_info.rot = enforcePerspectiveRestraint(camera_info.rot);
	
	camera_info.tar = rotateCameraX([0,0,3], camera_info.rot[0]);
	camera_info.tar = rotateCameraY(camera_info.tar, camera_info.rot[1]);

	//Entities[0].rot = rotateCameraX([0,0,3], camera_info.rot[0]);
	//Entities[0].rot = rotateCameraY(Entities[2].rot, camera_info.rot[1]);
	
	//Render a Random ghost at the spot we're looking at
	//Entities[3].pos = camera_info.tar;

	//Make the Flashlight move
	//console.log(camera_info.rot);
	Entities[0].rot = camera_info.rot;
	Entities[1].rot[0] += 1;
	Entities[3].rot[1] += 1;
	Entities[4].rot[1] += 1;
	//Entities[0].pos = camera_info.tar;
	//Entities[0].pos = translationVec3(camera_info.tar, [0.5,-0.3,-2.5]);
}
