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
	}
	
	render() {
	
		this.uniforms = {
			scale: this.scale,
			translate: this.pos,
			color: this.color
		}
		
		twgl.setBuffersAndAttributes(gl, programInfo, this.buffer);
		twgl.setUniforms(programInfo, this.uniforms);
		twgl.drawBufferInfo(gl, this.buffer);
	}
};

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
	gl.useProgram(programInfo.program);

	//const aspect = canvas.clientWidth / canvas.clientHeight;
	//const view_matrix = m4.inverse(m4.lookAt(camera_info.pos, camera_info.tar, camera_info.up));
	//proj_matrix = m4.perspective(camera_info.fov, aspect, camera_info.zNear, camera_info.zFar);

	Entities.forEach(function(item, index, array) {
		item.render();
	});
}

//Start everything.
main_game_loop()
