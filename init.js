//Initialize stuff
canvas = document.getElementById("c");
const gl = canvas.getContext("webgl");
const programInfo = twgl.createProgramInfo(gl, ["vs", "fs"]);

/*
	NOTE ON TEXTURES (GABE): This const currently containts
	only ONE sample texture with four colors, one row per color (R,G,B,A).
	As it's currently set up, all entities will use this texture.
*/
const tex = twgl.createTexture(gl, {
		min: gl.NEAREST,
		mag: gl.NEAREST,
		src: [
			255, 0, 0, 255,		// BLINKY (RED)
			255, 125, 125, 255,	// PINKY (PINK)
			0, 255, 255, 255,	// INK (BLUE)
			255, 255, 0, 255,	// CLYDE (ORANGE)
		],
	});

//Create the Entity Class
class Entity {
	/*
		NOTE ON TEXTURES (GABE): The constructor does not need not
		bring in pcolor because it instead already includes the
		texture information within the pbuffer when it is created.
		// DELETED COLOR FROM THIS.
	*/
	constructor(pbuffer, pscale, ptranslate, protation) {
		this.buffer = pbuffer;
		this.scale = pscale;
		this.pos = ptranslate;
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
			
			//color: this.color
		/*	
			NOTE (GABE): I commented out the "color" line since
			the fragment shader in index.html now uses "u_texture"
			for gl_FragColor, not color.
		*/
			u_texture: tex,
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




