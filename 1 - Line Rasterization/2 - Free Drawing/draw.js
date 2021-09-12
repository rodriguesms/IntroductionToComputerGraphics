import Canvas from '../module.js'

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

	const lineSize = (Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy));

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

		var pointColor = [r, g, b, a];

		midpoint.putPixel(x0, y0, pointColor);

		if(x0==x1 && y0==y1){
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

const Chara = () => {
	//rgb(141, 79, 44) hair
	//rgb(247, 204, 43) skin
	//HAIR
	MidPointLineAlgorithm(50, 50, 50, 80, [141, 79, 44, 255], [141, 79, 44, 255], 'chara');
	MidPointLineAlgorithm(50, 50, 55, 50, [141, 79, 44, 255], [141, 79, 44, 255], 'chara');
	MidPointLineAlgorithm(55, 50, 55, 45, [141, 79, 44, 255], [141, 79, 44, 255], 'chara');
	MidPointLineAlgorithm(55, 45, 60, 45, [141, 79, 44, 255], [141, 79, 44, 255], 'chara');
	MidPointLineAlgorithm(60, 45, 60, 50, [141, 79, 44, 255], [141, 79, 44, 255], 'chara');
	MidPointLineAlgorithm(60, 50, 65, 50, [141, 79, 44, 255], [141, 79, 44, 255], 'chara');
	MidPointLineAlgorithm(65, 50, 65, 45, [141, 79, 44, 255], [141, 79, 44, 255], 'chara');
	MidPointLineAlgorithm(65, 45, 95, 45, [141, 79, 44, 255], [141, 79, 44, 255], 'chara');

	//FACE
	MidPointLineAlgorithm(95, 40, 95, 50, [247, 204, 43, 255], [247, 204, 43, 255], 'chara');
	MidPointLineAlgorithm(95, 50, 80, 50, [247, 204, 43, 255], [247, 204, 43, 255], 'chara');
	MidPointLineAlgorithm(80, 50, 80, 55, [247, 204, 43, 255], [247, 204, 43, 255], 'chara');
	MidPointLineAlgorithm(80, 55, 70, 55, [247, 204, 43, 255], [247, 204, 43, 255], 'chara');
	MidPointLineAlgorithm(70, 55, 70, 60, [247, 204, 43, 255], [247, 204, 43, 255], 'chara');
	MidPointLineAlgorithm(70, 60, 65, 60, [247, 204, 43, 255], [247, 204, 43, 255], 'chara');
	MidPointLineAlgorithm(65, 60, 65, 70, [247, 204, 43, 255], [247, 204, 43, 255], 'chara');

}
Chara()
