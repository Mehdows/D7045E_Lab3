/* Frågor till Håkan:

    Är simpleMaterial samma sak som monochrome

*/



var canvas;
var gl;
var nodes = [];
var greenNode;
var camera;
var shader;

var greenNodeTransform = mat4(1,0,0,0, 0,1,0,0, 0,0,1,5, 0,0,0,1);

var vertices = [
  vec4(-0.3, -0.3, 0.5, 1),
  vec4(-0.3, 0.3, 0.5, 1),
  vec4(0.3, 0.3, 0.5, 1),
  vec4(0.3, -0.3, 0.5, 1),
  vec4(-0.3, -0.3, -0.5, 1),
  vec4(-0.3, 0.3, -0.5, 1),
  vec4(0.3, 0.3, -0.5, 1),
  vec4(0.3, -0.3, -0.5, 1)
];

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











function init() {

  canvas = document.getElementById("gl-canvas");
  gl = canvas.getContext("webgl2");

  if (!gl) {alert("WebGL isn't available");}

  //webgl configurations
  gl.viewport( 0, 0, canvas.width, canvas.height );
  gl.clearColor(0.8, 1, 1, 1.0 );

  gl.enable(gl.DEPTH_TEST);

  var fragmentShader = new Shader(gl, gl.FRAGMENT_SHADER, "fragment-shader");
  var vertexShader = new Shader(gl, gl.VERTEX_SHADER, "vertex-shader");


  shader = new ShaderProgram(gl, vertexShader.getShader(), fragmentShader.getShader());
  //shader.activateShader();

  camera = new Camera(gl, shader.getProgram());
  

  var mesh = new Mesh(gl, vertices, indices, shader.getProgram());
  var monoBlue = new MonochromeMaterial(gl, vec4(0,1, 1, 1.0), shader);
  var monoGreen = new MonochromeMaterial(gl, vec4(0.0, 1.0, 0, 1.0), shader);

  greenNode = new GraphicsNode(gl, mesh, monoGreen, greenNodeTransform);

  var max = 10;
  var min = -10;
  var maxZ = 10;
  var minZ = -40
  for (var i = 0; i <= 60; i++) {

    var x = Math.floor(Math.random() * (max - min)) + min;
    var y = Math.floor(Math.random() * (max - min)) + min;
    var z = Math.floor(Math.random() * (maxZ - minZ)) + minZ;

    var transform = mat4(1,0,0,x, 0,1,0,y, 0,0,1,z, 0,0,0,1);
    nodes.push(new GraphicsNode(gl, mesh, monoBlue, transform));

  }

  //camera.activate();

  render();
}













function render() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  shader.activateShader();
  camera.activate();

  greenNode.draw();

  for(var i = 0; i < nodes.length; i++) {
    nodes[i].draw();
  }
}










window.addEventListener('keydown', function(event) {
    //increase y
    if(event.keyCode == 87) { //W
        greenNodeTransform = add(greenNodeTransform, mat4(0,0,0,0, 0,0,0,0.1, 0,0,0,0, 0,0,0,0));
        greenNode.updateTransform(greenNodeTransform);

    //decrease x
    } else if(event.keyCode == 65) { //A
      greenNodeTransform = add(greenNodeTransform, mat4(0,0,0,-0.1, 0,0,0,0, 0,0,0,0, 0,0,0,0));
      greenNode.updateTransform(greenNodeTransform);

    //decrease y
    } else if(event.keyCode == 83) { //S
      greenNodeTransform = add(greenNodeTransform, mat4(0,0,0,0, 0,0,0,-0.1, 0,0,0,0, 0,0,0,0));
      greenNode.updateTransform(greenNodeTransform);

    //increase x
    } else if(event.keyCode == 68) { //D
      greenNodeTransform = add(greenNodeTransform, mat4(0,0,0,0.1, 0,0,0,0, 0,0,0,0, 0,0,0,0));
      greenNode.updateTransform(greenNodeTransform);

    //decrease z
    } else if(event.keyCode == 69) { //E
      greenNodeTransform = add(greenNodeTransform, mat4(0,0,0,0, 0,0,0,0, 0,0,0,-0.1, 0,0,0,0));
      greenNode.updateTransform(greenNodeTransform);
      //console.log(testTransform[2][3])

    //increase z
    } else if(event.keyCode == 67) { //C
      greenNodeTransform = add(greenNodeTransform, mat4(0,0,0,0, 0,0,0,0, 0,0,0,0.1, 0,0,0,0));
      greenNode.updateTransform(greenNodeTransform);
    }

    //render with updated position for green cube
    render();
});






window.onload = init;