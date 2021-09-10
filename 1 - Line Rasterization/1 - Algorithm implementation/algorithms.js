class Canvas {
  constructor(canvas_id) {
    console.log(canvas_id)
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

console.log("carregou")

let color_buffer = new Canvas("midpoint-canvas");
color_buffer.clear();

function MidPointLineAlgorithm(x0, y0, x1, y1, color_0, color_1) {

  var dx = Math.abs(x1 - x0);
  var sx = (x0 < x1) ? 1 : -1;
  var dy = -Math.abs(y1-y0);
  var sy = (y0 < y1) ? 1: -1;
  var err = dx + dy;

  while(1){
    color_buffer.putPixel(x0, y0, color_0);
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
	// Escreva seu código aqui!  
}

MidPointLineAlgorithm(300, 150, 20, 260, [255,255,0,255]);
DrawTriangle();
