//Rotation Based solely on the X axis
function rotateCameraX(tar, degrees) {
    var rads = degrees * Math.PI / 180;
    var rotMat = m4.xRotation(rads);
    var transformed = m4.transformPoint(rotMat, tar);
    return [transformed[0], transformed[1], transformed[2]];
}
//Rotation Based solely on the Y axis
function rotateCameraY(tar, degrees) {
    var rads = degrees * Math.PI / 180;
    var rotMat = m4.yRotation(rads);
    var transformed = m4.transformPoint(rotMat, tar);
    return [transformed[0], transformed[1], transformed[2]];
}
/* We probably won't need this.
//Rotation Based solely on the Z axis
function rotateCameraZ(tar, degrees) {
    var rads = degrees * Math.PI / 180;
    var rotMat = m4.zRotation(rads);
    var transformed = m4.transformPoint(rotMat, tar);
    return [transformed[0], transformed[1], transformed[2]];
};*/

//Stops the Camera from rotating fully about the X axis (no sumersaults for you)
function enforcePerspectiveRestraint(cameraRotation) {
    if (cameraRotation[0] > camera_info.viewrange[1]) {
        cameraRotation[0] = camera_info.viewrange[1];
    } else if (cameraRotation[0] < camera_info.viewrange[0]) {
        cameraRotation[0] = camera_info.viewrange[0];
    }
    return cameraRotation;
}/**/

/*
function translationVec3(original, translation) {
    var done = [0,0,0]
    done[0] = original[0] + translation[0];
    done[1] = original[1] + translation[1];
    done[2] = original[2] + translation[2];
    return done;
}/**/

function LookAt(location, target) {
	//var degrees = Math.atan(location[0],location[1])
	//rotation = [X-Axis(left),Y-Axis(down),Z-Axis(who cares?)]
	var yRot = (-Math.atan(target[2]/target[0]))+(Math.PI/2);
	if (target[0] < 0) {
		yRot += Math.PI;
	}
	var xRot = -Math.atan(target[1]/target[2]);
	//console.log([target[1], target[2]], yRot);
	var rotation = [xRot*180/Math.PI,yRot*180/Math.PI,0]
	return rotation;
}
