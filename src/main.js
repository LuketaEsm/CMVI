import * as BABYLON from "@babylonjs/core";

// ===================================================================
// ÚNICA LINHA QUE VOCÊ DEVE ALTERAR NESTE ARQUIVO:
const CURSO_MM = 200;   // <-- troque para 0 (recuado) ou 200 (avançado)
// ===================================================================

const ESCALA = 100; // 1 unidade Babylon = 100 mm
const cursoEmUnidades = CURSO_MM / ESCALA;

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = function () {
  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color4(0.09, 0.1, 0.15, 1);

  const camera = new BABYLON.ArcRotateCamera(
    "camera", -Math.PI / 2.5, Math.PI / 2.5, 5, new BABYLON.Vector3(1, 0, 0), scene
  );
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

  // Corpo fixo do cilindro
  const corpo = BABYLON.MeshBuilder.CreateCylinder("corpo", {
    height: 1, diameter: 0.3, tessellation: 24
  }, scene);
  corpo.rotation.z = Math.PI / 2;
  corpo.position.x = -0.5;

  // Haste móvel (posição definida pelo CURSO_MM)
  const haste = BABYLON.MeshBuilder.CreateCylinder("haste", {
    height: 1.2, diameter: 0.1, tessellation: 16
  }, scene);
  haste.rotation.z = Math.PI / 2;
  haste.position.x = cursoEmUnidades - 0.1;

  const matCorpo = new BABYLON.StandardMaterial("matCorpo", scene);
  matCorpo.diffuseColor = new BABYLON.Color3(0.15, 0.25, 0.55);
  corpo.material = matCorpo;

  const matHaste = new BABYLON.StandardMaterial("matHaste", scene);
  matHaste.diffuseColor = new BABYLON.Color3(0.85, 0.65, 0.15);
  haste.material = matHaste;

  return scene;
};

const scene = createScene();

engine.runRenderLoop(function () {
  scene.render();
});

window.addEventListener("resize", function () {
  engine.resize();
});