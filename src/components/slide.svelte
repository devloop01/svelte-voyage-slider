<script lang="ts" context="module">
	export type SlideItem = {
		image: string;
		title: string;
		subtitle: string;
		description: string;
	};
</script>

<script lang="ts">
	import { tilt } from '@/actions/tilt';

	export let item: SlideItem;
	export let offset: number;
	export let zIndex: number;

	let slideInnerEl: HTMLElement;
	let slideInfoInnerEl: HTMLElement;
</script>

<div
	class="slide"
	style:--offset={offset}
	style:z-index={zIndex}
	data-current={offset === 0 || undefined}
	use:tilt={{ target: [slideInnerEl, slideInfoInnerEl] }}
	{...$$restProps}
>
	<div bind:this={slideInnerEl} class="slide__inner">
		<div class="slide--image__wrapper">
			<img class="slide--image" src={item.image} alt={item.title} />
		</div>
	</div>
</div>

<div class="slide-info" data-current={offset === 0 || undefined}>
	<div bind:this={slideInfoInnerEl} class="slide-info__inner">
		<div class="slide-info--text__wrapper">
			<div data-title class="slide-info--text">
				<span>{item.title}</span>
			</div>
			<div data-subtitle class="slide-info--text">
				<span>{item.subtitle}</span>
			</div>
			<div data-description class="slide-info--text">
				<span>{item.description}</span>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.slide {
		--slide-ty: 0vh;
		--padding: 0px;
		--offset: 0;

		width: var(--slide-width);
		height: auto;
		aspect-ratio: var(--slide-aspect);
		user-select: none;
		perspective: 800px;

		transform: translate3d(var(--slide-tx), var(--slide-ty), var(--slide-tz, 0))
			rotateY(var(--slide-rotY));
		transition: transform var(--slide-transition-duration) var(--slide-transition-easing);
	}

	.slide[data-current] {
		--slide-scale: 1.2;
		--slide-tz: 0px;
		--slide-tx: 0;
		--slide-rotY: 0;

		pointer-events: auto;
	}

	.slide:not([data-current]) {
		--slide-scale: 0.9;
		--slide-tz: 0;
		--slide-tx: calc(var(--offset) * var(--slide-width) * 1);
		--slide-rotY: calc(var(--offset) * -45deg);

		pointer-events: none;
	}

	.slide[data-current] {
		& .slide--image {
			filter: brightness(0.8);
		}
	}

	.slide:not([data-current]) {
		& .slide--image {
			filter: brightness(0.5);
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
		width: 100%;
		height: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		object-fit: cover;
		transform: translate(-50%, -50%) scale(1.25) translate3d(var(--bgPosX), var(--bgPosY), 0);
		transition: filter var(--slide-transition-duration) var(--slide-transition-easing);
	}

	/* ------------ SLIDE INFO ---------------- */

	.slide-info {
		--padding: 0px;

		position: relative;
		pointer-events: none;
		width: var(--slide-width);
		height: auto;
		aspect-ratio: var(--slide-aspect);
		user-select: none;
		perspective: 800px;
		z-index: 20;
	}

	.slide-info[data-current] {
		& .slide-info--text span {
			opacity: 1;
			transform: translate3d(0, 0, 0);
			transition-delay: 250ms;
		}
	}

	.slide-info:not([data-current]) {
		& .slide-info--text span {
			opacity: 0;
			transform: translate3d(0, 100%, 0);
			transition-delay: 0ms;
		}
	}

	.slide-info__inner {
		position: relative;
		left: calc(var(--padding) / 2);
		top: calc(var(--padding) / 2);
		width: calc(100% - var(--padding));
		height: calc(100% - var(--padding));
		pointer-events: none;
		transform-style: preserve-3d;
		transform: rotateX(var(--rotX)) rotateY(var(--rotY));
	}

	.slide-info--text__wrapper {
		--z-offset: 45px;
		position: absolute;
		height: fit-content;
		left: -15%;
		bottom: 15%;
		transform: translateZ(var(--z-offset));
		z-index: 2;
		pointer-events: none;
	}

	.slide-info--text {
		font-family: var(--font-clash-display);
		color: #fff;
		overflow: hidden;

		& span {
			display: block;
			white-space: nowrap;
			transition: var(--slide-transition-duration) var(--slide-transition-easing);
			transition-property: opacity, transform;
		}

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
