type Point = {
	phase: number;
	radius: number;
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
		const count = state.width < 720 ? 18 : 28;
		points = Array.from({ length: count }, (_, index) => {
			const column = index % 7;
			const row = Math.floor(index / 7);
			const jitter = Math.sin(index * 12.9898) * 0.5 + 0.5;
			return {
				phase: index * 0.73,
				radius: 1.8 + (index % 4) * 0.45,
				x: state.width * (0.08 + column * 0.14 + jitter * 0.035),
				y: state.height * (0.15 + row * 0.2 + (1 - jitter) * 0.06),
			};
		}).filter((point) => point.x < state.width * 0.96 && point.y < state.height * 0.9);
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

		const livePoints = points.map((point, index) => {
			const drift = reducedMotion.matches ? 0 : Math.sin(motion * 0.32 + point.phase) * 5;
			const pointerDistance = distance(point, pointerPosition);
			const influence = pointer.active ? clamp(1 - pointerDistance / 260, 0, 1) : 0;
			const pull = influence * 12;
			const angle = Math.atan2(pointerPosition.y - point.y, pointerPosition.x - point.x);
			return {
				...point,
				glow: influence,
				x: point.x + Math.cos(point.phase) * drift + Math.cos(angle) * pull,
				y: point.y + Math.sin(point.phase * 1.4) * drift + Math.sin(angle) * pull,
			};
		});

		context.save();
		context.lineCap = 'round';
		for (let first = 0; first < livePoints.length; first += 1) {
			for (let second = first + 1; second < livePoints.length; second += 1) {
				const a = livePoints[first];
				const b = livePoints[second];
				const separation = distance(a, b);
				const threshold = width < 720 ? 132 : 168;
				if (separation > threshold) continue;
				const cursorBoost = Math.max(a.glow, b.glow) * 0.32;
				const alpha = (1 - separation / threshold) * 0.13 + cursorBoost;
				context.beginPath();
				context.moveTo(a.x, a.y);
				context.lineTo(b.x, b.y);
				context.strokeStyle = `rgba(199, 240, 106, ${alpha})`;
				context.lineWidth = 0.75 + cursorBoost * 1.4;
				context.stroke();
			}
		}

		if (pointer.active) {
			const halo = context.createRadialGradient(pointerPosition.x, pointerPosition.y, 0, pointerPosition.x, pointerPosition.y, 260);
			halo.addColorStop(0, 'rgba(199, 240, 106, 0.14)');
			halo.addColorStop(0.46, 'rgba(199, 240, 106, 0.045)');
			halo.addColorStop(1, 'rgba(199, 240, 106, 0)');
			context.fillStyle = halo;
			context.fillRect(0, 0, width, height);
		}

		livePoints.forEach((point) => {
			context.beginPath();
			context.arc(point.x, point.y, point.radius + point.glow * 3.2, 0, Math.PI * 2);
			context.fillStyle = `rgba(199, 240, 106, ${0.18 + point.glow * 0.55})`;
			context.fill();
			context.beginPath();
			context.arc(point.x, point.y, Math.max(1.2, point.radius - 0.6), 0, Math.PI * 2);
			context.fillStyle = `rgba(241, 245, 232, ${0.18 + point.glow * 0.35})`;
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
