// Andreas Form och Marcus Asplund

class Camera {
    constructor(gl, shaderProgram, canvas) {
        this.gl = gl;
        this.shaderProgram = shaderProgram;

        let aspect = canvas.width / canvas.height;

        this.projectionMatrix = perspective(45, aspect, 1, 100);
    }

    activate(){
        let prog = this.shaderProgram.getProgram();
        let cameraMatrixSource = this.gl.getUniformLocation(prog, "u_CameraMatrix");
        
        let cameraMatrix = flatten(this.projectionMatrix);

        this.gl.uniformMatrix4fv(cameraMatrixSource, false, cameraMatrix);
    }

    getShaderProgram(){
        return this.shaderProgram;
    }

}