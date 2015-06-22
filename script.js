// ============================================================================
// test
// ============================================================================

window.onload = function(){
	var i, j;
	var c, cx, cs, ch, mx, my;
	var PI = Math.PI;
	var PI2 = PI * 2;
	var PIH = PI / 2;
	c = document.getElementById('canvas');
	cx = c.getContext('2d');
	cs = Math.min(window.innerWidth, window.innerHeight);
	ch = cs / 2;
	c.width = c.height = cs;

	// event
	mx =  0;
	my = -1;
	c.addEventListener('mousemove', mouseMove, false);

	// point initialize
	var p = [];
	for(i = 0; i < 5; ++i){
		if(i === 0){
			p.push(new Point(0, 0, 0.5, 0.2));
		}else{
			p.push(new Point(0, -i * 0.2, 0.5, 0.2));
		}
	}

	// rendering
	cx.lineWidth = 2;
	render();

	function render(){
		cx.fillStyle = 'white';
		cx.fillRect(0, 0, cs, cs);
		j = p.length;
		var t = {x: p[j - 1].x, y: p[j - 1].y};
		for(i = j - 1; i > 0; i--){
			cx.fillStyle = 'rgba(255, 255, 255, 0.5)';
			cx.fillRect(0, 0, cs, cs);
			var vi = normalize([mx - p[i - 1].x, my - p[i - 1].y]);
			var vt = normalize([t.x - p[i - 1].x, t.y - p[i - 1].y]);
			var d = dot(vi, vt);
			var o = cross(vi, vt);
			if(o === 0){
				p[i].rad = 0;
			}else if(o > 0){
				p[i].rad = -Math.acos(Math.max(Math.abs(d), p[i].rom));
			}else{
				p[i].rad = Math.acos(Math.max(Math.abs(d), p[i].rom));
			}
			var sin = Math.sin(p[i].rad);
			var cos = Math.cos(p[i].rad);
			var x = t.x - p[i - 1].x;
			var y = t.y - p[i - 1].y;
			p[i].dx = cos * x - sin * y;
			p[i].dy = sin * x + cos * y;
			t.x = p[i].dx + p[i - 1].x;
			t.y = p[i].dy + p[i - 1].y;
		}
		var r = 0;
		for(i = 1; i < j; i++){
			r += p[i].rad;
			var sin = Math.sin(r);
			var cos = Math.cos(r);
			var v = normalize([p[i].x - p[i - 1].x, p[i].y - p[i - 1].y]);
			var dx = (cos * v[0] - sin * v[1]) * p[i].length;
			var dy = (sin * v[0] + cos * v[1]) * p[i].length;
			p[i].x = dx + p[i - 1].x;
			p[i].y = dy + p[i - 1].y;
			drawLine(
				[p[i].x, p[i].y],
				[p[i - 1].x, p[i - 1].y],
				'black'
			);
			drawCircle([p[i].x, p[i].y, 0.01], 'blue');
		}
		requestAnimationFrame(render);
	}

	// point ==================================================================
	function Point(x, y, rom, length){
		this.x = x;
		this.y = y;
		this.dx = x;
		this.dy = y;
		this.rom = rom; // if rom == 0 then parent of top
		this.rad = 0;
		this.length = length;
	}

	// event ==================================================================
	function mouseMove(eve){
		mx = (eve.clientX - c.offsetLeft - ch) / ch;
		my = -(eve.clientY - c.offsetTop - ch) / ch;
	}
	
	// math ===================================================================
	function vLength(v){
		return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
	}
	function dot(v1, v2){
		return v1[0] * v2[0] + v1[1] * v2[1];
	}
	function cross(v1, v2){
		return v1[0] * v2[1] - v1[1] * v2[0];
	}
	function normalize(v){
		var w = [v[0], v[1]];
		var sq = vLength(v);
		if(sq > 0){
			w[0] /= sq;
			w[1] /= sq;
		}
		return w;
	}

	// draw method ============================================================
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
