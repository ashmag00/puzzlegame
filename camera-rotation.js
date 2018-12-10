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
    if (cameraRotation[0] > 89) {
        cameraRotation[0] = 89;
    } else if (cameraRotation[0] < -89) {
        cameraRotation[0] = -89;
    }
    return cameraRotation;
}/**/
