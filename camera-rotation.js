function rotateCameraX(tar, degrees) {
    var rads = degrees * Math.PI / 180;
    var rotMat = m4.xRotation(rads);
    var transformed = m4.transformPoint(rotMat, tar);
    return [transformed[0], transformed[1], transformed[2]];
}
function rotateCameraY(tar, degrees) {
    var rads = degrees * Math.PI / 180;
    var rotMat = m4.yRotation(rads);
    var transformed = m4.transformPoint(rotMat, tar);
    return [transformed[0], transformed[1], transformed[2]];
}
/*
function rotateCameraZ(tar, degrees) {
    var rads = degrees * Math.PI / 180;
    var rotMat = m4.zRotation(rads);
    var transformed = m4.transformPoint(rotMat, tar);
    return [transformed[0], transformed[1], transformed[2]];
}*/
