///////////////////////////////////////////////////////////////////////////////
// Funcao que desenha um pixel colorido no canvas.
// Entrada:
//   x, y: Coordenadas de tela do pixel.
//   color: Cor do pixel no formato RGB (THREE.Vector3).
// Retorno:
//   Sem retorno.
///////////////////////////////////////////////////////////////////////////////
function PutPixel(x, y, color, canvasId) {
  let c = document.getElementById(canvasId);
  let ctx = c.getContext("2d");
  let r = Math.min(255, Math.max(0, Math.round(color.x * 255)));
  let g = Math.min(255, Math.max(0, Math.round(color.y * 255)));
  let b = Math.min(255, Math.max(0, Math.round(color.z * 255)));
  ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
  ctx.fillRect(x, y, 1, 2);
}

///////////////////////////////////////////////////////////////////////////////
// Classe que representa um raio de luz.
// Construtor:
//   origem: Ponto de origem do raio (THREE.Vector3).
//   direcao: Vetor unitario que indica a direcao do raio (THREE.Vector3).
///////////////////////////////////////////////////////////////////////////////
class Raio {
  constructor(origem, direcao) {
    this.origem = origem;
    this.direcao = direcao;
  }
}

///////////////////////////////////////////////////////////////////////////////
// Classe que representa a camera.
// Construtor:
//   Sem parametros. Os atributos da camera estao 'hard coded' no construtor.
///////////////////////////////////////////////////////////////////////////////
class Camera {
  constructor() {
    this.resolucaoX = 512; // Resolucao do sensor em X.
    this.resolucaoY = 512; // Resolucao do sensor em Y.
    this.d = 1.0; // Distancia do sensor em relacao a posicao da camera.
    this.xMin = -1.0; // Extremidade esquerda do sensor.
    this.xMax = 1.0; // Extremidade direita do sensor.
    this.yMin = -1.0; // Extremidade inferior do sensor.
    this.yMax = 1.0; // Extremidade superior do sensor.
    this.k = new THREE.Vector3(this.xMin, this.yMax, -this.d); // Canto superior esquerdo do sensor.
    this.a = new THREE.Vector3(this.xMax - this.xMin, 0.0, 0.0); // Vetor para calculo de um ponto sobre o sensor.
    this.b = new THREE.Vector3(0.0, this.yMin - this.yMax, 0.0); // Vetor para calculo de um ponto sobre o sensor.
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Metodo que converte coordenadas (x,y) de tela para um raio
  // primario que passa pelo centro do pixel no espaco do universo.
  // Entrada:
  //   x, y: Coordenadas de tela do pixel.
  // Retorno:
  //   Um objeto do tipo Raio.
  ///////////////////////////////////////////////////////////////////////////////
  raio(x, y) {
    let u = (x + 0.5) / this.resolucaoX;
    let v = (y - 0.5) / this.resolucaoY;
    let p = this.a
      .clone()
      .multiplyScalar(u)
      .add(this.b.clone().multiplyScalar(v))
      .add(this.k);

    let origem = new THREE.Vector3(0.0, 0.0, 0.0);
    let direcao = p.normalize();

    return new Raio(origem, direcao);
  }
}

///////////////////////////////////////////////////////////////////////////////
// Classe que representa um ponto de interseccao entre o raio e uma primitiva.
// Construtor:
//   Sem parametros. As propriedades de um objeto desta classe sao preenchidas
//   assim que uma interseccao raio-primitiva e detectada.
///////////////////////////////////////////////////////////////////////////////
class Interseccao {
  constructor() {
    this.t = Infinity; // distancia entre a origem do rio e o ponto de intersecao.
    this.posicao = new THREE.Vector3(0.0, 0.0, 0.0); // Coordenadas do ponto de interseccao.
    this.normal = new THREE.Vector3(0.0, 0.0, 0.0); // Vetor normal no ponto de interseccao.
  }
}

///////////////////////////////////////////////////////////////////////////////
// Classe que representa uma primitiva do tipo esfera.
// Construtor:
//   centro: Coordenadas do centro da esfera no espaco do universo (THREE.Vector3).
//   raio: Raio da esfera.
///////////////////////////////////////////////////////////////////////////////
export class Esfera {
  constructor(centro, raio) {
    this.centro = centro;
    this.raio = raio;
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Metodo que testa a interseccao entre o raio e a esfera.
  // Entrada:
  //   raio: Objeto do tipo Raio cuja a interseccao com a esfera se quer verificar.
  //   interseccao: Objeto do tipo Interseccao que armazena os dados da interseccao caso esta ocorra.
  // Retorno:
  //   Um valor booleano: 'true' caso haja interseccao; ou 'false' caso contrario.
  ///////////////////////////////////////////////////////////////////////////////
  interseccionar(raio, interseccao) {
    let a = raio.direcao.clone().dot(raio.direcao);
    let o_c = raio.origem.clone().sub(this.centro);
    let b = 2.0 * raio.direcao.clone().dot(o_c);
    let c = o_c.clone().dot(o_c) - this.raio * this.raio;

    let disc = b * b - 4.0 * a * c;

    if (disc > 0.0) {
      let t1 = (-b + Math.sqrt(disc)) / (2.0 * a);
      let t2 = (-b - Math.sqrt(disc)) / (2.0 * a);

      interseccao.t = t1;

      if (t2 > 0.001 && t2 < t1) interseccao.t = t2;

      if (interseccao.t > 0.001) {
        interseccao.posicao = raio.origem
          .clone()
          .add(raio.direcao.clone().multiplyScalar(interseccao.t));
        interseccao.normal = interseccao.posicao
          .clone()
          .sub(this.centro)
          .normalize();
        return true;
      }

      return false;
    }

    return false;
  }
}

class Triangle {
  constructor(v0, v1, v2) {
    this.v0 = v0;
    this.v1 = v1;
    this.v2 = v2;
  }

  interseccionar(raio, interseccao) {
    const epslon = 1e-8;
    let v0v1 = new THREE.Vector3(0.0, 0.0, 0.0);
    let v0v2 = new THREE.Vector3(0.0, 0.0, 0.0);
    let pvec = new THREE.Vector3(0.0, 0.0, 0.0);
    let tvec = new THREE.Vector3(0.0, 0.0, 0.0);
    let qvec = new THREE.Vector3(0.0, 0.0, 0.0);
    v0v1 = this.v1.clone().sub(this.v0);
    v0v2 = this.v2.clone().sub(this.v0);
    pvec = raio.direcao.clone().cross(v0v2);
    let det = v0v1.clone().dot(pvec);
    if (Math.abs(det) < epslon) return false;

    let invDet = 1 / det;
    tvec = raio.origem.clone().sub(this.v0);
    let u = tvec.dot(pvec) * invDet;
    if (u < 0 || u > 1) return false;

    qvec = tvec.cross(v0v1);
    let v = raio.direcao.dot(qvec) * invDet;
    if (v < 0 || v + u > 1) return false;

    interseccao.t = v0v2.clone().dot(qvec) * invDet;
    interseccao.posicao = raio.origem
      .clone()
      .add(raio.direcao.clone().multiplyScalar(interseccao.t));
    interseccao.normal = v0v2.cross(v0v1).normalize();
    return true;
  }
}

///////////////////////////////////////////////////////////////////////////////
// Classe que representa uma fonte de luz pontual.
// Construtor:
//   posicao: Posicao da fonte de luz pontual no espaco (THREE.Vector3).
//   cor: Cor da fonte de luz no formato RGB (THREE.Vector3).
///////////////////////////////////////////////////////////////////////////////
class Luz {
  constructor(posicao, cor) {
    this.posicao = posicao;
    this.cor = cor;
  }
}

///////////////////////////////////////////////////////////////////////////////
// Funcao que renderiza a cena utilizando ray tracing.
// Entrada:
//  Sem entradas.
// Retorno:
//   Sem retorno.
///////////////////////////////////////////////////////////////////////////////

function Render() {
  let camera = new Camera();
  let treeMiddle = new Triangle(
    new THREE.Vector3(-0.5, -1.0, -3.0),
    new THREE.Vector3(0.0, 2.0, -3.0),
    new THREE.Vector3(0.5, -1.0, -3.0)
  );

  let treeRight = new Triangle(
    new THREE.Vector3(0.5, -1.0, -3.0),
    new THREE.Vector3(0.0, 2.0, -3.0),
    new THREE.Vector3(1.5, -1.0, -4.5)
  );

  let treeLeft = new Triangle(
    new THREE.Vector3(-0.5, -1.0, -3.0),
    new THREE.Vector3(0.0, 2.0, -3.0),
    new THREE.Vector3(-1.5, -1.0, -4.5)
  );

  let treeLog = new Triangle(
    new THREE.Vector3(-0.5, -3.0, -6.0),
    new THREE.Vector3(0.0, 0.0, -6.0),
    new THREE.Vector3(0.5, -3.0, -6.0)
  );

  let ball0 = new Esfera(new THREE.Vector3(0.0, 2.0, -3.0), 0.1);
  let ball1 = new Esfera(new THREE.Vector3(0.0, 0.8, -3.0), 0.1);
  let ball2 = new Esfera(new THREE.Vector3(0.0, -0.5, -3.0), 0.1);
  let ball3 = new Esfera(new THREE.Vector3(-0.5, 0.2, -3.0), 0.1);
  let ball4 = new Esfera(new THREE.Vector3(-0.8, -0.6, -3.0), 0.1);
  let ball5 = new Esfera(new THREE.Vector3(0.5, 0.2, -3.0), 0.1);
  let ball6 = new Esfera(new THREE.Vector3(0.8, -0.6, -3.0), 0.1);

  let Ip = new Luz(
    new THREE.Vector3(0.0, 10.0, 8.0),
    new THREE.Vector3(1.0, 1.0, 1.0)
  );

  // Lacos que percorrem os pixels do sensor.
  for (let y = 0; y < 512; ++y) {
    for (let x = 0; x < 512; ++x) {
      let raio = camera.raio(x, y); // Construcao do raio primario que passa pelo centro do pixel de coordenadas (x,y).
      let interseccao = new Interseccao();

      if (treeLog.interseccionar(raio, interseccao)) {
        let ka = new THREE.Vector3(1.0, 1.0, 1.0); // Coeficiente de reflectancia ambiente.
        let kd = new THREE.Vector3(155 / 255, 103 / 255, 60 / 255); // Coeficiente de reflectancia difusa.
        let Ia = new THREE.Vector3(0.1, 0.1, 0.1); // Intensidade da luz ambiente.
        let ks = new THREE.Vector3(1.0, 1.0, 1.0);
        let termo_ambiente = Ia.clone().multiply(ka); // Calculo do termo ambiente do modelo local de iluminacao.
        let L = Ip.posicao.clone().sub(interseccao.posicao).normalize(); // Vetor que aponta para a fonte e luz pontual.
        let n = 32;
        let v = new THREE.Vector3()
          .subVectors(interseccao.posicao, raio.origem)
          .normalize();
        let r = L.clone().reflect(interseccao.normal).normalize();
        let termo_difuso = Ip.cor
          .clone()
          .multiply(kd)
          .multiplyScalar(Math.max(0.0, interseccao.normal.dot(L)));
        let termoEspecular = Ip.cor
          .clone()
          .multiply(ks)
          .multiplyScalar(Math.pow(Math.max(0.0, r.dot(v)), n));

        PutPixel(
          x,
          y,
          termo_difuso.add(termo_ambiente.add(termoEspecular)),
          "canvas"
        ); // Combina os termos difuso e ambiente e pinta o pixel.
      }

      if (treeRight.interseccionar(raio, interseccao)) {
        let ka = new THREE.Vector3(1.0, 1.0, 1.0); // Coeficiente de reflectancia ambiente.
        let kd = new THREE.Vector3(34 / 255, 139 / 255, 34 / 255); // Coeficiente de reflectancia difusa
        let Ia = new THREE.Vector3(0.1, 0.1, 0.1); // Intensidade da luz ambiente.
        let ks = new THREE.Vector3(1.0, 1.0, 1.0);
        let termo_ambiente = Ia.clone().multiply(ka); // Calculo do termo ambiente do modelo local de iluminacao.
        let L = Ip.posicao.clone().sub(interseccao.posicao).normalize(); // Vetor que aponta para a fonte e luz pontual.
        let n = 32;
        let v = new THREE.Vector3()
          .subVectors(interseccao.posicao, raio.origem)
          .normalize();
        let r = L.clone().reflect(interseccao.normal).normalize();
        let termo_difuso = Ip.cor
          .clone()
          .multiply(kd)
          .multiplyScalar(Math.max(0.0, interseccao.normal.dot(L)));

        let termoEspecular = Ip.cor
          .clone()
          .multiply(ks)
          .multiplyScalar(Math.pow(Math.max(0.0, r.dot(v)), n));

        PutPixel(
          x,
          y,
          termo_difuso.add(termo_ambiente.add(termoEspecular)),
          "canvas"
        ); // Combina os termos difuso e ambiente e pinta o pixel.
      }

      if (treeLeft.interseccionar(raio, interseccao)) {
        let ka = new THREE.Vector3(1.0, 1.0, 1.0); // Coeficiente de reflectancia ambiente.
        let kd = new THREE.Vector3(34 / 255, 139 / 255, 34 / 255); // Coeficiente de reflectancia difusa.
        let Ia = new THREE.Vector3(0.1, 0.3, 0.1); // Intensidade da luz ambiente.
        let ks = new THREE.Vector3(1.0, 1.0, 1.0);
        let termo_ambiente = Ia.clone().multiply(ka); // Calculo do termo ambiente do modelo local de iluminacao.
        let L = Ip.posicao.clone().sub(interseccao.posicao).normalize(); // Vetor que aponta para a fonte e luz pontual.
        let n = 32;
        let v = new THREE.Vector3()
          .subVectors(interseccao.posicao, raio.origem)
          .normalize();
        let r = L.clone().reflect(interseccao.normal).normalize();
        let termo_difuso = Ip.cor
          .clone()
          .multiply(kd)
          .multiplyScalar(Math.max(0.0, interseccao.normal.dot(L)));
        let termoEspecular = Ip.cor
          .clone()
          .multiply(ks)
          .multiplyScalar(Math.pow(Math.max(0.0, r.dot(v)), n));
        PutPixel(
          x,
          y,
          termo_difuso.add(termo_ambiente.add(termoEspecular)),
          "canvas"
        ); // Combina os termos difuso e ambiente e pinta o pixel.
      }

      if (treeMiddle.interseccionar(raio, interseccao)) {
        // Se houver interseccao entao...

        let ka = new THREE.Vector3(1.0, 1.0, 1.0); // Coeficiente de reflectancia ambiente.
        let kd = new THREE.Vector3(34 / 255, 139 / 255, 34 / 255); // Coeficiente de reflectancia difusa.
        let Ia = new THREE.Vector3(0.1, 0.3, 0.1); // Intensidade da luz ambiente.
        let ks = new THREE.Vector3(1.0, 1.0, 1.0);
        let termo_ambiente = Ia.clone().multiply(ka); // Calculo do termo ambiente do modelo local de iluminacao.
        let L = Ip.posicao.clone().sub(interseccao.posicao).normalize(); // Vetor que aponta para a fonte e luz pontual.
        let n = 32;
        let v = new THREE.Vector3()
          .subVectors(interseccao.posicao, raio.origem)
          .normalize();
        let r = L.clone().reflect(interseccao.normal).normalize();
        // Calculo do termo difuso do modelo local de iluminacao.
        let termo_difuso = Ip.cor
          .clone()
          .multiply(kd)
          .multiplyScalar(Math.max(0.0, interseccao.normal.dot(L)));

        let termoEspecular = Ip.cor
          .clone()
          .multiply(ks)
          .multiplyScalar(Math.pow(Math.max(0.0, r.dot(v)), n));

        PutPixel(
          x,
          y,
          termo_difuso.add(termo_ambiente.add(termoEspecular)),
          "canvas"
        ); // Combina os termos difuso e ambiente e pinta o pixel.
      }
      if (ball0.interseccionar(raio, interseccao)) {
        // Se houver interseccao entao...

        let ka = new THREE.Vector3(1.0, 1.0, 0.0); // Coeficiente de reflectancia ambiente.
        let kd = new THREE.Vector3(1.0, 1.0, 0.0); // Coeficiente de reflectancia difusa.
        let Ia = new THREE.Vector3(0.1, 0.1, 0.1); // Intensidade da luz ambiente.
        let ks = new THREE.Vector3(1.0, 1.0, 1.0);
        let termo_ambiente = Ia.clone().multiply(ka); // Calculo do termo ambiente do modelo local de iluminacao.
        let L = Ip.posicao.clone().sub(interseccao.posicao).normalize(); // Vetor que aponta para a fonte e luz pontual.
        let n = 32;
        let v = new THREE.Vector3()
          .subVectors(interseccao.posicao, raio.origem)
          .normalize();
        let r = L.clone().reflect(interseccao.normal).normalize();

        // Calculo do termo difuso do modelo local de iluminacao.
        let termo_difuso = Ip.cor
          .clone()
          .multiply(kd)
          .multiplyScalar(Math.max(0.0, interseccao.normal.dot(L)));

        let termoEspecular = Ip.cor
          .clone()
          .multiply(ks)
          .multiplyScalar(Math.pow(Math.max(0.0, r.dot(v)), n));

        PutPixel(
          x,
          y,
          termo_difuso.add(termo_ambiente.add(termoEspecular)),
          "canvas"
        ); // Combina os termos difuso e ambiente e pinta o pixel.
      }
      if (ball1.interseccionar(raio, interseccao)) {
        // Se houver interseccao entao...

        let ka = new THREE.Vector3(1.0, 0.0, 0.0); // Coeficiente de reflectancia ambiente.
        let kd = new THREE.Vector3(1.0, 0.0, 0.0); // Coeficiente de reflectancia difusa.
        let Ia = new THREE.Vector3(0.1, 0.1, 0.1); // Intensidade da luz ambiente.
        let ks = new THREE.Vector3(1.0, 1.0, 1.0);
        let termo_ambiente = Ia.clone().multiply(ka); // Calculo do termo ambiente do modelo local de iluminacao.
        let L = Ip.posicao.clone().sub(interseccao.posicao).normalize(); // Vetor que aponta para a fonte e luz pontual.
        let n = 32;
        let v = new THREE.Vector3()
          .subVectors(interseccao.posicao, raio.origem)
          .normalize();
        let r = L.clone().reflect(interseccao.normal).normalize();

        // Calculo do termo difuso do modelo local de iluminacao.
        let termo_difuso = Ip.cor
          .clone()
          .multiply(kd)
          .multiplyScalar(Math.max(0.0, interseccao.normal.dot(L)));

        let termoEspecular = Ip.cor
          .clone()
          .multiply(ks)
          .multiplyScalar(Math.pow(Math.max(0.0, r.dot(v)), n));

        PutPixel(
          x,
          y,
          termo_difuso.add(termo_ambiente.add(termoEspecular)),
          "canvas"
        ); // Combina os termos difuso e ambiente e pinta o pixel.
      }
      if (ball2.interseccionar(raio, interseccao)) {
        // Se houver interseccao entao...

        let ka = new THREE.Vector3(1.0, 0.0, 0.0); // Coeficiente de reflectancia ambiente.
        let kd = new THREE.Vector3(1.0, 0.0, 0.0); // Coeficiente de reflectancia difusa.
        let Ia = new THREE.Vector3(0.1, 0.1, 0.1); // Intensidade da luz ambiente.
        let ks = new THREE.Vector3(1.0, 1.0, 1.0);
        let termo_ambiente = Ia.clone().multiply(ka); // Calculo do termo ambiente do modelo local de iluminacao.
        let L = Ip.posicao.clone().sub(interseccao.posicao).normalize(); // Vetor que aponta para a fonte e luz pontual.
        let n = 32;
        let v = new THREE.Vector3()
          .subVectors(interseccao.posicao, raio.origem)
          .normalize();
        let r = L.clone().reflect(interseccao.normal).normalize();

        // Calculo do termo difuso do modelo local de iluminacao.
        let termo_difuso = Ip.cor
          .clone()
          .multiply(kd)
          .multiplyScalar(Math.max(0.0, interseccao.normal.dot(L)));

        let termoEspecular = Ip.cor
          .clone()
          .multiply(ks)
          .multiplyScalar(Math.pow(Math.max(0.0, r.dot(v)), n));

        PutPixel(
          x,
          y,
          termo_difuso.add(termo_ambiente.add(termoEspecular)),
          "canvas"
        ); // Combina os termos difuso e ambiente e pinta o pixel.
      }
      if (ball3.interseccionar(raio, interseccao)) {
        // Se houver interseccao entao...

        let ka = new THREE.Vector3(1.0, 0.0, 0.0); // Coeficiente de reflectancia ambiente.
        let kd = new THREE.Vector3(1.0, 0.0, 0.0); // Coeficiente de reflectancia difusa.
        let Ia = new THREE.Vector3(0.1, 0.1, 0.1); // Intensidade da luz ambiente.
        let ks = new THREE.Vector3(1.0, 1.0, 1.0);
        let termo_ambiente = Ia.clone().multiply(ka); // Calculo do termo ambiente do modelo local de iluminacao.
        let L = Ip.posicao.clone().sub(interseccao.posicao).normalize(); // Vetor que aponta para a fonte e luz pontual.
        let n = 32;
        let v = new THREE.Vector3()
          .subVectors(interseccao.posicao, raio.origem)
          .normalize();
        let r = L.clone().reflect(interseccao.normal).normalize();

        // Calculo do termo difuso do modelo local de iluminacao.
        let termo_difuso = Ip.cor
          .clone()
          .multiply(kd)
          .multiplyScalar(Math.max(0.0, interseccao.normal.dot(L)));

        let termoEspecular = Ip.cor
          .clone()
          .multiply(ks)
          .multiplyScalar(Math.pow(Math.max(0.0, r.dot(v)), n));

        PutPixel(
          x,
          y,
          termo_difuso.add(termo_ambiente.add(termoEspecular)),
          "canvas"
        ); // Combina os termos difuso e ambiente e pinta o pixel.
      }
      if (ball4.interseccionar(raio, interseccao)) {
        // Se houver interseccao entao...

        let ka = new THREE.Vector3(1.0, 0.0, 0.0); // Coeficiente de reflectancia ambiente.
        let kd = new THREE.Vector3(1.0, 0.0, 0.0); // Coeficiente de reflectancia difusa.
        let Ia = new THREE.Vector3(0.1, 0.1, 0.1); // Intensidade da luz ambiente.
        let ks = new THREE.Vector3(1.0, 1.0, 1.0);
        let termo_ambiente = Ia.clone().multiply(ka); // Calculo do termo ambiente do modelo local de iluminacao.
        let L = Ip.posicao.clone().sub(interseccao.posicao).normalize(); // Vetor que aponta para a fonte e luz pontual.
        let n = 32;
        let v = new THREE.Vector3()
          .subVectors(interseccao.posicao, raio.origem)
          .normalize();
        let r = L.clone().reflect(interseccao.normal).normalize();

        // Calculo do termo difuso do modelo local de iluminacao.
        let termo_difuso = Ip.cor
          .clone()
          .multiply(kd)
          .multiplyScalar(Math.max(0.0, interseccao.normal.dot(L)));

        let termoEspecular = Ip.cor
          .clone()
          .multiply(ks)
          .multiplyScalar(Math.pow(Math.max(0.0, r.dot(v)), n));

        PutPixel(
          x,
          y,
          termo_difuso.add(termo_ambiente.add(termoEspecular)),
          "canvas"
        ); // Combina os termos difuso e ambiente e pinta o pixel.
      }
      if (ball5.interseccionar(raio, interseccao)) {
        // Se houver interseccao entao...

        let ka = new THREE.Vector3(1.0, 0.0, 0.0); // Coeficiente de reflectancia ambiente.
        let kd = new THREE.Vector3(1.0, 0.0, 0.0); // Coeficiente de reflectancia difusa.
        let Ia = new THREE.Vector3(0.1, 0.1, 0.1); // Intensidade da luz ambiente.
        let ks = new THREE.Vector3(1.0, 1.0, 1.0);
        let termo_ambiente = Ia.clone().multiply(ka); // Calculo do termo ambiente do modelo local de iluminacao.
        let L = Ip.posicao.clone().sub(interseccao.posicao).normalize(); // Vetor que aponta para a fonte e luz pontual.
        let n = 32;
        let v = new THREE.Vector3()
          .subVectors(interseccao.posicao, raio.origem)
          .normalize();
        let r = L.clone().reflect(interseccao.normal).normalize();

        // Calculo do termo difuso do modelo local de iluminacao.
        let termo_difuso = Ip.cor
          .clone()
          .multiply(kd)
          .multiplyScalar(Math.max(0.0, interseccao.normal.dot(L)));

        let termoEspecular = Ip.cor
          .clone()
          .multiply(ks)
          .multiplyScalar(Math.pow(Math.max(0.0, r.dot(v)), n));

        PutPixel(
          x,
          y,
          termo_difuso.add(termo_ambiente.add(termoEspecular)),
          "canvas"
        ); // Combina os termos difuso e ambiente e pinta o pixel.
      }
      if (ball6.interseccionar(raio, interseccao)) {
        // Se houver interseccao entao...

        let ka = new THREE.Vector3(1.0, 0.0, 0.0); // Coeficiente de reflectancia ambiente.
        let kd = new THREE.Vector3(1.0, 0.0, 0.0); // Coeficiente de reflectancia difusa.
        let Ia = new THREE.Vector3(0.1, 0.1, 0.1); // Intensidade da luz ambiente.
        let ks = new THREE.Vector3(1.0, 1.0, 1.0);
        let termo_ambiente = Ia.clone().multiply(ka); // Calculo do termo ambiente do modelo local de iluminacao.
        let L = Ip.posicao.clone().sub(interseccao.posicao).normalize(); // Vetor que aponta para a fonte e luz pontual.
        let n = 32;
        let v = new THREE.Vector3()
          .subVectors(interseccao.posicao, raio.origem)
          .normalize();
        let r = L.clone().reflect(interseccao.normal).normalize();

        // Calculo do termo difuso do modelo local de iluminacao.
        let termo_difuso = Ip.cor
          .clone()
          .multiply(kd)
          .multiplyScalar(Math.max(0.0, interseccao.normal.dot(L)));

        let termoEspecular = Ip.cor
          .clone()
          .multiply(ks)
          .multiplyScalar(Math.pow(Math.max(0.0, r.dot(v)), n));

        PutPixel(
          x,
          y,
          termo_difuso.add(termo_ambiente.add(termoEspecular)),
          "canvas"
        ); // Combina os termos difuso e ambiente e pinta o pixel.
      }
    }
  }
}

Render(); // Invoca o ray tracer para o triangulo.
