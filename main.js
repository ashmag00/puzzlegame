//Initialize stuff
canvas = document.getElementById("c");
const gl = canvas.getContext("webgl");
const programInfo = twgl.createProgramInfo(gl, ["vs", "fs"]);


//Create the Entity Class
class Entity {
	constructor(pbuffer, pscale, ptranslate, protation, pcolor) {
		this.buffer = pbuffer;
		this.scale = pscale;
		this.pos = ptranslate;
		this.color = pcolor;
		this.rot = protation;
	}
	
	render(pview_matrix, pproj_matrix) {
		/*
		var uniforms = {
			scale: this.scale,
			translate: this.pos,
			color: this.color
		}/**/
		var uniforms = {
			view_matrix: pview_matrix,
			proj_matrix: pproj_matrix,
			model_matrix: model_matrix(this),
			color: this.color
		}
		
		twgl.setBuffersAndAttributes(gl, programInfo, this.buffer);
		twgl.setUniforms(programInfo, uniforms);
		twgl.drawBufferInfo(gl, this.buffer);
	}
	/* Use instead of render for 2D (also adjust index.html file)
	basicrender() {
		var uniforms = {
			scale: this.scale,
			translate: this.pos,
			color: this.color
		}
		
		twgl.setBuffersAndAttributes(gl, programInfo, this.buffer);
		twgl.setUniforms(programInfo, uniforms);
		twgl.drawBufferInfo(gl, this.buffer);
	}/**/
};

function model_matrix(entity) {
	var T = m4.translation(entity.pos[0], entity.pos[1], entity.pos[2]);
	var S = m4.scaling(entity.scale, entity.scale, entity.scale);
	var Rx = m4.xRotation(entity.rot[0]);
	var Ry = m4.yRotation(entity.rot[1]);
	var Rz = m4.zRotation(entity.rot[2]);
	var R = m4.multiply(Rz, m4.multiply(Rx, Ry))
	return m4.multiply(T, m4.multiply(R, S));
}

//Finish Importing Entities
//new Entity(buffer, scale, position, rotation, color)
const ghost_buffer = ghost_generate(gl, twgl);
Entities = [
	//new Entity(pacman_generate(gl, twgl), .25, [-0.5, 0, 0], [1, 1, 0]),
	new Entity(ghost_buffer, 0.25, [0, 0, 5], [0,0,0], [1, 0, 1]),
	new Entity(ghost_buffer, 0.25, [0, 0, 5], [0,0,0], [0, 0, 1]),
	new Entity(ghost_buffer, 0.25, [0, 0, 5], [0,0,0], [0, 1, 1]),
	new Entity(ghost_buffer, 0.25, [0, 0, 5], [0,0,0], [0, 1, 0]),
	new Entity(ghost_buffer, 0.25, [0, 0, 5], [0,0,0], [1, 1, 0]),
	new Entity(ghost_buffer, 0.25, [0, 0, 5], [0,0,0], [1, 0, 0])
];
Walls = [
	new Entity(pellet_generate(gl, twgl), 10, [ 5, 0, 0], [0,180,0], [1, 1, 1]),
	new Entity(pellet_generate(gl, twgl), 10, [-5, 0, 0], [0,180,0], [1, 1, 1]),
	new Entity(pellet_generate(gl, twgl), 10, [ 0, 5, 0], [0,0,0], [1, 1, 1]),
	new Entity(pellet_generate(gl, twgl), 10, [ 0,-5, 0], [0,0,0], [1, 1, 1]),
	new Entity(pellet_generate(gl, twgl), 10, [ 0, 0, 5], [0,0,0], [1, 1, 1]),
	new Entity(pellet_generate(gl, twgl), 10, [ 0, 0,-5], [0,0,0], [1, 1, 1])
]
	
//Add Event Listeners
keys = {};
document.addEventListener('keydown', function(e) {
	keys[e.code] = true;
});
document.addEventListener('keyup', function(e) {
	keys[e.code] = false;
});
	
// Specialized Variables
var controlIndex = Entities.length-1;
camera_info = {
	pos: [0,0,0],
	tar: [0,0,5],
	up: [0,1,0],
	fov: 60 * 3.14 / 180,
	zNear: 0.1,
	zFar: 100
};
	



//Start with the Actual Code
function main_game_loop() {
	update();
	render();
	requestAnimationFrame(main_game_loop);
}

//Update all of the User-Control Operations
function update() {
	
	if (keys['ArrowLeft']) {
		camera_info.tar[0] += 0.05;
	}
	if (keys['ArrowRight']) {
		camera_info.tar[0] -= 0.05;
	}
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
		Entities[controlIndex].pos[2] += 0.05;
	}
	if (keys['KeyJ']) {
		Entities[controlIndex].pos[2] -= 0.05;
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
	
	/*
	if (keys['Space']) {
		controlIndex -= 1;
		if (controlIndex < 0) {
			controlIndex = Entities.length - 1;
		}
		keys['Space'] = false;
	}/**/
	//The camera's target will be the entity's position
	//camera_info.tar = Entities[controlIndex].pos;
	
	//Adjust Camera's position
	//camera_info.pos[0] += (camera_info.tar[0] - camera_info.pos[0]) * 0.05;
	//camera_info.pos[1] += (camera_info.tar[1] - camera_info.pos[1]) * 0.05;
}

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

	
	Walls.forEach(function(entity, index, array) {
		entity.render(view_matrix, proj_matrix);
	});/**/
	Entities.forEach(function(entity, index, array) {
		entity.render(view_matrix, proj_matrix);
	});
	
	
}
/**/
//Start everything.
main_game_loop()
