class GraphicsNode {
    constructor(gl, mesh, material, transform) {
        this.gl = gl;
        this.mesh = mesh;
        this.material = material;
        this.transform = transform;
    }

    draw() {
        this.material.applyMaterial(this.transform);
        this.gl.drawElements(this.gl.TRIANGLES, this.mesh.getIndices().length, this.gl.UNSIGNED_SHORT, 0);
    }

    update(transform) {
        this.transform = transform;
    }
}