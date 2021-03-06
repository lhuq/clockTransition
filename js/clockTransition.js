
function clockTransition(selector,options) {
	if (!options.angle) options.angle = Math.PI/180;
	if (!options.speed) options.speed = 10;

	document.querySelectorAll(selector).forEach(function(clockContainer, iClock) {

		clockContainer.classList.add("clock-transition");
		var w = 0;
		var h = 0;
		var images = [];
		for (i in clockContainer.childNodes) {
			var node = clockContainer.childNodes[i];
			if (node.tagName && node.tagName=="IMG") {
				if (node.naturalWidth>w)
					w = node.naturalWidth;
				if (node.naturalHeight>h)
					h = node.naturalHeight;
				images.push(node);
			}
		}
		clockContainer.style.height = h+"px";
		clockContainer.style.width = w+"px";
		var canvas = document.createElement("canvas");
		canvas.width = w;
		canvas.height = h;
		clockContainer.appendChild(canvas);
		var c=canvas.getContext("2d");

		var im = 0;
		images[im].style.display = "block";
		var a = 0;
		var process = setInterval(function() {
			c.save();
			c.beginPath();
			c.moveTo(w/2,h/2);
			c.lineTo(w/2,0);
			if (a>Math.PI/2)
				c.lineTo(w,h/2);
			if (a>Math.PI)
				c.lineTo(w/2,h);
			if (a>3*Math.PI/2)
				c.lineTo(0,h/2);
			c.lineTo(w/2+w*Math.cos(a-Math.PI/2),h/2+h*Math.sin(a-Math.PI/2));
			c.closePath();
			c.clip();
			c.drawImage(images[(im+1)%images.length],0,0,w,h,0,0,w,h);
			a += options.angle;
			if (a>Math.PI*2) {
				images[im].style.display = "none";
				im = (im+1)%images.length;
				images[im].style.display = "block";
				a=0;
			}
			c.restore();
		}, options.speed);

	});

}