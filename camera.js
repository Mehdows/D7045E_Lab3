class Camera {
    constructor(gl, shaderProgram) {
        this.gl = gl;
        this.shaderProgram = shaderProgram;

        let eye = vec3(0, 0, 0);
        let at = vec3(0, 0, 0);
        let up = vec3(0, 1, 0);

        let aspect = canvas.width / canvas.height;

        this.viewMatrix = lookAt(eye, at, up);
        this.projectionMatrix = perspective(45, aspect, 0.1, 100);

    }

    activate(){
        let projMatrix = this.gl.getUniformLocation(this.shaderProgram, "projectionMatrix");
        let viewMatrix = this.gl.getUniformLocation(this.shaderProgram, "viewMatrix");
        this.gl.uniformMatrix4fv(projMatrix, false, this.projectionMatrix);
        this.gl.uniformMatrix4fv(viewMatrix, false, this.viewMatrix);
    }

}