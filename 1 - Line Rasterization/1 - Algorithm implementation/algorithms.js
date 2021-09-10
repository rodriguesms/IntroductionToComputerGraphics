class Canvas {
  constructor(canvas_id) {
    this.canvas = document.getElementById(canvas_id);
    this.context = this.canvas.getContext("2d");
    this.clear_color = 'rgba(0,0,0,255)';
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


let color_buffer = new Canvas("midpoint-canvas");
color_buffer.clear();

function MidPointLineAlgorithm(x0, y0, x1, y1, color_0, color_1) {
	// Escreva seu código aqui!
  
  // Exemplo de código para acender pixels no canvas:
  let dx = Math.abs(x1 - x0);
  let dy = -Math.abs(y1 - y0);
  let sx = (x1 > x0) ? 1 : -1;
  let sy = (y1 - y0) ? 1 : -1;
  let error = dx + dy;
  while(1)
  {
    color_buffer.putPixel(x0, y0);
    if(x0 == x1 && y0 == y1) 
      break;
    error2 = 2 * error;
    if(error2 >= dy)
    {
      error += dy;
      x0 += sx;
    }
    if(e2 <= dx)
    {
      error += dx;
      y0 += sy;
    }
  }
}

function DrawTriangle(x0, y0, x1, y1, x2, y2, color_0, color_1, color_2) {
	// Escreva seu código aqui!  
}

MidPointLineAlgorithm(20, 10, 80, 30, [255,255,0,255]);
DrawTriangle();
