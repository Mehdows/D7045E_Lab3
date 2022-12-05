class GraphicsNode {
    constructor(gl, mesh, material, transform) {
        this.gl = gl;
        this.mesh = mesh;
        this.material = material;
        this.transform = flatten(transform);
    }

    // Draw the node
    draw() {
        this.material.applyMaterial(this.transform);
        let indicesLength = this.mesh.getIndices().length;
        this.gl.drawElements(this.gl.TRIANGLES, indicesLength, this.gl.UNSIGNED_BYTE, 0);
    }

    // Update the green node position
    update(transform) {
        transform = flatten(transform);
        this.transform = transform;
    }
}