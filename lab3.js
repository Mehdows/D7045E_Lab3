var gl;
var shaderProgram;
var boxes = [];
var camera;


var vertexShaderSource =
"attribute vec4 a_Position;\n" +
"uniform mat4 u_TransformMatrix;\n" +
"uniform mat4 u_ViewMatrix;\n" +
"uniform mat4 u_ProjectionMatrix;\n" +
"\n" +
"void main()\n" +
"{\n" +
"  gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_TransformMatrix * a_Position;\n" +
"}\n";


var  fragmentShaderSource = 
"precision mediump float;\n" +
"uniform vec4 u_Color;\n" +
"\n" +
"void main() {\n" +
    "gl_FragColor = u_Color;\n" +
"}\n";


function init() {
  // Making the canvas
  let canvas = document.getElementById("gl-canvas");
  gl = canvas.getContext("webgl2");
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.8, 0.8, 0.8, 1.0);
  gl.enable(gl.DEPTH_TEST);

  // Making the shaders
  let vertexShader = new Shader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  let fragmentShader = new Shader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  shaderProgram = new ShaderProgram(gl, vertexShader, fragmentShader);

  // Making the camera
  camera = new Camera(gl, shaderProgram, canvas);

  // Making the mesh
  let width = 0.5;
  let height = 0.5;
  let depth = 0.5;
  let cube = new cuboid(width, height, depth, gl, shaderProgram);

  let randomBoxesColor = [0, 1, 0]; // Green
  let playableBoxColor = [1, 0, 0]; // Red
  let randomBoxesMaterial = new MonochromeMaterial(gl, shaderProgram, randomBoxesColor);
  let playableBoxMaterial = new MonochromeMaterial(gl, shaderProgram, playableBoxColor);
  
  let mat = mat4(vec4(1, 0, 0, 0), vec4(0, 1, 0, 0), vec4(0, 0, 1, 0), vec4(0, 0, 0, 1));
  playableBox = new GraphicsNode(gl, cube, playableBoxMaterial, mat);

  for (let i = 0; i < 10; i++) {
    let x = Math.random();
    let y = Math.random()*5;
    let z = Math.random()*50;
    let mat = move([x, y, z]);
    let randomBox = new GraphicsNode(gl, cube, randomBoxesMaterial, mat);
    boxes.push(randomBox);
  }
  
  render();
}


function render() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  shaderProgram.activate();
  camera.activate();

  for (let box of boxes) {
    box.draw();
  }
  playableBox.draw();
}

window.addEventListener('keydown', function(event) {

});

window.onload = init;