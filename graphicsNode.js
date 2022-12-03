class GraphicsNode {
    constructor(gl, mesh, material, transform) {
        this.gl = gl;
        this.mesh = mesh;
        this.material = material;
        this.transform = transform;
    }

    // Draw the node
    draw() {
        this.material.applyMaterial(this.transform);
        this.gl.drawElements(this.gl.TRIANGLES, this.mesh.length, this.gl.UNSIGNED_SHORT, 0);
    }

    // Update the green node position
    update(transform) {
        this.transform = transform;
    }
}