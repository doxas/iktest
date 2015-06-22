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

	cx.fillStyle = 'white';
	cx.fillRect(0, 0, cs, cs);

	cx.fillStyle = 'red';
	drawCircle([0, 0, 0.5]);
	
	function drawCircle(v){
		var w = convert(v);
		cx.beginPath();
		cx.arc(w[0], w[1], w[2], 0, PI2);
		cx.fill();
	}

	function convert(v){
		return [v[0] * ch + ch, v[1] * ch + ch, v[2] * ch];
	}
};
