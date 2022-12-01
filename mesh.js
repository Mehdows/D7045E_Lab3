


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



export class Mesh {
    constructor(vertexBufferObject, indexBufferObject, vertexArrayObject) {
        this.vertexBufferObject = vertexBufferObject;
        this.indexBufferObject = indexBufferObject;
        this.vertexArrayObject = vertexArrayObject;


        /*vertex buffer handle*/
        this.vertexBufferObject = this.gl.createBuffer();

        /*bind the vertex buffer*/
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
    
        /*send the array of vertices to the GPU*/
        //this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(this.vertices), this.gl.STATIC_DRAW);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, flatten(this.vertices), this.gl.STATIC_DRAW);
    
        /*index buffer handle*/
        this.indexBuffer = this.gl.createBuffer();
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


hej = new cuboid(10, 10, 10);
saDU = hej.getCordinates();
console.log(saDU);
console.log("hej");