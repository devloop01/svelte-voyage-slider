<script lang="ts" context="module">
	export type SlideItem = {
		image: string;
		title: string;
		subtitle: string;
		description: string;
	};
</script>

<script lang="ts">
	import { vec2 } from '@/utils';
	import type { Action } from 'svelte/action';

	export let item: SlideItem;
	export let offset: number;
	export let zIndex: number;

	const tilt: Action = (node) => {
		const element = node.children[0] as HTMLElement;

		let lerpAmount = 0.06;

		let rotDeg = { current: vec2(), target: vec2() };
		let bgPos = { current: vec2(), target: vec2() };

		let rafId = 0;

		function ticker() {
			rotDeg.current.lerp(rotDeg.target, lerpAmount);
			bgPos.current.lerp(bgPos.target, lerpAmount);

			element.style.setProperty('--rotX', rotDeg.current.y.toFixed(2) + 'deg');
			element.style.setProperty('--rotY', rotDeg.current.x.toFixed(2) + 'deg');

			element.style.setProperty('--bgPosX', bgPos.current.x.toFixed(2) + '%');
			element.style.setProperty('--bgPosY', bgPos.current.y.toFixed(2) + '%');

			rafId = requestAnimationFrame(ticker);
		}

		const update = ({ offsetX, offsetY }: MouseEvent) => {
			lerpAmount = 0.1;

			const ox = (offsetX - node.clientWidth * 0.5) / (Math.PI * 3);
			const oy = -(offsetY - node.clientHeight * 0.5) / (Math.PI * 4);

			rotDeg.target.set(ox, oy);
			bgPos.target.set(-ox * 0.3, oy * 0.3);
		};

		const reset = () => {
			lerpAmount = 0.05;

			rotDeg.target.set(0, 0);
			bgPos.target.set(0, 0);
		};

		node.addEventListener('mousemove', update);
		node.addEventListener('mouseleave', reset);

		rafId = requestAnimationFrame(ticker);

		return {
			destroy() {
				node.removeEventListener('mousemove', update);
				node.removeEventListener('mouseleave', reset);
				cancelAnimationFrame(rafId);
			}
		};
	};
</script>

<div class="slide" style:--offset={offset} style:z-index={zIndex} use:tilt {...$$restProps}>
	<div class="slide__inner" style:--image-url="url({item.image})">
		<div class="slide--image__wrapper">
			<img class="slide--image" src={item.image} alt={item.title} />
		</div>
		<div class="slide-info">
			<span data-title class="slide-info--text">{item.title}</span>
			<span data-subtitle class="slide-info--text">{item.subtitle}</span>
			<span data-description class="slide-info--text">{item.description}</span>
		</div>
	</div>
</div>

<style lang="postcss">
	.slide {
		--slide-translateY-offset: 0vh;
		--padding: 0px;
		--offset: 0;

		display: inline-block;
		width: var(--slide-width);
		height: var(--slide-height);
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%) translate3d(var(--slide-tx), var(--slide-translateY-offset), 0)
			rotateY(var(--slide-rotY)) scale(var(--slide-scale));

		transition: transform var(--slide-transition-duration) var(--slide-transition-easing);
		user-select: none;
		perspective: 800px;
	}

	.slide[data-current] {
		--slide-tx: 0;
		--slide-rotY: 0;
		--slide-scale: 1.2;

		pointer-events: auto;
	}

	.slide:not([data-current]) {
		--slide-tx: calc(var(--offset) * var(--slide-width) * 1);
		--slide-rotY: calc(var(--offset) * -45deg);
		--slide-scale: 0.9;

		pointer-events: none;
	}

	.slide[data-current] {
		& .slide--image {
			filter: brightness(0.8);
		}

		& .slide-info--text {
			opacity: 1;
		}
	}

	.slide:not([data-current]) {
		& .slide--image {
			filter: brightness(0.65);
		}

		& .slide-info--text {
			opacity: 0;
		}
	}

	.slide__inner {
		--rotX: 0;
		--rotY: 0;
		--bgPosX: 0%;
		--bgPosY: 0%;

		position: relative;
		left: calc(var(--padding) / 2);
		top: calc(var(--padding) / 2);
		width: calc(100% - var(--padding));
		height: calc(100% - var(--padding));
		pointer-events: none;
		transform-style: preserve-3d;
		transform: rotateX(var(--rotX)) rotateY(var(--rotY));
	}

	.slide--image__wrapper {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.slide--image {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(1.25) translate3d(var(--bgPosX), var(--bgPosY), 0);
		object-fit: cover;
		transition: filter var(--slide-transition-duration) var(--slide-transition-easing);
	}

	.slide-info {
		--z-offset: 45px;
		position: absolute;
		height: fit-content;
		left: -20%;
		bottom: 20%;
		transform: translateZ(var(--z-offset));
		z-index: 2;
		pointer-events: none;
	}

	.slide-info--text {
		display: block;
		font-family: var(--font-clash-display);
		color: #fff;
		transition: opacity var(--slide-transition-duration) var(--slide-transition-easing);

		&[data-title],
		&[data-subtitle] {
			font-size: 2.4rem;
			font-weight: 800;
			letter-spacing: 0.2rem;
			white-space: nowrap;
			text-transform: uppercase;
		}

		&[data-subtitle] {
			margin-left: 2rem;
			font-size: 1.8rem;
			font-weight: 600;
		}

		&[data-description] {
			margin-left: 1rem;
			font-size: 0.95rem;
			font-family: var(--font-archivo);
			font-weight: 300;
		}
	}
</style>
