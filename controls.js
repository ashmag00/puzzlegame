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
	
	if (keys['KeyW']) {
		camera_info.pos[2] += 0.05;
	}
	if (keys['KeyS']) {
		camera_info.pos[2] -= 0.05;
	}
	if (keys['KeyA']) {
		camera_info.pos[0] += 0.05;
	}
	if (keys['KeyD']) {
		camera_info.pos[0] -= 0.05;
	}
	if (keys['Space']) {
		camera_info.pos[1] += 0.05;
	}
	if (keys['ShiftLeft']) {
		camera_info.pos[1] -= 0.05;
	}/**/
	/*
	if (keys['ArrowUp']) {
		Entities[controlIndex].pos[1] += 0.05;
	}
	if (keys['ArrowDown']) {
		Entities[controlIndex].pos[1] -= 0.05;
	}
	if (keys['ArrowLeft']) {
		Entities[controlIndex].pos[0] += 0.05;
	}
	if (keys['ArrowRight']) {
		Entities[controlIndex].pos[0] -= 0.05;
	}
	if (keys['KeyM']) {
		Entities[controlIndex].pos[2] -= 0.05;
	}
	if (keys['KeyJ']) {
		Entities[controlIndex].pos[2] += 0.05;
	}
	
	if (keys['KeyA']) {
		Entities[controlIndex].rot[2] -= 9;
	}
	if (keys['KeyD']) {
		Entities[controlIndex].rot[2] += 9;
	}
	if (keys['KeyW']) {
		Entities[controlIndex].rot[0] += 9;
	}
	if (keys['KeyS']) {
		Entities[controlIndex].rot[0] -= 9;
	}
	
	
	if (keys['Space']) {
		controlIndex -= 1;
		if (controlIndex < 0) {
			controlIndex = Entities.length - 1;
		}
		keys['Space'] = false;
	}/**/
	//The camera's target will be the entity's position
	camera_info.tar = Entities[controlIndex].pos;
	
	//Adjust Camera's position
	//camera_info.pos[0] += (camera_info.tar[0] - camera_info.pos[0]) * 0.05;
	//camera_info.pos[1] += (camera_info.tar[1] - camera_info.pos[1]) * 0.05;
}
