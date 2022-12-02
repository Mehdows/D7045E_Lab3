import * as mat4 from "./libraries/glMatrix/src/mat4.js";

class material {
    constructor(gl, prog){
        this.prog = prog;
    }
    applyMaterial(){
        throw new Error("abstract method, must be implemented");
    }
}

class MonochromeMaterial extends material{
    
    constructor(gl, prog, color){
        super(prog);
        this.color = color;
    }

    applyMaterial(){
        let mat = mat4.create();
        //Applies the color to the matrix
        mat[3] = this.color[0];
        mat[7] = this.color[1];
        mat[11] = this.color[2];
        
        //Apply the matrix
        

    }
}
let a = new MonochromeMaterial("gl", "prog", [1,1,1]);
a.applyMaterial();
