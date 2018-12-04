//Initialize stuff
canvas = document.getElementById("c");
const gl = canvas.getContext("webgl");
const programInfo = twgl.createProgramInfo(gl, ["vs", "fs"]);


//Create the Entity Class
class Entity {
	constructor(pbuffer, pscale, ptranslate, pcolor) {
		this.buffer = pbuffer;
		this.scale = pscale;
		this.pos = ptranslate;
		this.color = pcolor;
		//this.rot_z = 0;
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
	var R = m4.zRotation(0);
	return m4.multiply(T, m4.multiply(R, S));
}

//Finish Importing Entities
const ghost_buffer = ghost_generate(gl, twgl);
Entities = [
	//new Entity(pacman_generate(gl, twgl), .25, [-0.5, 0, 0], [1, 1, 0]),
	new Entity(ghost_buffer, 0.25, [0, 0, 0], [1, 0, 1]),
	new Entity(ghost_buffer, 0.25, [0, 0, 0], [0, 0, 1]),
	new Entity(ghost_buffer, 0.25, [0, 0, 0], [0, 1, 1]),
	new Entity(ghost_buffer, 0.25, [0, 0, 0], [0, 1, 0]),
	new Entity(ghost_buffer, 0.25, [0, 0, 0], [1, 1, 0]),
	new Entity(ghost_buffer, 0.25, [0, 0, 0], [1, 0, 0])
];
	
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
	pos: [0,0,5],
	tar: [0,0,0],
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
	if (keys['ArrowDown']) {
		Entities[controlIndex].pos[1] -= 0.05;
	}
	if (keys['ArrowUp']) {
		Entities[controlIndex].pos[1] += 0.05;
	}
	if (keys['ArrowLeft']) {
		Entities[controlIndex].pos[0] -= 0.05;
	}
	if (keys['ArrowRight']) {
		Entities[controlIndex].pos[0] += 0.05;
	}
	if (keys['Space']) {
		controlIndex -= 1;
		if (controlIndex < 0) {
			controlIndex = Entities.length - 1;
		}
		keys['Space'] = false;
	}
	//The camera's target will be the entity's position
	camera_info.tar = Entities[controlIndex].pos;
	 
	camera_info.pos[0] += (camera_info.tar[0] - camera_info.pos[0]) * 0.05;
	camera_info.pos[1] += (camera_info.tar[1] - camera_info.pos[1]) * 0.05;
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

	Entities.forEach(function(entity, index, array) {
		entity.render(view_matrix, proj_matrix);
	});
	
}
/**/
//Start everything.
main_game_loop()
