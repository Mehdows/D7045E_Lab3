// Andreas Form och Marcus Asplund

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
        
        let colorLocation = this.gl.getUniformLocation(prog, "u_Color");
        let transformLocation = this.gl.getUniformLocation(prog, "u_TransformMatrix");

        let flattenedtransformMatrix = flatten(transformMatrix);
        let flattenedColor = flatten(this.color);
        
        this.gl.uniform4fv(colorLocation, flattenedColor);
        this.gl.uniformMatrix4fv(transformLocation, false, flattenedtransformMatrix);
    }
}
