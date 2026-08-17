import * as BABYLON from "@babylonjs/core";

// ===================================================================
// AS DUAS ÚNICAS LINHAS QUE VOCÊ DEVE ALTERAR NESTE ARQUIVO:
const CURSO_X_MM = 0;   // <-- troque para 0 ou 200
const CURSO_Y_MM = 0;   // <-- troque para 0 ou 200
// ===================================================================

const ESCALA = 100; // 1 unidade Babylon = 100 mm
const x = CURSO_X_MM / ESCALA;
const z = CURSO_Y_MM / ESCALA; // "Y" do artigo mapeado para o eixo Z do Babylon

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = function () {
  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color4(0.09, 0.1, 0.15, 1);

  const camera = new BABYLON.ArcRotateCamera(
    "camera", -Math.PI / 3, Math.PI / 3, 5, new BABYLON.Vector3(1, 0, 1), scene
  );
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

  // Trilho fixo do eixo X (curso de 0 a 200mm = 0 a 2 unidades)
  const trilhoX = BABYLON.MeshBuilder.CreateBox("trilhoX", { width: 2.2, height: 0.08, depth: 0.08 }, scene);
  trilhoX.position = new BABYLON.Vector3(1, 0, 0);

  // Trilho fixo do eixo Y (curso de 0 a 200mm = 0 a 2 unidades)
  const trilhoY = BABYLON.MeshBuilder.CreateBox("trilhoY", { width: 0.08, height: 0.08, depth: 2.2 }, scene);
  trilhoY.position = new BABYLON.Vector3(0, 0, 1);

  // Carro/garra: sua posição é definida pelos dois valores no topo do arquivo
  const carro = BABYLON.MeshBuilder.CreateBox("carro", { size: 0.25 }, scene);
  carro.position = new BABYLON.Vector3(x, 0.15, z);

  const matTrilho = new BABYLON.StandardMaterial("matTrilho", scene);
  matTrilho.diffuseColor = new BABYLON.Color3(0.15, 0.25, 0.55);
  trilhoX.material = matTrilho;
  trilhoY.material = matTrilho;

  const matCarro = new BABYLON.StandardMaterial("matCarro", scene);
  matCarro.diffuseColor = new BABYLON.Color3(0.85, 0.65, 0.15);
  carro.material = matCarro;

  return scene;
};

const scene = createScene();

engine.runRenderLoop(function () {
  scene.render();
});

window.addEventListener("resize", function () {
  engine.resize();
});