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
		camera_info.tar = rotateCameraX(camera_info.tar, -1);
	}
	if (keys['ArrowDown']) {
		camera_info.tar = rotateCameraX(camera_info.tar, 1);
	}
	if (keys['ArrowLeft']) {
		camera_info.tar = rotateCameraY(camera_info.tar, 1);
	}
	if (keys['ArrowRight']) {
		camera_info.tar = rotateCameraY(camera_info.tar, -1);
	}
	Entities[0].pos = camera_info.tar;
	//The camera's target will be the entity's position
	
	//Adjust Camera's position
	//camera_info.pos[0] += (camera_info.tar[0] - camera_info.pos[0]) * 0.05;
	//camera_info.pos[1] += (camera_info.tar[1] - camera_info.pos[1]) * 0.05;
}
