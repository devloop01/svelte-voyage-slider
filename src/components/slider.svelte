<script lang="ts" context="module">
	export { SlideItem };
</script>

<script lang="ts">
	import { wrap } from '@/utils';

	import Slide, { type SlideItem } from '@/components/slide.svelte';
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

	<div class="slider--slides">
		{#each slides as item, index}
			{@const offset = calculateOffset(index, currentSlideIndex)}
			<Slide
				{item}
				{offset}
				zIndex={length - Math.abs(offset)}
				data-current={offset === 0 || undefined}
			/>
		{/each}
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
		height: calc(1.5 * var(--slide-height));
		display: flex;
		align-items: center;
	}

	.slider--slides {
		position: relative;
		width: 100%;
		height: 100%;
		perspective: 1000px;
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
