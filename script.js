// ============================================================================
// test
// ============================================================================

window.onload = function(){
	var c, cx, cs, ch;
	var PI = Math.PI;
	var PI2 = PI * 2;
	var PIH = PI / 2;
	c = document.getElementById('canvas');
	cx = c.getContext('2d');
	cs = Math.min(window.innerWidth, window.innerHeight);
	ch = cs / 2;
	c.width = c.height = cs;

	// clear and setting
	cx.fillStyle = 'white';
	cx.fillRect(0, 0, cs, cs);
	cx.lineWidth = 5;

	drawCircle([0, 0, 0.05], 'red');
	drawLine([0, 0, 0], [0.5, 0.5, 0], 'black');
	
	function drawCircle(v, f){
		var w = convert(v);
		cx.fillStyle = f;
		cx.beginPath();
		cx.arc(w[0], w[1], w[2], 0, PI2);
		cx.fill();
	}
	function drawLine(v1, v2, f){
		var w1 = convert(v1);
		var w2 = convert(v2);
		cx.strokeStyle = f;
		cx.beginPath();
		cx.moveTo(w1[0], w1[1]);
		cx.lineTo(w2[0], w2[1]);
		cx.stroke();
	}

	function convert(v){
		return [v[0] * ch + ch, -v[1] * ch + ch, v[2] * ch];
	}
};
