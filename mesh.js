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
        
        
        let vertexArr = gl.createVertexArray();
        let vertexBuff = gl.createBuffer();
        let indexBuff = gl.createBuffer();

        gl.bindVertexArray(vertexArr);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuff);
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuff);

        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
        
        let prog = shaderProgram.getProgram();
        let pos = gl.getAttribLocation(prog, "a_Position");
        gl.vertexAttribPointer(pos, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(pos);
    }

    getIndices(){
        return this.indices;
    }
    
    getVertices(){
        return this.vertices;
    }
    

}


/* 

●  Implement a class Cuboid that extends Mesh and represents a cuboid. 

●  When a cuboid is created, it is only needed to give width, depth, and height, that is 
the total extensions in the x, y, and z directions respectively. The midpoint of the 
cuboid should be at the origin in the local coordinate system.  

*/


class cuboid extends Mesh{
    constructor(width, height, depth, gl, shaderProgram){
        let vertices = [
            vec4( -width, -height, depth, 1),
            vec4( -width, height, depth, 1),
            vec4( width, height, depth, 1),
            vec4( width, -height, depth, 1),
            vec4( -width, -height, -depth, 1),
            vec4( -width, height, -depth, 1),
            vec4( width, height, -depth, 1),
            vec4( width, -height, -depth, 1)
        ];
        let indices = [
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
        
        super(vertices, indices, gl, shaderProgram);

        this.width = width;
        this.height = height;
        this.depth = depth;
        this.gl = gl;
        this.shaderProgram = shaderProgram;
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