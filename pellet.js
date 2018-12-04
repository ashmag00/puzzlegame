function pellet_generate(gl, twgl) {
    const array = {
        position: [
            0.254645, 0.149743, 0.000000,
            0.254645, -0.160786, 0.000000,
            -0.254645, 0.149743, 0.000000,
            0.000000, 0.271208, 0.000000,
            -0.254645, -0.160786, 0.000000,
            0.000000, -0.315378, 0.000000,
        ],
        indices: [
            5, 1, 0,
            5, 0, 3,
            5, 3, 2,
            5, 2, 4,
        ],
    };
    const buffer = twgl.createBufferInfoFromArrays(gl, array);
    return buffer;
}
