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
	// Escreva seu código aqui!
  
  // Exemplo de código para acender pixels no canvas:
  for (let y = y0; y < y1; ++y)
    for (let x = x0; x < x1; ++x)
      color_buffer.putPixel(x, y, color_0); 

}

function DrawTriangle(x0, y0, x1, y1, x2, y2, color_0, color_1, color_2) {
	// Escreva seu código aqui!  
}

MidPointLineAlgorithm(20, 10, 80, 30, [255,255,0,255]);
DrawTriangle();
