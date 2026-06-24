type Point = {
	cluster: number;
	phase: number;
	radius: number;
	vx: number;
	vy: number;
	x: number;
	y: number;
};

const synapseRoot = document.querySelector('[data-synapse-field]');
const synapseCanvas = synapseRoot?.querySelector('[data-synapse-canvas]');

if (synapseRoot instanceof HTMLElement && synapseCanvas instanceof HTMLCanvasElement) {
	const context = synapseCanvas.getContext('2d', { alpha: true });
	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
	const pointer = { active: false, x: 0.72, y: 0.34 };
	const state = { height: 1, running: false, width: 1 };
	let frame = 0;
	let points: Point[] = [];

	const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
	const distance = (a: { x: number; y: number }, b: { x: number; y: number }) => Math.hypot(a.x - b.x, a.y - b.y);

	const buildPoints = () => {
		const clusterDefinitions = [
			[
				[0.26, 0.16],
				[0.33, 0.2],
				[0.4, 0.12],
				[0.36, 0.23],
				[0.45, 0.1],
			],
			[
				[0.04, 0.34],
				[0.13, 0.29],
				[0.17, 0.39],
				[0.15, 0.49],
			],
			[
				[0.18, 0.58],
				[0.28, 0.62],
				[0.36, 0.58],
				[0.24, 0.72],
				[0.16, 0.82],
				[0.28, 0.84],
				[0.38, 0.88],
			],
			[
				[0.54, 0.34],
				[0.62, 0.43],
				[0.69, 0.5],
				[0.74, 0.58],
				[0.86, 0.52],
				[0.96, 0.44],
			],
			[
				[0.72, 0.78],
				[0.8, 0.72],
				[0.9, 0.78],
				[0.95, 0.82],
				[0.86, 0.88],
			],
			[
				[0.76, 0.24],
				[0.84, 0.2],
				[0.91, 0.27],
				[0.95, 0.36],
				[0.82, 0.32],
			],
		];
		points = [];
		clusterDefinitions.forEach((cluster, clusterIndex) => {
			cluster.forEach(([x, y], pointIndex) => {
				const phase = clusterIndex * 1.7 + pointIndex * 0.83;
				points.push({
					cluster: clusterIndex,
					phase,
					radius: 1.35 + ((pointIndex + clusterIndex) % 3) * 0.28,
					vx: Math.cos(phase * 1.9) * 0.105,
					vy: Math.sin(phase * 1.55) * 0.105,
					x: state.width * x,
					y: state.height * y,
				});
			});
		});
	};

	const draw = (time: number) => {
		if (!context) return;
		const width = state.width;
		const height = state.height;
		const motion = reducedMotion.matches ? 0 : time * 0.001;
		const pointerPosition = {
			x: width * pointer.x,
			y: height * pointer.y,
		};

		context.clearRect(0, 0, width, height);

		if (!reducedMotion.matches) {
			points.forEach((point) => {
				point.x += point.vx + Math.sin(motion * 0.35 + point.phase) * 0.024;
				point.y += point.vy + Math.cos(motion * 0.3 + point.phase) * 0.024;

				const margin = 18;
				if (point.x < -margin || point.x > width + margin) point.vx *= -1;
				if (point.y < -margin || point.y > height + margin) point.vy *= -1;
				point.x = clamp(point.x, -margin, width + margin);
				point.y = clamp(point.y, -margin, height + margin);
			});
		}

		const livePoints = points.map((point) => {
			const pointerDistance = distance({ x: point.x, y: point.y }, pointerPosition);
			const influence = pointer.active ? clamp(1 - pointerDistance / 230, 0, 1) : 0;
			const pull = influence * 8;
			const angle = Math.atan2(pointerPosition.y - point.y, pointerPosition.x - point.x);
			return {
				...point,
				glow: influence,
				x: point.x + Math.cos(angle) * pull,
				y: point.y + Math.sin(angle) * pull,
			};
		});

		context.save();
		context.lineCap = 'round';
		for (let first = 0; first < livePoints.length; first += 1) {
			for (let second = first + 1; second < livePoints.length; second += 1) {
				const a = livePoints[first];
				const b = livePoints[second];
				if (a.cluster !== b.cluster) continue;
				const separation = distance(a, b);
				const threshold = width < 720 ? 112 : 148;
				if (separation > threshold) continue;
				const pulse = 0.55 + Math.sin(motion * 2 + a.phase + b.phase) * 0.45;
				const cursorBoost = Math.max(a.glow, b.glow);
				const alpha = (1 - separation / threshold) * 0.12 * pulse + 0.035 + cursorBoost * 0.26;
				context.beginPath();
				context.moveTo(a.x, a.y);
				context.lineTo(b.x, b.y);
				context.strokeStyle = `rgba(205, 216, 192, ${alpha})`;
				context.lineWidth = 0.65 + cursorBoost * 1.05;
				context.stroke();
			}
		}

		if (pointer.active) {
			const halo = context.createRadialGradient(pointerPosition.x, pointerPosition.y, 0, pointerPosition.x, pointerPosition.y, 220);
			halo.addColorStop(0, 'rgba(199, 240, 106, 0.08)');
			halo.addColorStop(0.46, 'rgba(199, 240, 106, 0.028)');
			halo.addColorStop(1, 'rgba(199, 240, 106, 0)');
			context.fillStyle = halo;
			context.fillRect(0, 0, width, height);
		}

		livePoints.forEach((point) => {
			context.beginPath();
			context.arc(point.x, point.y, point.radius + point.glow * 2.4, 0, Math.PI * 2);
			context.fillStyle = `rgba(205, 216, 192, ${0.18 + point.glow * 0.42})`;
			context.fill();
			context.beginPath();
			context.arc(point.x, point.y, Math.max(1.2, point.radius - 0.6), 0, Math.PI * 2);
			context.fillStyle = `rgba(199, 240, 106, ${0.08 + point.glow * 0.52})`;
			context.fill();
		});
		context.restore();

		if (!reducedMotion.matches && state.running) {
			frame = window.requestAnimationFrame(draw);
		}
	};

	const resize = () => {
		const rect = synapseCanvas.getBoundingClientRect();
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		state.width = Math.max(1, rect.width);
		state.height = Math.max(1, rect.height);
		synapseCanvas.width = Math.floor(state.width * dpr);
		synapseCanvas.height = Math.floor(state.height * dpr);
		context?.setTransform(dpr, 0, 0, dpr, 0, 0);
		buildPoints();
		draw(0);
	};

	const start = () => {
		if (state.running || reducedMotion.matches) return;
		state.running = true;
		frame = window.requestAnimationFrame(draw);
	};

	const stop = () => {
		state.running = false;
		window.cancelAnimationFrame(frame);
	};

	const observer = new IntersectionObserver(([entry]) => {
		if (entry?.isIntersecting) {
			start();
		} else {
			stop();
		}
	});

	synapseRoot.addEventListener('pointermove', (event) => {
		const rect = synapseRoot.getBoundingClientRect();
		pointer.active = true;
		pointer.x = clamp((event.clientX - rect.left) / rect.width, 0, 1);
		pointer.y = clamp((event.clientY - rect.top) / rect.height, 0, 1);
		if (reducedMotion.matches) {
			draw(0);
		}
	});
	synapseRoot.addEventListener('pointerleave', () => {
		pointer.active = false;
		if (reducedMotion.matches) {
			draw(0);
		}
	});
	reducedMotion.addEventListener('change', () => {
		stop();
		draw(0);
		start();
	});
	window.addEventListener('resize', resize, { passive: true });
	resize();
	observer.observe(synapseRoot);
	draw(0);
}
