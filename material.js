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
        mat4.identity(mat);


    }
}
let a = new MonochromeMaterial("gl", "prog", "color");
a.applyMaterial();