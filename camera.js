class Camera {
    constructor(gl){
        this.gl = gl;
        this.viewMatrix = mat4.create();
        this.projectionMatrix = mat4.create();

        let aspect = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight;
        let near = 0.1;
        let far = 1000;
    }

}