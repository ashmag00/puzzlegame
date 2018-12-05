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
	//Rotate the Object by the x, y, and z (and convert from degrees to radians)
	var Rx = m4.xRotation(entity.rot[0]*3.14/180);
	var Ry = m4.yRotation(entity.rot[1]*3.14/180);
	var Rz = m4.zRotation(entity.rot[2]*3.14/180);
	var R = m4.multiply(Rz, m4.multiply(Rx, Ry))
	return m4.multiply(T, m4.multiply(R, S));
}

//Start with the Actual Code
function main_game_loop() {
	update();
	render();
	requestAnimationFrame(main_game_loop);
}




