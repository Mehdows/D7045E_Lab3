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
        
        
        let x = transformMatrix[13];
        let y = transformMatrix[14];
        let z = transformMatrix[15];
        let euclideanDistance = Math.sqrt(x*x + y*y + z*z);
        
        let shadedColor = [...this.color];
        for(let i = 0; i < this.color.length-1; i++){
            shadedColor[i] = this.color[i]/euclideanDistance;
        }

        let colorLocation = this.gl.getUniformLocation(prog, "u_Color");
        let transformLocation = this.gl.getUniformLocation(prog, "u_TransformMatrix");

        let flattenedtransformMatrix = flatten(transformMatrix);
        let flattenedColor = flatten(shadedColor);
        
        this.gl.uniform4fv(colorLocation, flattenedColor);
        this.gl.uniformMatrix4fv(transformLocation, false, flattenedtransformMatrix);
    }

    setColor(color){
        this.color = color;
    }
}
