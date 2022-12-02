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

var canvas;
var gl;


let vertexShader =
"attribute vec4 a_Position;\n" +
"uniform mat4 u_TransformMatrix;\n" +
"uniform mat4 u_ViewMatrix;\n" +
"uniform mat4 u_ProjectionMatrix;\n" +
"\n" +
"void main()\n" +
"{\n" +
"  gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_TransformMatrix * a_Position;\n" +
"}\n";


let  fragmentShader = 
"precision mediump float;\n" +
"uniform vec4 u_Color;\n" +
"\n" +
"void main() {\n" +
    "gl_FragColor = u_Color;\n" +
"};\n";


function init() {

}


function render() {

}

window.addEventListener('keydown', function(event) {

});