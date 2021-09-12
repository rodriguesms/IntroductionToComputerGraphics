import Canvas from '../module.js';

function MidPointLineAlgorithm(x0, y0, x1, y1, color_0, color_1, canvas_id="midpoint-canvas") {

  console.log(x0, y0, x1, y1, color_0, color_1, canvas_id);

  let midpoint = new Canvas(canvas_id);
  midpoint.clear();

  var dx = Math.abs(x1 - x0);
  var sx = (x0 < x1) ? 1 : -1;
  var dy = -Math.abs(y1-y0);
  var sy = (y0 < y1) ? 1: -1;
  var err = dx + dy;

  const dR = Math.abs(color_0[0] - color_1[0]);
  const dG = Math.abs(color_0[1] - color_1[1]);
  const dB = Math.abs(color_0[2] - color_1[2]);
  const dA = Math.abs(color_0[3] - color_1[3]);

  const lineSize = (Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy));

  console.log(`lineSize: ${lineSize}`);

  var cont = 0;

  // Initializing variables with default color values at starting point 
  var r = color_0[0];
  var g = color_0[1];
  var b = color_0[2];
  var a = color_0[3];

  while(1){

    color_0[0] > color_1[0] ?   
      r = Math.abs(Math.floor((dR*(cont/lineSize) - color_0[0]))) : 
      r = Math.abs(Math.floor((dR*(cont/lineSize) + color_0[0])));

    color_0[1] > color_1[1] ?
      g = Math.abs(Math.floor((dG*(cont/lineSize) - color_0[1]))) :
      g = Math.abs(Math.floor((dG*(cont/lineSize) + color_0[1])));

    color_0[2] > color_1[2] ?
      b = Math.abs(Math.floor((dB*(cont/lineSize) - color_0[2]))) :
      b = Math.abs(Math.floor((dB*(cont/lineSize) + color_0[2])))

    color_0[3] > color_1[3] ?
      a = Math.abs(Math.floor((dA*(cont/lineSize) - color_0[3]))) :
      a = Math.abs(Math.floor((dA*(cont/lineSize) + color_0[3])))

    console.log(r, g, b, a)

    var pointColor = [r, g, b, a];


    midpoint.putPixel(x0, y0, pointColor);

    if(x0==x1 && y0==y1){
      console.log(`cont: ${cont}`);
      break;
    }

    cont++;

    var e2 = 2*err;
    if(e2 >= dy){
      err += dy;
      x0 += sx;
    }
    if(e2 <= dx){
      err += dx;
      y0 += sy;
    }
  }
}

function DrawTriangle(x0, y0, x1, y1, x2, y2, color_0, color_1, color_2) {

  MidPointLineAlgorithm(x0, y0, x1, y1, color_0, color_1, "triangle-canvas");
  MidPointLineAlgorithm(x1, y1, x2, y2, color_1, color_2, "triangle-canvas");
  MidPointLineAlgorithm(x2, y2, x0, y0, color_2, color_0, "triangle-canvas");

}

MidPointLineAlgorithm(25, 30, 100, 80, [255,0,0,255], [255,255,0,255]);
DrawTriangle(25, 30, 50, 100, 100, 15, [255,0,0,255], [0,0,255,255], [0,255,0,255]);

export { MidPointLineAlgorithm, DrawTriangle }