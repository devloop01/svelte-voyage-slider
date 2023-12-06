<script lang="ts" context="module">
	export type SlideItem = {
		image: string;
		title: string;
		subtitle: string;
		description: string;
	};
</script>

<script lang="ts">
	import { wrap } from '@/utils';
	import { tilt } from '@/actions/tilt';

	import Slide from '@/components/slide.svelte';
	import ChevronLeft from '@/components/icons/chevron-left.svelte';
	import ChevronRight from '@/components/icons/chevron-right.svelte';

	export let slides: SlideItem[];
	export let currentSlideIndex = 0;

	$: length = slides.length;
	$: mid = Math.floor(length / 2);

	const prev = () => {
		currentSlideIndex = wrap(--currentSlideIndex, length);
	};

	const next = () => {
		currentSlideIndex = wrap(++currentSlideIndex, length);
	};

	const calculateOffset = (index: number, currentSlideIndex: number) => {
		const diff = index - currentSlideIndex;
		return diff > mid ? diff - length : diff < -mid ? diff + length : diff;
	};
</script>

<div class="slider" data-current-index={currentSlideIndex}>
	<button class="slider--btn" on:click={prev}>
		<ChevronLeft />
	</button>

	<div class="sliders__wrapper">
		<div class="slides">
			{#each slides as item, index}
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
		perspective: 1000px;

		display: grid;
		place-items: center;
		& > * {
			grid-area: 1 / -1;
		}
	}

	.slider--btn {
		--size: 30px;
		--offset: 100px;

		width: var(--size);
		height: var(--size);
		opacity: 0.7;
		transition: opacity 250ms cubic-bezier(0.215, 0.61, 0.355, 1);
		z-index: 1000;

		& svg {
			width: 100%;
			height: 100%;
			stroke: white;
		}

		&:hover {
			opacity: 1;
		}
	}
</style>
