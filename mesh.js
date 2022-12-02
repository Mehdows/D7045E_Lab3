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

    constructor(vertices, indices, gl, shaderProgram) {

        /*vertex array object handle, this.vertexArray gets the value of a WebGLVertexArrayObject
        representing a vertex array object (VAO) which points to vertex array data*/
        vertexArrayObject = gl.createVertexArray();
    
        gl.bindVertexArray(this.vertexArrayObject);

    
        /*vertex buffer handle*/
        vertexBufferObject = gl.createBuffer();

        /*bind the vertex buffer*/
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBufferObject);

    
        /*send the array of vertices to the GPU*/
        //this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.gl.STATIC_DRAW);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
    

        /*index buffer handle*/
        indexBufferObject = gl.createBuffer();
    
        /*bind the index buffer, using ELEMENT_ARRAY_BUFFER to identify the array as an array of indices*/
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBufferObject);
    

        /*send the array of indices to the GPU*/
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), this.gl.STATIC_DRAW);
    

        vPosition = gl.getAttribLocation(shaderProgram, "vPosition");
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
    constructor(width, height, depth, gl, shaderProgram){
        
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.gl = gl;
        this.shaderProgram = shaderProgram;
        
        super(this.getVertices(), this.getIndices(), this.gl, this.shaderProgram);
    }

    // Vertices
    getVertices(){
        var vertices = [
            vec4( -this.width, -this.height, this.depth, 1),
            vec4( -this.width, this.height, this.depth, 1),
            vec4( this.width, this.height, this.depth, 1),
            vec4( this.width, -this.height, this.depth, 1),
            vec4( -this.width, -this.height, -this.depth, 1),
            vec4( -this.width, this.height, -this.depth, 1),
            vec4( this.width, this.height, -this.depth, 1),
            vec4( this.width, -this.height, -this.depth, 1)
        ];

        return vertices;
    }

    // Indices
    getIndices(){
        var indices = [
            1, 0, 3,
            3, 2, 1,
            2, 3, 7,
            7, 6, 2,
            3, 0, 4,
            4, 7, 3,
            6, 5, 1,
            1, 2, 6,
            4, 5, 6,
            6, 7, 4,
            5, 4, 0,
            0, 1, 5
        ];

        return indices;
    }

    // Getters
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