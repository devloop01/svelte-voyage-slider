<script lang="ts" context="module">
	export type CardItem = {
		image: string;
		title: string;
		subtitle: string;
		description: string;
	};
</script>

<script lang="ts">
	import { lerp } from '@/utils';
	import type { Action } from 'svelte/action';

	export let item: CardItem;

	const tilt: Action = (node) => {
		const element = node.children[0] as HTMLElement;
		const bounds = node.getBoundingClientRect();

		let rx = { current: 0, target: 0 };
		let ry = { current: 0, target: 0 };
		let rafId = 0;

		function ticker() {
			rx.current = lerp(rx.current, rx.target, 0.12);
			ry.current = lerp(ry.current, ry.target, 0.12);

			element.style.setProperty('--rx', ry.current.toFixed(2) + 'deg');
			element.style.setProperty('--ry', rx.current.toFixed(2) + 'deg');

			rafId = requestAnimationFrame(ticker);
		}

		const update = ({ offsetX, offsetY }: MouseEvent) => {
			rx.target = (offsetX - bounds.width / 2) / (Math.PI * 3);
			ry.target = -(offsetY - bounds.height / 2) / (Math.PI * 4);
		};

		const reset = () => {
			rx.target = 0;
			ry.target = 0;
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

<div class="card" use:tilt {...$$restProps}>
	<div class="card__inner">
		<img class="card__image" src={item.image} alt={item.title} />
		<div class="card__info">
			<span data-title class="card__info--text">{item.title}</span>
			<span data-subtitle class="card__info--text">{item.subtitle}</span>
			<span data-description class="card__info--text">{item.description}</span>
		</div>
	</div>
</div>

<style lang="postcss">
	.card {
		--card-translateY-offset: 0vh;
		--padding: 1rem;

		display: inline-block;
		width: calc(var(--card-width) + var(--padding));
		height: calc(var(--card-height) + var(--padding));
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%) translateX(var(--card-translateX-offset))
			translateY(var(--card-translateY-offset)) rotateY(var(--card-rotation-offset))
			scale(var(--card-scale-offset));
		transition: transform var(--card-transition-duration) var(--card-transition-easing);
		user-select: none;
		perspective: 1000px;
		border: 1px solid red;
	}

	.card[data-state='current'] {
		--current-card-rotation-offset: 0;
		--card-translateX-offset: 0;
		--card-rotation-offset: var(--current-card-rotation-offset);
		--card-scale-offset: 1.2;
		pointer-events: auto;
		z-index: 10;
	}

	.card[data-state='previous'] {
		--card-translateX-offset: calc(-1 * var(--card-width) * 1.1);
		--card-rotation-offset: 25deg;
	}

	.card[data-state='next'] {
		--card-translateX-offset: calc(var(--card-width) * 1.1);
		--card-rotation-offset: -25deg;
	}

	.card[data-state='previous'],
	.card[data-state='next'] {
		--card-scale-offset: 0.9;
		pointer-events: none;
	}

	.card[data-current] {
		& .card__image {
			filter: brightness(0.75);
		}

		& .card__info--text {
			opacity: 1;
		}
	}

	.card:not([data-current]) {
		& .card__image {
			filter: brightness(0.55);
		}

		& .card__info--text {
			opacity: 0;
		}
	}

	.card__inner {
		--rx: 0;
		--ry: 0;

		position: relative;
		width: 100%;
		height: 100%;
		pointer-events: none;
		transform-style: preserve-3d;

		transform: rotateX(var(--rx)) rotateY(var(--ry));
	}

	.card__image {
		position: absolute;
		left: 0;
		top: 0;
		width: calc(100% - var(--padding));
		height: calc(100% - var(--padding));
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		object-fit: cover;
		transition: filter var(--card-transition-duration) var(--card-transition-easing);
	}

	.card__info {
		position: relative;
		z-index: 2;
		transform: translateZ(62px);
		bottom: 0;
	}

	.card__info--text {
		display: block;
		font-family: var(--font-clash-display);
		color: #fff;
		transition: opacity var(--card-transition-duration) var(--card-transition-easing);

		&[data-title] {
			font-size: 2rem;
			font-weight: 900;
		}

		&[data-subtitle] {
			font-size: 1.5rem;
			font-weight: 800;
		}

		&[data-description] {
			font-size: 1rem;
			font-family: var(--font-archivo);
			font-weight: 400;
		}
	}
</style>
