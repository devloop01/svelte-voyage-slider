<script lang="ts" context="module">
	export { SlideItem };
</script>

<script lang="ts">
	import { wrap } from '@/utils';

	import Slide, { type SlideItem } from '@/components/slide.svelte';
	import ChevronLeft from '@/components/icons/chevron-left.svelte';
	import ChevronRight from '@/components/icons/chevron-right.svelte';

	export let items: SlideItem[];

	let activeIndex = 0;

	$: length = items.length;

	$: prevIndex = wrap(activeIndex - 1, length);
	$: nextIndex = wrap(activeIndex + 1, length);

	const prev = () => {
		activeIndex = wrap(--activeIndex, length);
	};

	const next = () => {
		activeIndex = wrap(++activeIndex, length);
	};
</script>

<div class="slider" data-current-index={activeIndex}>
	<button class="slider--btn" on:click={prev}>
		<ChevronLeft />
	</button>

	<div class="slider--slides">
		{#each items as item, index}
			{@const state =
				index === activeIndex
					? 'current'
					: index === nextIndex
					  ? 'next'
					  : index === prevIndex
					    ? 'previous'
					    : undefined}
			<Slide {item} data-state={state} data-current={index === activeIndex || undefined} />
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
		perspective: 800px;
	}

	.slider--btn {
		--size: 30px;
		--offset: 100px;

		width: var(--size);
		height: var(--size);
		opacity: 0.7;
		transition: opacity 250ms cubic-bezier(0.215, 0.61, 0.355, 1);

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
