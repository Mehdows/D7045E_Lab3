// Andreas Form och Marcus Asplund

class Camera {
    constructor(gl, shaderProgram, canvas) {
        this.gl = gl;
        this.shaderProgram = shaderProgram;

        let eye = vec3(0, 0, 0);
        let at = vec3(0, 0, 0);
        let up = vec3(0, 1, 0);

        let aspect = canvas.width / canvas.height;

        this.viewMatrix = lookAt(eye, at, up);
        this.projectionMatrix = perspective(45, aspect, 1, 100);

    }

    activate(){
        let prog = this.shaderProgram.getProgram();
        let projMatrixSource = this.gl.getUniformLocation(prog, "u_ProjectionMatrix");
        let viewMatrixSource = this.gl.getUniformLocation(prog, "u_ViewMatrix");

        let projectionMatrix = flatten(this.projectionMatrix);
        let viewMatrix = flatten(this.viewMatrix);

        this.gl.uniformMatrix4fv(projMatrixSource, false, projectionMatrix);
        this.gl.uniformMatrix4fv(viewMatrixSource, false, viewMatrix);
    }

    getShaderProgram(){
        return this.shaderProgram;
    }

}