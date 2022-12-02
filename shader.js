export class Shader{
    constructor(gl, shaderType, source){
        this.shader = this.gl.createShader(this.shaderType);
        this.gl.shaderSource(this.shader, this.source);
        this.gl.compileShader(this.shader);
    }
    getShader(){
        return this.shader;
    }
}