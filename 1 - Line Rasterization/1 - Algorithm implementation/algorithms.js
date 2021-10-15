import Canvas from '../module.js';

export function MidPointLineAlgorithm(x0, y0, x1, y1, color_0, color_1, canvas_id="midpoint-canvas") {

  let midpoint = new Canvas(canvas_id);
  midpoint.clear();

  var dx = Math.abs(x1 - x0); // Variação do ponto em relação ao eixo X
  var sx = (x0 < x1) ? 1 : -1; // Sentido do prolongamento da reta em relação ao eixo horizontal

  var dy = -Math.abs(y1-y0); // Variação do ponto em relação ao eixo y
  var sy = (y0 < y1) ? 1: -1; // Sentido do prolongamento da reta em relação ao eixo vertical
  
  var err = dx + dy; // O erro que serve para verificar a posição do próximo pixel a ser desenhado

  // Variação dos canais de cores e opacidade
  const dR = Math.abs(color_0[0] - color_1[0]); 
  const dG = Math.abs(color_0[1] - color_1[1]);
  const dB = Math.abs(color_0[2] - color_1[2]);
  const dA = Math.abs(color_0[3] - color_1[3]);

  const lineSize = (Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy)); // tamanho da linha => se dá através do maior valor de pixels ao longo do maior eixo

  var cont = 0; // checa a posição em relação ao tamanho da linha

  // Inicializando as variáveis de cores a serem usadas em cada ponto como o valor do canal de cor inicial (color_0)
  var r = color_0[0];
  var g = color_0[1];
  var b = color_0[2];
  var a = color_0[3];

  let isBigger = []; // Array que vai guardar a informação de cada canal de cor a respeito do crescimento ou decrescimento em relação à gama de cores (eg: se o valor da cor deve ser diminuido ou acrescido)
  isBigger[0] = (color_0[0] > color_1[0]) ? -1 : 1; 
  isBigger[1] = (color_0[1] > color_1[1]) ? -1 : 1; 
  isBigger[2] = (color_0[2] > color_1[2]) ? -1 : 1; 
  isBigger[3] = (color_0[3] > color_1[3]) ? -1 : 1; 
 // Para cada cor e para a opacidade, se guarda a informação se ela vai ser aumentada ou decrescida em relação ao ponto de início e fim 


  while(1){ 
  
    // Para cada ponto, se checa o valor de cada canal de cor, isto é, o quanto ele deve ser alterado, ao longo da linha
    r = Math.abs(Math.floor((dR*(cont/lineSize) + isBigger[0] * color_0[0]))); 
    g = Math.abs(Math.floor((dG*(cont/lineSize) + isBigger[1] * color_0[1]))); 
    b = Math.abs(Math.floor((dB*(cont/lineSize) + isBigger[2] * color_0[2]))); 
    a = Math.abs(Math.floor((dA*(cont/lineSize) + isBigger[3] * color_0[3])));
    // Se o valor de color_1[x] for menor do que o color_0[x], o isBigger identifica e subtrai ao invés de somar

    midpoint.putPixel(x0, y0, [r, g, b, a]); // Após o processamento de cores, identifica o ponto em questão, e aplica a cor

    if(x0==x1 && y0==y1){ // se o ponto atual e o de chegada forem iguais -> chegou no destino = break
      break;
    }
    
    cont++;

    var e2 = 2*err;//O uso de e2 permite com que os cálculos realizados sejam puramente entre números inteiros
    if(e2 >= dy){//e_xy + e_x > 0 => modificação na coordenada x do próximo pixel a ser rasterizado
      err += dy;
      x0 += sx;
    }
    if(e2 <= dx){//e_xy + e_y < 0 => modificação na coordenada y do próximo pixel a ser rasterizado
      err += dx;
      y0 += sy;
    }
  }
}

export function DrawTriangle(x0, y0, x1, y1, x2, y2, color_0, color_1, color_2) {

  MidPointLineAlgorithm(x0, y0, x1, y1, color_0, color_1, "triangle-canvas");
  MidPointLineAlgorithm(x1, y1, x2, y2, color_1, color_2, "triangle-canvas");
  MidPointLineAlgorithm(x2, y2, x0, y0, color_2, color_0, "triangle-canvas");

}
