//Finish Importing Entities
//new Entity(buffer, scale, position, rotation)

// NOTE ON TEXTURES (GABE): I deleted the color parameter for Entity!


//List of all Entities
//Keep the Flashlight as "Entities[0]"
Entities = [
	new Entity(flashlight_generate(gl, twgl), 0.2, [0.5,-0.3,0.3], [0,0,0], "./textures/flashlight.jpeg"),
	new Entity(vase_generate(gl, twgl), 0.2, [-0.25,-2,3], [0,-90,-90], "./textures/vase.jpg"),
	new Entity(Table_generate(gl, twgl), 0.5, [0,-2.25,3], [90,90,90], "./textures/photos_2018_4_23_fst_rough-planks-texture-raw.jpg"),
	//new Entity(ghost_generate(gl, twgl), 0.25, [-0.25,-1.25,3], [0,0,0],"./textures/flashlight.jpeg"),
	//new Entity(ghost_generate(gl, twgl), 0.25, [-0.25,-1.25,3], [0,90,0],"./textures/flashlight.jpeg"),
	
	new Entity(shelf_generate(gl, twgl), 0.3, [4.6,-0.5,2], [0,-90,-90], "./textures/shelf.jpg"),
	new Entity(shelf_generate(gl, twgl), 0.3, [4.6,-0.5,0], [0,-90,-90], "./textures/shelf.jpg"),
	new Entity(shelf_generate(gl, twgl), 0.3, [4.6,-0.5,-2], [0,-90,-90], "./textures/shelf.jpg"),
	new Entity(shelf_generate(gl, twgl), 0.3, [2,-0.5,4.6], [90,180,0], "./textures/shelf.jpg")
];
flashlight = Entities[0];
//Building Structure
Walls = [
	//new Entity(pellet_generate(gl, twgl), 1, [ 4, 0, 0], [0,90,0], "./textures/photos_2018_4_23_fst_rough-planks-texture-raw.jpg"),
	new Entity(wall_generate(gl, twgl), 2, [  5, 0, 0], [0,0,0],  "./textures/wall.jpeg"),		// LEFT WALL
	new Entity(wall_generate(gl, twgl), 2, [ -5, 0, 0], [0,0,0],  "./textures/wall.jpeg"),		// RIGHT WALL
	new Entity(wall_generate(gl, twgl), 2, [  0, 0, 5], [0,90,0],  "./textures/wall.jpeg"),	// FRONT WALL
	new Entity(wall_generate(gl, twgl), 2, [  0, 0,-5], [0,-90,0],  "./textures/wall.jpeg"),	// BACK WALL
	new Entity(floor_generate(gl, twgl), 1, [  0, 4, 0], [-90,0,0],  "./textures/floor.jpeg"),	// FLOOR	// CEILING
	new Entity(floor_generate(gl, twgl), 1, [  0, -4, 0], [90,0,0],  "./textures/floor.jpeg"),	// FLOOR
]

camera_info = {
	pos: [0,0,0],
	tar: [0,0,0],
	up: [0,1,0],
	fov: 60 * Math.PI / 180,
	zNear: 0.1,
	zFar: 100,
	rot: [0,0,0], //[X-Axis, Y-Axis, Z-Axis] (Z-Axis is irrelevant, except when adopting other objects)
	starttar: [0,0,1], //Where the Target is transformed from
	viewrange: [-89,89] //The degrees of vertical view
};

function forward_dir(flashlight) {
	var m = model_matrix(flashlight);
	var d = [0,0,1];
	var dt = m4.transformDirection(m, d);
	return twgl.v3.normalize(dt);
}

//Render all Entities
function render() {
	twgl.resizeCanvasToDisplaySize(gl.canvas);
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
	
	//Create the matrixes
	const aspect = canvas.clientWidth / canvas.clientHeight;
	const view_matrix = m4.inverse(m4.lookAt(camera_info.pos, camera_info.tar, camera_info.up));
	const proj_matrix = m4.perspective(camera_info.fov, aspect, camera_info.zNear, camera_info.zFar);
	
	gl.useProgram(programInfo.program); //???
	gl.disable(gl.CULL_FACE); //Renders both sides of an object
	gl.enable(gl.DEPTH_TEST); //Registers which objects are closer or further away
	
	//Flashlight
	var view_direction = twgl.v3.subtract(camera_info.tar, camera_info.pos);
	var view_direction = twgl.v3.normalize(view_direction);
	
	//Flashlight
	// the light's origin is near the center of the flashlight.
	// need to "push" the light_position forward just a bit, so
	// that the flashlight does not illuminate itself
	var light_direction = forward_dir(flashlight);
	var light_position = twgl.v3.add(flashlight.pos, twgl.v3.mulScalar(light_direction, 0.25));
	
	//Flashlight
	var uniforms = {
		view_matrix: view_matrix,
		proj_matrix: proj_matrix,
		view_position: camera_info.pos,
		light_position: light_position,
		light_direction: light_direction,
		light_cosangle: Math.cos(30 * Math.PI / 180),
		light_bright: 5.0,
		//light_direction: view_direction,
		light_ambient: 0.1,
	}
	twgl.setUniforms(programInfo, uniforms);

	Walls.forEach(function(entity, index, array) {
		entity.render(view_matrix, proj_matrix);
	});
	Entities.forEach(function(entity, index, array) {
		entity.render(view_matrix, proj_matrix);
	});
	if (swarming) {
		moveSWARM();
	} else {
		movehome();
	}
	SWARM.forEach(function(ghost, index, array) {
		ghost.render(view_matrix, proj_matrix);
	});/**/
	
	
}
