//Finish Importing Entities
//new Entity(buffer, scale, position, rotation)

// NOTE ON TEXTURES (GABE): I deleted the color parameter for Entity!
const ghost_buffer = ghost_generate(gl, twgl);
Entities = [
	//new Entity(ghost_buffer, 0.25, [0, 0, 4], [0,0,0]),
	//new Entity(ghost_buffer, 0.25, [0, 0, 4], [0,0,0]),
	//new Entity(ghost_buffer, 0.25, [0, 0, 4], [0,0,0]),
	//new Entity(ghost_buffer, 0.25, [0, 0, 4], [0,0,0]),
	//new Entity(ghost_buffer, 0.25, [0, 0, 4], [0,0,0]),
	new Entity(ghost_buffer, 0.25, [0, 0, 4], [0,0,0])
];
Walls = [
	new Entity(pellet_generate(gl, twgl), 10, [ 4, 0, 0], [0,90,0]),
	new Entity(pellet_generate(gl, twgl), 10, [-4, 0, 0], [0,-90,0]),
	new Entity(pellet_generate(gl, twgl), 10, [ 0, 4, 0], [-90,0,0]),
	new Entity(pellet_generate(gl, twgl), 10, [ 0,-4, 0], [90,0,0]),
	new Entity(pellet_generate(gl, twgl), 10, [ 0, 0, 4], [0,0,0]),
	new Entity(pellet_generate(gl, twgl), 10, [ 0, 0,-4], [0,0,180])
]

var controlIndex = Entities.length-1;
camera_info = {
	pos: [0,0,0],
	tar: [0,0,5],
	up: [0,1,0],
	fov: 60 * Math.PI / 180,
	zNear: 0.1,
	zFar: 100
};

//Render all Entities
function render() {
	twgl.resizeCanvasToDisplaySize(gl.canvas);
	gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
	
	//Create the matrixes
	const aspect = canvas.clientWidth / canvas.clientHeight;
	const view_matrix = m4.inverse(m4.lookAt(camera_info.pos, camera_info.tar, camera_info.up));
	const proj_matrix = m4.perspective(camera_info.fov, aspect, camera_info.zNear, camera_info.zFar);
	
	//What do these do?
	gl.useProgram(programInfo.program);
	gl.disable(gl.CULL_FACE);
	gl.enable(gl.DEPTH_TEST);

	
	Walls.forEach(function(entity, index, array) {
		entity.render(view_matrix, proj_matrix);
	});/**/
	Entities.forEach(function(entity, index, array) {
		entity.render(view_matrix, proj_matrix);
	});
	
	
}
