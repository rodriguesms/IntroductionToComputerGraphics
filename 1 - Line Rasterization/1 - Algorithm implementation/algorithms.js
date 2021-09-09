let color_buffer = new Canvas("canvas");
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
