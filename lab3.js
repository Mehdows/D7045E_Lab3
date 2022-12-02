/* Frågor till Håkan:

    Är simpleMaterial samma sak som monochrome

    Ska man bara skapa en cuboid och inte en mesh? Så i graphicsNode ska ha en cuboid som mesh och inte klassen mesh?
*/


// Imports
import { cuboid } from "./mesh.js";
import { MonochromeMaterial } from "./material.js";
import { Shader } from "./shader";
import { ShaderProgram } from "./shaderProgram";
import { Camera } from "./camera";
import { GraphicsNode } from "./graphicsNode";

import { mat4 } from "./libraries/glMatrix/src/mat4.js";

var gl;
var shaderProgram;


var vertexShader =
"attribute vec4 a_Position;\n" +
"uniform mat4 u_TransformMatrix;\n" +
"uniform mat4 u_ViewMatrix;\n" +
"uniform mat4 u_ProjectionMatrix;\n" +
"\n" +
"void main()\n" +
"{\n" +
"  gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_TransformMatrix * a_Position;\n" +
"}\n";


var  fragmentShader = 
"precision mediump float;\n" +
"uniform vec4 u_Color;\n" +
"\n" +
"void main() {\n" +
    "gl_FragColor = u_Color;\n" +
"};\n";


function init() {
  // Making the canvas
  let canvas = document.getElementById("gl-canvas");
  gl = canvas.getContext("webgl2");
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.8, 0.8, 0.8, 1.0);
  gl.enable(gl.DEPTH_TEST);


  // Making the shaders
  let vertexShader = new Shader(gl, gl.VERTEX_SHADER, vertexShader);
  let fragmentShader = new Shader(gl, gl.FRAGMENT_SHADER, fragmentShader);

  shaderProgram = new ShaderProgram(gl, vertexShader, fragmentShader);

  // Making the camera
  let camera = new Camera(gl, shaderProgram);

  // Making the mesh
  let width = 1;
  let height = 1;
  let depth = 1;
  let cube = new cuboid(width, height, depth, gl, shaderProgram);

  let randomBoxesColor = [0, 1, 0]; // Green
  let playableBoxColor = [1, 0, 0]; // Red
  let randomBoxesMaterial = new MonochromeMaterial(gl, shaderProgram, randomBoxesColor);
  let playableBoxMaterial = new MonochromeMaterial(gl, shaderProgram, playableBoxColor);
  
  let mat = mat4.create();
  playableBox = new GraphicsNode(gl, cube, playableBoxMaterial, mat);

  let max = 1;
  let min = -1;
  

}


function render() {

}

window.addEventListener('keydown', function(event) {

});