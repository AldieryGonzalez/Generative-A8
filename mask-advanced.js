/* globals allMasks  Vector2D, drawContour */
allMasks["advanced"] = {
	title: "advanced mask",
	description: "TODO: fix this into a better debugging mask",
	setup() {},

	draw(p, face) {
		p.clear();
		let t = p.millis() * 0.001;

		face.sides.forEach((side, sideIndex) => {
			let [x1, y1] = side.eyeCenter;

			let sidePoint = new Vector2D();
			sidePoint.setToLerp(side.eyeCenter, side.eyeOuter, p.noise(t * 10));

			side.face.forEach((contour, index) => {
				p.fill((t + 25 * index) % 100);
				p.stroke(100);
				drawContour(p, contour, {});
			});
			side.eye.forEach((contour, cIndex) => {
				// 	p.fill(40 * sideIndex + cIndex * 20, 100, 50, 0.2);
				// 	p.stroke(0);
				// 	drawContour(p, contour, {
				// 		curve: true,
				// 		close: true,
				// 		lerpToPoint: side.eyeCenter,
				// 		// lerpPct: Math.sin(t),
				// 		lerpPct(index, pct, pt) {
				// 			return 0.2 * Math.sin(pct * 45 + 10 * t) - 1.2;
				// 		},
				// 	});
				p.noFill();
				p.stroke(100);
				drawContour(p, contour, {
					curve: true,
					close: false,
					subtract: side.eyeCenter,
					scale: 2,
					add: sidePoint,
				});
			});
			p.circle(...side.eyeCenter, side.eyeWidth * 0.2);

			for (var i = 0; i < 20; i++) {
				let x2 = x1 + Math.round(Math.random() * 70) - 35;
				let y2 = y1 + Math.round(Math.random() * 30) - 15;

				p.stroke(100);
				p.strokeWeight(Math.random() * 5 + 5);
				p.line(x1, y1, x2, y2);

				x1 = x2;
				y1 = y2;
			}
		});
	},
};
