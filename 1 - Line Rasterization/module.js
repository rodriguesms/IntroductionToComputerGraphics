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
		this.context.fillStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + color[3]/255 + ')'; // Considerando RGBA, ao invés de RGB => Note que o valor de A, varia de 0 a 1
		this.context.fillRect(x, (this.canvas.height - 1) - y, 1, 1);
	}
}

// MAIN CLASS

export default Canvas;