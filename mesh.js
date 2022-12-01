/* 

●  Implement a class Mesh for meshes intended to be used when defining surfaces of 
graphical objects. 

●  Apart from a graphics context, the constructor should take arrays with vertex and 
index data describing the mesh, and create (via WebGL/OpenGL calls) 

○  a Vertex Array Object handle,  
○  a Vertex Buffer handle, and  
○  an Element Array Buffer handle (index buffer).  

●  It also sets up vertex attribute pointers accordingly. 

*/


class Mesh {

    constructor(gl, vertices, indices, shaderProgram) {
    
        vertices = vertices;
        indices = indices;
    
        /*vertex array object handle, this.vertexArray gets the value of a WebGLVertexArrayObject
        representing a vertex array object (VAO) which points to vertex array data*/
        vertexArrayObject = this.gl.createVertexArray();
    
        gl.bindVertexArray(this.vertexArrayObject);

    
        /*vertex buffer handle*/
        vertexBufferObject = this.gl.createBuffer();

        /*bind the vertex buffer*/
        gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBufferObject);

    
        /*send the array of vertices to the GPU*/
        //this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.gl.STATIC_DRAW);
        gl.bufferData(this.gl.ARRAY_BUFFER, flatten(this.vertices), this.gl.STATIC_DRAW);
    

        /*index buffer handle*/
        indexBufferObject = this.gl.createBuffer();
    
        /*bind the index buffer, using ELEMENT_ARRAY_BUFFER to identify the array as an array of indices*/
        gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBufferObject);
    

        /*send the array of indices to the GPU*/
        gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(this.indices), this.gl.STATIC_DRAW);
    

        vPosition = this.gl.getAttribLocation(shaderProgram, "vPosition");
        gl.vertexAttribPointer(this.vPosition, 4, this.gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.vPosition);
    }

}


/* 

●  Implement a class Cuboid that extends Mesh and represents a cuboid. 

●  When a cuboid is created, it is only needed to give width, depth, and height, that is 
the total extensions in the x, y, and z directions respectively. The midpoint of the 
cuboid should be at the origin in the local coordinate system.  

*/


export class cuboid extends Mesh{
    constructor(width, height, depth){

        this.width = width;
        this.height = height;
        this.depth = depth;
    }


    getCordinates(){
        let x = -this.width/2;
        let y = -this.height/2;
        let z = -this.depth/2;

        return [x,y,z];
    }

    getWidth(){
        return this.width
    }

    getHeight(){
        return this.height
    }

    getDepth(){
        return this.depth
    }

}