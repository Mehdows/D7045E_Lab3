

import {helloWorld} from "./mesh.js";


class GraphicsNode {
    constructor(gl, mesh, material) {
        this.gl = gl;
        this.mesh = mesh;
        this.material = mesh;
    }

    Draw() {
        
    }

    transform(transform) {
        
    }
}
console.log(helloWorld());