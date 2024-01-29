<script lang="ts" context="module">
	import type { SlideItem } from './slide.svelte';
	export { type SlideItem };
</script>

<script lang="ts">
	import { wrap } from '@/utils';

	import Slide from '@/components/slide.svelte';
	import ChevronLeft from '@/components/icons/chevron-left.svelte';
	import ChevronRight from '@/components/icons/chevron-right.svelte';

	export let slides: SlideItem[];
	export let currentSlideIndex = 0;

	let nSlides = [...slides];

	$: length = slides.length;
	// $: mid = Math.floor(length / 2);

	const prev = () => {
		currentSlideIndex = wrap(--currentSlideIndex, length);
	};

	const next = () => {
		currentSlideIndex = wrap(++currentSlideIndex, length);
	};

	const calculateOffset = (index: number, currentSlideIndex: number) => {
		const diff = index - currentSlideIndex;
		return diff;
		// return diff > mid ? diff - length : diff < -mid ? diff + length : diff;
	};

	// $: {
	// console.log(nSlides.map((_, index) => -calculateOffset(index, currentSlideIndex)));
	// }
</script>

<div class="slider" data-current-index={currentSlideIndex}>
	<button class="slider--btn" on:click={prev}>
		<ChevronLeft />
	</button>

	<div class="sliders__wrapper">
		<div class="slides">
			{#each nSlides as item, index}
				{@const offset = calculateOffset(index, currentSlideIndex)}
				<Slide {item} {offset} zIndex={length - Math.abs(offset)} />
			{/each}
		</div>
	</div>

	<button class="slider--btn" on:click={next}>
		<ChevronRight />
	</button>
</div>

<style lang="postcss">
	.slider {
		position: relative;
		display: block;
		width: calc(3 * var(--slide-width));
		height: calc(2 * var(--slide-height));
		display: flex;
		align-items: center;
	}

	.sliders__wrapper {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.slides {
		position: relative;
		width: 100%;
		height: 100%;

		display: grid;
		place-items: center;
		& > * {
			grid-area: 1 / -1;
		}
	}

	.slider--btn {
		--size: 40px;

		display: inline-flex;
		justify-content: center;
		align-items: center;
		opacity: 0.7;
		transition: opacity 250ms cubic-bezier(0.215, 0.61, 0.355, 1);
		z-index: 1000;

		& svg {
			width: var(--size);
			height: var(--size);
			stroke: white;
		}

		&:hover {
			opacity: 1;
		}
	}
</style>
