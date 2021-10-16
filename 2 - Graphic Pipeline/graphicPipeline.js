import Canvas from '../1 - Line Rasterization/module.js'
import { MidPointLineAlgorithm } from '../1 - Line Rasterization/1 - Algorithm implementation/algorithms.js'

let color_buffer = new Canvas("canvas");
color_buffer.clear();

/******************************************************************************
 * Matriz Model (modelagem): Esp. Objeto --> Esp. Universo. 
 * OBS: A matriz está carregada inicialmente com a identidade.
 *****************************************************************************/

const modelMatrix = (vertices,
  rotation_angle_x, rotation_angle_y, rotation_angle_z,
  x_axis_translation, y_axis_translation, z_axis_translation,
  x_axis_sheer, y_axis_sheer, z_axis_sheer) => {

  let m_model_translation = new THREE.Matrix4();
  let m_model_sheer = new THREE.Matrix4();
  let m_model_rotation_x = new THREE.Matrix4();
  let m_model_rotation_y = new THREE.Matrix4();
  let m_model_rotation_z = new THREE.Matrix4();    

  m_model_translation.set(1.0, 0.0, 0.0, x_axis_translation,
                          0.0, 1.0, 0.0, y_axis_translation,
                          0.0, 0.0, 1.0, z_axis_translation,
                          0.0, 0.0, 0.0, 1.0);

  m_model_rotation_x.set(1.0, 0.0, 0.0, 0.0,
                          0.0, Math.cos(rotation_angle_x), -Math.sin(rotation_angle_x), 0.0,
                          0.0, Math.sin(rotation_angle_x), Math.cos(rotation_angle_x), 0.0,
                          0.0, 0.0, 0.0, 1.0);

  m_model_rotation_y.set(Math.cos(rotation_angle_y), 0.0, Math.sin(rotation_angle_y), 0.0,
                          0.0, 1.0, 0.0, 0.0,
                          -Math.sin(rotation_angle_y), 0.0, Math.cos(rotation_angle_y), 0.0,
                          0.0, 0.0, 0.0, 1.0);
        
  m_model_rotation_z.set(Math.cos(rotation_angle_z), -Math.sin(rotation_angle_z), 0.0, 0.0,
                          Math.sin(rotation_angle_z), Math.cos(rotation_angle_z), 0.0, 0.0,
                          0.0, 0.0, 1.0, 0.0,
                          0.0, 0.0, 0.0, 1.0);
        
  m_model_sheer.set(x_axis_sheer, 0.0, 0.0, 0.0,
                    0.0, y_axis_sheer, 0.0, 0.0,
                    0.0, 0.0, z_axis_sheer, 0.0,
                    0.0, 0.0, 0.0, 1.0);

  let m_model = new THREE.Matrix4();

  m_model.set(1.0, 0.0, 0.0, 0.0,
  0.0, 1.0, 0.0, 0.0,
  0.0, 0.0, 1.0, 0.0,
  0.0, 0.0, 0.0, 1.0);

  m_model.multiply(m_model_translation).multiply(m_model_rotation_x).multiply(m_model_rotation_y).multiply(m_model_rotation_z).multiply(m_model_sheer);
  
  vertices.forEach(element => {
    element.applyMatrix4(m_model)
  });

}

/******************************************************************************
 * Matriz View (visualização): Esp. Universo --> Esp. Câmera
 * OBS: A matriz está carregada inicialmente com a identidade. 
 *****************************************************************************/

const viewMatrix = vertices => {
/******************************************************************************
 * Parâmetros da camera sintética.
 *****************************************************************************/
  let cam_pos = new THREE.Vector3(1.3,1.7,2.0);     // posição da câmera no esp. do Universo.
  let cam_look_at = new THREE.Vector3(0.0,0.0,0.0); // ponto para o qual a câmera aponta.
  let cam_up = new THREE.Vector3(0.0,1.0,0.0);      // vetor Up da câmera.

  // Derivar os vetores da base da câmera a partir dos parâmetros informados acima.

  let cam_dir = new THREE.Vector3().subVectors(cam_look_at, cam_pos); // direction = look at - position

  let Zcam = cam_dir.normalize().multiplyScalar(-1);

  let Xcam = new THREE.Vector3().crossVectors(cam_up, Zcam).normalize();

  let Ycam = new THREE.Vector3().crossVectors(Zcam, Xcam).normalize();

  // Construir 'm_bt', a inversa da matriz de base da câmera.

  let m_bt = new THREE.Matrix4();

  m_bt.set(Xcam.x, Xcam.y, Xcam.z, 0.0,
          Ycam.x, Ycam.y, Ycam.z, 0.0,
          Zcam.x, Zcam.y, Zcam.z, 0.0,
          0.0, 0.0, 0.0, 1.0);

  // Construir a matriz 'm_t' de translação para tratar os casos em que as
  // origens do espaço do universo e da câmera não coincidem.

  let m_t = new THREE.Matrix4();

  let trans_vec = cam_pos;

  m_t.set(1.0, 0.0, 0.0, -trans_vec.x,
          0.0, 1.0, 0.0, -trans_vec.y,
          0.0, 0.0, 1.0, -trans_vec.z,
          0.0, 0.0, 0.0, 1.0);

  // Constrói a matriz de visualização 'm_view' como o produto
  //  de 'm_bt' e 'm_t'.
  let m_view = m_bt.clone().multiply(m_t);

  vertices.forEach(element => {
    element.applyMatrix4(m_view)
  });
}

/******************************************************************************
 * Matriz de Projecao: Esp. Câmera --> Esp. Recorte
 * OBS: A matriz está carregada inicialmente com a identidade. 
 *****************************************************************************/

const projectionMatrix = (vertices, distance=1) => {
  let m_projection = new THREE.Matrix4();
  
  if(distance===0)
    distance=1

  m_projection.set(1.0, 0.0, 0.0, 0.0,
                  0.0, 1.0, 0.0, 0.0,
                  0.0, 0.0, 1.0, distance,
                  0.0, 0.0, -(1/distance), 0.0);

  vertices.forEach(element => {
    element.applyMatrix4(m_projection)
  });
}

/******************************************************************************
 * Homogeneizacao (divisao por W): Esp. Recorte --> Esp. Canônico
 *****************************************************************************/

const homogenization = vertices => {
  vertices.forEach(element => {
    element.divideScalar(element.w);
  });
}

/******************************************************************************
 * Matriz Viewport: Esp. Canônico --> Esp. Tela
 * OBS: A matriz está carregada inicialmente com a identidade. 
 *****************************************************************************/

const viewportMatrix = (vertices, canvasID) => {
  const x_dimension = document.getElementById(canvasID).width;
  const y_dimension = document.getElementById(canvasID).height;


  let m_scale = new THREE.Matrix4();
  let m_translation = new THREE.Matrix4();

  m_scale.set(Math.round(x_dimension/2), 0.0, 0.0, 0.0,
              0.0,Math.round(y_dimension/2), 0.0, 0.0,
              0.0, 0.0, 1.0, 0.0,
              0.0, 0.0, 0.0, 1.0);

  m_translation.set(1.0, 0.0, 0.0, 1.0,
                    0.0, 1.0, 0.0, 1.0,
                    0.0, 0.0, 1.0, 0.0,
                    0.0, 0.0, 0.0, 1.0);

  let m_viewport = new THREE.Matrix4().multiplyMatrices(m_scale, m_translation);
  
  vertices.forEach(element => {
    element.applyMatrix4(m_viewport)
  });
}

/******************************************************************************
 * Rasterização
 *****************************************************************************/

const rasterization = (vertices, edges, objectColor1, objectColor2, canvasID) => {
  edges.forEach(element => {
    MidPointLineAlgorithm(Math.round(vertices[element[0]].x), Math.round(vertices[element[0]].y), 
                          Math.round(vertices[element[1]].x), Math.round(vertices[element[1]].y), 
                          objectColor1, objectColor2, canvasID);
  }); 
}

const sendObjectThroughPipeline = (vertices, edges, objectColor1, objectColor2, canvasID="canvas", distance,
  rotation_angle_x=0.0, rotation_angle_y=0.0, rotation_angle_z=0.0,
  x_axis_translation=0.0, y_axis_translation=0.0, z_axis_translation=0.0,
  x_axis_sheer=1.0, y_axis_sheer=1.0, z_axis_sheer=1.0) => {

    modelMatrix(vertices, rotation_angle_x, rotation_angle_y, rotation_angle_z,
      x_axis_translation, y_axis_translation, z_axis_translation, x_axis_sheer,
      y_axis_sheer, z_axis_sheer);
    
    viewMatrix(vertices);

    projectionMatrix(vertices, distance);

    homogenization(vertices);

    viewportMatrix(vertices, canvasID);

    rasterization(vertices, edges, objectColor1, objectColor2, canvasID);

}

/******************************************************************************
 * Vértices do modelo (cubo) centralizado no seu espaco do objeto. Os dois
 * vértices extremos do cubo são (-1,-1,-1) e (1,1,1), logo, cada aresta do cubo
 * tem comprimento igual a 2.
 *****************************************************************************/
//                                   X     Y     Z    W (coord. homogênea)
const phi = (1 + Math.sqrt(5))/2;
let dodecahedronVertices = [
  new THREE.Vector4(-1.0, -1.0, -1.0, 1.0),
  new THREE.Vector4( 1.0, -1.0, -1.0, 1.0),
  new THREE.Vector4( 1.0, -1.0,  1.0, 1.0),
  new THREE.Vector4(-1.0, -1.0,  1.0, 1.0),
  new THREE.Vector4(-1.0,  1.0, -1.0, 1.0),
  new THREE.Vector4( 1.0,  1.0, -1.0, 1.0),
  new THREE.Vector4( 1.0,  1.0,  1.0, 1.0),
  new THREE.Vector4(-1.0,  1.0,  1.0, 1.0),
  new THREE.Vector4(0.0, phi, (1/phi), 1.0),
  new THREE.Vector4(0.0, phi, -(1/phi), 1.0),
  new THREE.Vector4(0.0, -phi, -(1/phi), 1.0),
  new THREE.Vector4(0.0, -phi, (1/phi), 1.0),
  new THREE.Vector4((1/phi), 0.0, phi, 1.0),
  new THREE.Vector4((1/phi), 0.0, -phi, 1.0),
  new THREE.Vector4(-(1/phi), 0.0, -phi, 1.0),
  new THREE.Vector4(-(1/phi), 0.0, phi, 1.0),
  new THREE.Vector4(phi, (1/phi), 0.0, 1.0),
  new THREE.Vector4(phi, -(1/phi), 0.0, 1.0),
  new THREE.Vector4(-phi, -(1/phi), 0.0, 1.0),
  new THREE.Vector4(-phi, (1/phi), 0.0, 1.0)
];

/******************************************************************************
* As 12 arestas do cubo, indicadas através dos índices dos seus vértices.
*****************************************************************************/
let dodecahedronEdges = [
  [2,11],
  [3,11],
  [10,11],
  [0,10],
  [1,10],
  [1,13],
  [13,14],
  [0,14],
  [0,18],
  [3,18],
  [2,12],
  [12,15],
  [3,15],
  [7,15],
  [7,19],
  [18,19],
  [6,12],
  [6,8],
  [7,8],
  [2,17],
  [16,17],
  [6,16],
  [1,17],
  [5,16],
  [5,13],
  [5,9],
  [4,9],
  [4,14],
  [4,19],
  [8,9]
];

const vermelho = [255, 0, 0, 255]
const azul = [0, 0, 255, 255]
const verde = [0, 255, 0, 255]
const branco = [255, 255, 255, 255]

sendObjectThroughPipeline(dodecahedronVertices, dodecahedronEdges, branco, branco, "canvas", 1); // Dodecaedro