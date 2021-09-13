import Canvas from '../module.js'

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

  let isBigger = []; 

  isBigger[0] = (color_0[0] > color_1[0]) ? -1 : 1; 
  isBigger[1] = (color_0[1] > color_1[1]) ? -1 : 1; 
  isBigger[2] = (color_0[2] > color_1[2]) ? -1 : 1; 
  isBigger[3] = (color_0[3] > color_1[3]) ? -1 : 1; 
 
  while(1){ 
  
    r = Math.abs(Math.floor((dR*(cont/lineSize) + isBigger[0] * color_0[0]))); 
    g = Math.abs(Math.floor((dG*(cont/lineSize) + isBigger[1] * color_0[1]))); 
    b = Math.abs(Math.floor((dB*(cont/lineSize) + isBigger[2] * color_0[2]))); 
    a = Math.abs(Math.floor((dA*(cont/lineSize) + isBigger[3] * color_0[3])));

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

function DrawTriangle(x0, y0, x1, y1, x2, y2, color_0, color_1, color_2, canvas_id) {

  MidPointLineAlgorithm(x0, y0, x1, y1, color_0, color_1, canvas_id);
  MidPointLineAlgorithm(x1, y1, x2, y2, color_1, color_2, canvas_id);
  MidPointLineAlgorithm(x2, y2, x0, y0, color_2, color_0, canvas_id);

}


const butterfly = () => {

	DrawTriangle(75, 125, 95, 170, 87, 130, [255, 255, 255, 255], [200, 200, 200, 255], [150, 150, 150, 255], 'butterfly');	
	DrawTriangle(75, 125, 87, 130, 120, 110, [255, 255, 255, 255], [200, 200, 200, 255], [150, 150, 150, 255], 'butterfly');	
	MidPointLineAlgorithm(120, 110, 85, 90, [255, 255, 255, 255], [150, 150, 150, 255], 'butterfly');
	MidPointLineAlgorithm(85, 90, 95, 65, [255, 255, 255, 255], [150, 150, 150, 255], 'butterfly');
	MidPointLineAlgorithm(130, 110, 95, 170, [255, 255, 255, 255], [150, 150, 150, 255], 'butterfly');
	
	DrawTriangle(95, 65, 130, 110, 115, 75, [255, 255, 255, 255], [200, 200, 200, 255], [150, 150, 150, 255], 'butterfly');	

	MidPointLineAlgorithm(136, 115, 118, 145, [255, 255, 255, 255], [150, 150, 150, 255], 'butterfly');
	MidPointLineAlgorithm(136, 115, 154, 145, [255, 255, 255, 255], [150, 150, 150, 255], 'butterfly');

	MidPointLineAlgorithm(142, 110, 180, 170, [255, 255, 255, 255], [150, 150, 150, 255], 'butterfly');
	DrawTriangle(142, 110, 175, 65, 154, 75, [255, 255, 255, 255], [200, 200, 200, 255], [150, 150, 150, 255], 'butterfly');
	MidPointLineAlgorithm(175, 65, 190, 90, [255, 255, 255, 255], [150, 150, 150, 255], 'butterfly');
	MidPointLineAlgorithm(190, 90, 152, 110, [255, 255, 255, 255], [150, 150, 150, 255], 'butterfly');
	DrawTriangle(152, 110, 195, 125, 185, 135, [255, 255, 255, 255], [200, 200, 200, 255], [150, 150, 150, 255], 'butterfly');
	DrawTriangle(195, 125, 180, 170, 185, 135, [255, 255, 255, 255], [200, 200, 200, 255], [150, 150, 150, 255], 'butterfly');

}

const cloak = () => {

	MidPointLineAlgorithm(90, 95, 60, 80, [255, 255, 255, 255], [150, 150, 150, 255], 'draw');
	MidPointLineAlgorithm(90, 95, 110, 100, [255, 255, 255, 255], [150, 150, 150, 255], 'draw');
	MidPointLineAlgorithm(115, 96, 95, 110, [255, 255, 255, 255], [150, 150, 150, 255], 'draw');
	MidPointLineAlgorithm(95, 110, 105, 125, [255, 255, 255, 255], [150, 150, 150, 255], 'draw');
	MidPointLineAlgorithm(105, 125, 110, 155, [255, 255, 255, 255], [150, 150, 150, 255], 'draw');
	MidPointLineAlgorithm(110, 155, 108, 170, [255, 255, 255, 255], [150, 150, 150, 255], 'draw');
	MidPointLineAlgorithm(108, 170, 112, 190, [255, 255, 255, 255], [150, 150, 150, 255], 'draw');
	MidPointLineAlgorithm(112, 190, 120, 200, [255, 255, 255, 255], [150, 150, 150, 255], 'draw');
	MidPointLineAlgorithm(120, 200, 140, 208, [255, 255, 255, 255], [150, 150, 150, 255], 'draw');
	MidPointLineAlgorithm(140, 208, 160, 205, [255, 255, 255, 255], [150, 150, 150, 255], 'draw');
	MidPointLineAlgorithm(160, 205, 180, 200, [255, 255, 255, 255], [150, 150, 150, 255], 'draw');
	MidPointLineAlgorithm(180, 200, 185, 190, [255, 255, 255, 255], [150, 150, 150, 255], 'draw');
	MidPointLineAlgorithm(185, 190, 190, 170, [255, 255, 255, 255], [150, 150, 150, 255], 'draw');
	MidPointLineAlgorithm(185, 190, 190, 170, [255, 255, 255, 255], [150, 150, 150, 255], 'draw');
	MidPointLineAlgorithm(190, 170, 192, 140, [255, 255, 255, 255], [150, 150, 150, 255], 'draw');
	MidPointLineAlgorithm(192, 140, 200, 115, [255, 255, 255, 255], [150, 150, 150, 255], 'draw');
	MidPointLineAlgorithm(200, 115, 180, 95, [255, 255, 255, 255], [150, 150, 150, 255], 'draw');
	MidPointLineAlgorithm(190, 105, 210, 95, [255, 255, 255, 255], [150, 150, 150, 255], 'draw');
	MidPointLineAlgorithm(210, 95, 225, 85, [255, 255, 255, 255], [150, 150, 150, 255], 'draw');


	MidPointLineAlgorithm(125, 95, 115, 130, [255, 255, 255, 255], [150, 150, 150, 255], 'draw');
	MidPointLineAlgorithm(115, 130, 135, 185, [255, 255, 255, 255], [150, 150, 150, 255], 'draw');
	MidPointLineAlgorithm(135, 185, 175, 160, [255, 255, 255, 255], [150, 150, 150, 255], 'draw');
	MidPointLineAlgorithm(175, 160, 185, 120, [255, 255, 255, 255], [150, 150, 150, 255], 'draw');
	MidPointLineAlgorithm(175, 160, 185, 120, [255, 255, 255, 255], [150, 150, 150, 255], 'draw');
	MidPointLineAlgorithm(185, 120, 165, 90, [255, 255, 255, 255], [150, 150, 150, 255], 'draw');	
}

const face = () => {

	MidPointLineAlgorithm(130, 152, 145, 153, [139, 0, 0, 50], [139, 0, 0, 50], 'draw');
	MidPointLineAlgorithm(133, 158, 145, 143, [244, 0, 42, 255], [255, 17, 0, 255], 'draw');
	MidPointLineAlgorithm(145, 160, 130, 145, [244, 0, 42, 255], [255, 17, 0, 255], 'draw');
	MidPointLineAlgorithm(145, 160, 130, 145, [161, 40, 48, 255], [161, 40, 48, 255], 'draw');

	MidPointLineAlgorithm(160, 153, 174, 153, [139, 0, 0, 50], [139, 0, 0, 50], 'draw');
	MidPointLineAlgorithm(160, 160, 175, 145, [244, 0, 42, 255], [255, 17, 0, 255], 'draw');
	MidPointLineAlgorithm(172, 158, 160, 141, [244, 0, 42, 255], [255, 17, 0, 255], 'draw');
	MidPointLineAlgorithm(145, 160, 130, 145, [161, 40, 48, 255], [161, 40, 48, 255], 'draw');

	MidPointLineAlgorithm(125, 130, 130, 125, [255, 99, 71, 255], [255, 99, 71, 255], 'draw');
	MidPointLineAlgorithm(130, 125, 140, 120, [255, 99, 71, 255], [255, 215, 0, 255], 'draw');
	MidPointLineAlgorithm(140, 120, 155, 120, [255, 215, 0, 255], [255, 215, 0, 255], 'draw');
	MidPointLineAlgorithm(155, 120, 165, 125, [255, 215, 0, 255], [255, 99, 71, 255], 'draw');
	MidPointLineAlgorithm(165, 125, 170, 130, [255, 99, 71, 255], [255, 99, 71, 255], 'draw');

	MidPointLineAlgorithm(125, 130, 130, 115, [255, 99, 71, 255], [255, 99, 71, 255], 'draw');
	MidPointLineAlgorithm(130, 115, 140, 110, [255, 99, 71, 255], [255, 215, 0, 255], 'draw');
	MidPointLineAlgorithm(130, 115, 140, 110, [255, 99, 71, 255], [255, 215, 0, 255], 'draw');

	MidPointLineAlgorithm(150, 110, 155, 110, [255, 99, 71, 255], [255, 215, 0, 255], 'draw');
	MidPointLineAlgorithm(155, 110, 165, 115, [255, 99, 71, 255], [255, 215, 0, 255], 'draw');

	MidPointLineAlgorithm(155, 110, 165, 115, [255, 99, 71, 255], [255, 215, 0, 255], 'draw');
	MidPointLineAlgorithm(165, 115, 170, 130, [255, 99, 71, 255], [255, 215, 0, 255], 'draw');

	MidPointLineAlgorithm(165, 130, 170, 115, [255, 99, 71, 255], [255, 215, 0, 255], 'draw');
	MidPointLineAlgorithm(169, 132, 160, 110, [255, 99, 71, 255], [255, 215, 0, 255], 'draw');
	MidPointLineAlgorithm(155, 125, 155, 108, [255, 99, 71, 255], [255, 215, 0, 255], 'draw');
	MidPointLineAlgorithm(150, 125, 150, 108, [255, 99, 71, 255], [255, 215, 0, 255], 'draw');
	MidPointLineAlgorithm(145, 125, 140, 108, [255, 99, 71, 255], [255, 215, 0, 255], 'draw');
	MidPointLineAlgorithm(135, 125, 140, 108, [255, 99, 71, 255], [255, 215, 0, 255], 'draw');
	MidPointLineAlgorithm(130, 130, 136, 108, [255, 99, 71, 255], [255, 215, 0, 255], 'draw');
	MidPointLineAlgorithm(128, 130, 130, 108, [255, 99, 71, 255], [255, 215, 0, 255], 'draw');

	

}

const hand = () => {

	MidPointLineAlgorithm(150, 72, 142, 110, [255, 165, 0, 255], [255, 69, 0, 255], 'draw');
	MidPointLineAlgorithm(142, 110, 142, 115, [255, 69, 0, 255], [255, 69, 0, 255], 'draw');
	MidPointLineAlgorithm(142, 115, 147, 115, [255, 69, 0, 255], [255, 69, 0, 255], 'draw');
	MidPointLineAlgorithm(147, 115, 160, 72, [255, 69, 0, 255], [255, 165, 0, 255], 'draw');

	MidPointLineAlgorithm(120, 80, 125, 75, [255, 165, 0, 255], [255, 69, 0, 255], 'draw');
	MidPointLineAlgorithm(120, 80, 125, 85, [255, 69, 0, 255], [255, 69, 0, 255], 'draw');
	MidPointLineAlgorithm(125, 85, 130, 80, [255, 69, 0, 255], [255, 165, 0, 255], 'draw');

	MidPointLineAlgorithm(152, 72, 130, 80, [255, 165, 0, 255],[255, 165, 0, 255], 'draw');
	MidPointLineAlgorithm(130, 80, 115, 65, [255, 165, 0, 255], [255, 69, 0, 255], 'draw');
	MidPointLineAlgorithm(115, 65, 130, 35, [255, 69, 0, 255], [255, 69, 0, 255], 'draw');
	MidPointLineAlgorithm(130, 35, 145, 45, [255, 69, 0, 255], [255, 165, 0, 255], 'draw');
	MidPointLineAlgorithm(145, 45, 155, 35, [255, 165, 0, 255], [255, 165, 0, 255], 'draw');
	MidPointLineAlgorithm(155, 35, 165, 35, [255, 165, 0, 255], [255, 165, 0, 255], 'draw');
	MidPointLineAlgorithm(165, 35, 175, 20, [255, 165, 0, 255], [255, 69, 0, 255], 'draw');
	MidPointLineAlgorithm(175, 20, 190, 30, [255, 69, 0, 255], [255, 69, 0, 255], 'draw');
	MidPointLineAlgorithm(190, 30, 185, 55, [255, 69, 0, 255], [255, 69, 0, 255], 'draw');
	MidPointLineAlgorithm(185, 55, 160, 72, [255, 69, 0, 255], [255, 165, 0, 255], 'draw');

}

butterfly();

cloak();
face();
hand();