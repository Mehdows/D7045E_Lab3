import * as vec4 from "./libraries/glMatrix/src/mat4.js";

class material {
    constructor(gl, prog){
        this.gl = gl;
        this.prog = prog;
    }
    applyMaterial(){
        throw new Error("abstract method, must be implemented");
    }
}

class MonochromeMaterial extends material{
    
    constructor(gl, prog, color){
        super(gl, prog);
        this.color = color;
    }

    applyMaterial(transformMatrix){
        this.color.push(1);
        let colorLoc = this.gl.getUniformLocation(this.prog, "uColor");
        this.gl.uniform4fv(colorLoc, this.color);

        let transformLoc = this.gl.getUniformLocation(this.prog, "uTransform");
        this.gl.uniformMatrix4fv(transformLoc, false, transformMatrix);
    }
}
