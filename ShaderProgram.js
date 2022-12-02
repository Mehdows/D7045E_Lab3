export class ShaderProgram{
    
    constructor(gl, fragmentShader, vertexShader){
        this.gl = gl;
        this.program = this.gl.createProgram();
        this.gl.attachShader(this.program, fragmentShader);
        this.gl.attachShader(this.program, vertexShader);
        this.gl.linkProgram(this.program);
    }

    activate(){
        this.gl.useProgram(this.program);
    }
    
    getProgram(){
        return this.program;
    }
}