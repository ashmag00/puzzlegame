function rotateCameraX(camera_info, degrees) {
    var rads = degrees * Math.PI / 180;
    var rotMat = m4.xRotation(rads);
    var transformed = m4.transformPoint(rotMat, camera_info.tar);
    return [transformed[0], transformed[1], transformed[2]];
}
function rotateCameraY(camera_info, degrees) {
    var rads = degrees * Math.PI / 180;
    var rotMat = m4.yRotation(rads);
    var transformed = m4.transformPoint(rotMat, camera_info.tar);
    return [transformed[0], transformed[1], transformed[2]];
}