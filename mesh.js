// Andreas Form och Marcus Asplund

class Mesh {

    constructor(vertices, indices, gl, shaderProgram) {
        
        this.vertices = vertices;
        this.indices = indices;

        // Create a vertex array object
        let vertexArr = gl.createVertexArray();
        let vertexBuff = gl.createBuffer();
        let indexBuff = gl.createBuffer();

        gl.bindVertexArray(vertexArr);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuff);
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuff);

        let verticeArray = new Float32Array(this.vertices);
        let indiceArray = new Uint8Array(this.indices);

        gl.bufferData(gl.ARRAY_BUFFER, verticeArray, gl.STATIC_DRAW);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indiceArray, gl.STATIC_DRAW);
        
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

class cuboid extends Mesh{
    constructor(width, height, depth, gl, shaderProgram){

        let vertices = [
            -width, -height, depth, 1,
            -width, height, depth, 1,
            width, height, depth, 1,
            width, -height, depth, 1,
            -width, -height, -depth, 1,
            -width, height, -depth, 1,
            width, height, -depth, 1,
            width, -height, -depth, 1
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