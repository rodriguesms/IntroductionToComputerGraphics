class Canvas {
  constructor(canvas_id) {
    this.canvas = document.getElementById(canvas_id);
    this.context = this.canvas.getContext("2d");
    this.clear_color = 'rgba(0,0,0,0)';
  }

  clear() {
    this.context.fillStyle = this.clear_color;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  putPixel(x, y, color) {
    this.context.fillStyle = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
    this.context.fillRect(x, (this.canvas.height - 1) - y, 1, 1);
  }
}



function MidPointLineAlgorithm(x0, y0, x1, y1, color_0, color_1, canvas_id="midpoint-canvas") {

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

  const lineSize = Math.round(Math.sqrt(Math.pow(dx, 2)  + Math.pow(dy, 2)));

  var cont = 0;

  var r = color_0[0];
  var g = color_0[1];
  var b = color_0[2];
  var a = color_0[3];

  while(1){

    r = Math.floor((dR*(cont/lineSize) + color_0[0]));
    g = Math.floor((dG*(cont/lineSize) + color_0[1]));
    b = Math.floor((dB*(cont/lineSize) + color_0[2]));
    a = Math.floor((dA*(cont/lineSize) + color_0[3]));

    var pointColor = [r, g, b, a];

    midpoint.putPixel(x0, y0, pointColor);
    cont++;
    if(x0==x1 && y0==y1){
      break;
    }
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