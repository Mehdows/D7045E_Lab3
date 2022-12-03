class material {
    constructor(gl, shaderProgram){
        this.gl = gl;
        this.shaderProgram = shaderProgram;


    }
    applyMaterial(){
        throw new Error("abstract method, must be implemented");
    }
}

class MonochromeMaterial extends material{
    
    constructor(gl, shaderProgram, color){
        super(gl, shaderProgram);
        this.color = color;
    }

    applyMaterial(transformMatrix){
        let prog = this.shaderProgram.getProgram();
        this.color.push(1);

        let colorLoc = this.gl.getUniformLocation(prog, "u_Color");
        let transformLoc = this.gl.getUniformLocation(prog, "u_TransformMatrix");

        this.gl.uniform4fv(colorLoc, this.color);
        this.gl.uniformMatrix4fv(transformLoc, false, transformMatrix);
    }
}
