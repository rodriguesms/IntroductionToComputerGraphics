const drawOuterCircle = () => {
    let outerCircle = document.getElementById('canvas').getContext('2d');
    outerCircle.beginPath();
    outerCircle.arc(350, 200, 180, 0, Math.PI*2);

    //outerCircle.fillStyle = '#191919';
    //outerCircle.fill();
    
    outerCircle.lineWidth = 5;
    outerCircle.strokeStyle = '#FF0000';
    outerCircle.stroke();
}

const drawInnerCircle = () => {
    let innerCircle = document.getElementById('canvas').getContext('2d');
    innerCircle.beginPath();
    innerCircle.arc(350, 200, 140, 0, Math.PI*2);

    innerCircle.lineWidth =5;
    innerCircle.strokeStyle = '#FF0000';
    innerCircle.stroke();
}

const drawMainTriangle = () => {
    let mainTriangle = document.getElementById('canvas').getContext('2d');
    mainTriangle.beginPath();
    
    mainTriangle.moveTo(259, 298);
    mainTriangle.lineTo(445, 298);
    mainTriangle.lineTo(350, 65);
    mainTriangle.closePath();

    mainTriangle.lineWidth = 5;
    mainTriangle.strokeStyle = "#FF0000";
    mainTriangle.stroke();
}

const drawElipseEye = () => {
    let ellipse = document.getElementById('canvas').getContext('2d');
    ellipse.beginPath();
    ellipse.ellipse(350, 130, 25, 10, 0, 0, 2*Math.PI)
    ellipse.lineWidth = 4;
    ellipse.strokeStyle = "#FF0000";
    ellipse.stroke();
}

const drawMainCurves = () => {
    let curves = document.getElementById('canvas').getContext('2d');
    curves.beginPath();
    
    curves.moveTo(360, 90);
    curves.bezierCurveTo(330, 90, 335, 115, 350, 120);
    
    curves.moveTo(360, 140);
    curves.bezierCurveTo(380, 150, 390, 170, 350, 180);
    
    curves.moveTo(350, 180);
    curves.bezierCurveTo(280, 190, 290, 250, 400, 240);
    
    curves.moveTo(350, 240);
    curves.quadraticCurveTo(340, 265, 350, 300);

    curves.moveTo(310, 270);
    curves.lineTo(380, 270);

    curves.moveTo(290, 270);
    curves.lineTo(295, 270)

    curves.moveTo(395, 270);
    curves.lineTo(400, 270)


    curves.strokeStyle = '#FF0000';
    curves.lineWidth = 4;
    curves.stroke();
}

const drawOuterCurves = () => {
    let outerCurves = document.getElementById('canvas').getContext('2d');
    outerCurves.beginPath();

    outerCurves.moveTo(336, 60);
    outerCurves.lineTo(342, 40);
    outerCurves.lineTo(336, 20)
    
    outerCurves.moveTo(350, 20);
    outerCurves.quadraticCurveTo(360, 25, 355, 40);

    outerCurves.moveTo(270, 40);
    outerCurves.bezierCurveTo(300, 40, 280, 50, 290, 75);

    outerCurves.moveTo(260, 42);
    outerCurves.bezierCurveTo(260, 65, 285, 50, 260, 95);

    outerCurves.moveTo(235, 60);
    outerCurves.quadraticCurveTo(220, 95, 245, 110);

    outerCurves.moveTo(220, 75);
    outerCurves.quadraticCurveTo(200, 95, 230, 125);

    outerCurves.moveTo(170, 190);
    outerCurves.lineTo(210, 190);

    outerCurves.moveTo(170, 200);
    outerCurves.lineTo(188, 200);
    outerCurves.moveTo(200, 200);
    outerCurves.lineTo(210, 200);


    outerCurves.moveTo(170, 210);
    outerCurves.lineTo(210, 210);

    outerCurves.moveTo(190, 280);
    outerCurves.lineTo(208, 240);

    outerCurves.moveTo(200, 300);
    outerCurves.lineTo(220, 250);

    outerCurves.moveTo(255, 300);
    outerCurves.lineTo(240, 340);

    outerCurves.moveTo(255, 300);
    outerCurves.lineTo(240, 340);

    outerCurves.moveTo(245, 345);
    outerCurves.quadraticCurveTo(290, 340, 280, 320);

    outerCurves.moveTo(265, 360);
    outerCurves.lineTo(290, 350);

    outerCurves.moveTo(300, 330);
    outerCurves.lineTo(295, 345);

    outerCurves.moveTo(350, 340);
    outerCurves.lineTo(350, 380);
    outerCurves.moveTo(340, 340);
    outerCurves.lineTo(340, 380);
    outerCurves.moveTo(360, 340);
    outerCurves.lineTo(360, 380);

    outerCurves.moveTo(410, 370);
    outerCurves.bezierCurveTo(420, 300, 450, 295, 470, 331);

    outerCurves.moveTo(490, 310);
    outerCurves.lineTo(480, 250);

    outerCurves.moveTo(445, 298);
    outerCurves.lineTo(510, 280);

    outerCurves.moveTo(490, 185);
    outerCurves.lineTo(530, 200);

    outerCurves.moveTo(490, 215);
    outerCurves.lineTo(530, 200);

    outerCurves.moveTo(430, 40);
    outerCurves.quadraticCurveTo(410, 80, 440, 65);

    outerCurves.moveTo(440, 65);
    outerCurves.bezierCurveTo(450, 65, 465, 65, 450, 100);

    outerCurves.moveTo(440, 65);
    outerCurves.quadraticCurveTo(425, 80, 415, 75);

    outerCurves.moveTo(450, 100);
    outerCurves.lineTo(500, 100);

    outerCurves.strokeStyle = "#FF0000";
    outerCurves.lineWidth = 4;
    outerCurves.stroke();
}

//Drawing element => Calling the specific functions for each part of the Seal

drawOuterCircle();
drawInnerCircle();
drawMainTriangle();
drawElipseEye();
drawMainCurves();
drawOuterCurves();


