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
	//Stops the Camera from rotating fully about the X axis (no sumersaults for you)
	camera_info.rot = enforcePerspectiveRestraint(camera_info.rot);
	
	camera_info.tar = rotateCameraX([0,0,5], camera_info.rot[0]);
	camera_info.tar = rotateCameraY(camera_info.tar, camera_info.rot[1]);
	
	//Render a Random ghost at the spot we're looking at
	Entities[0].pos = camera_info.tar;
}
