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
        if (this.color.length == 3){
            this.color.push(1);
        }
        let x = transformMatrix[13];
        let y = transformMatrix[14];
        let z = transformMatrix[15];
        console.log(x,y,z);
        console.log(transformMatrix);
        let euclideanDistance = Math.sqrt(x*x + y*y + z*z);

        let color = this.color;
        color = color.map(function(x) { return x / ((euclideanDistance/10)); });
        console.log(color, euclideanDistance);


        let colorLocation = this.gl.getUniformLocation(prog, "u_Color");
        let transformLocation = this.gl.getUniformLocation(prog, "u_TransformMatrix");

        let flattenedtransformMatrix = flatten(transformMatrix);
        let flattenedColor = flatten(color);
        
        this.gl.uniform4fv(colorLocation, flattenedColor);
        this.gl.uniformMatrix4fv(transformLocation, false, flattenedtransformMatrix);
    }

    setColor(color){
        this.color = color;
    }
}
