<script lang="ts" context="module">
	export { CardItem };
</script>

<script lang="ts">
	import { wrap } from '@/utils';

	import Card, { type CardItem } from '@/components/card.svelte';
	import ChevronLeft from '@/components/icons/chevron-left.svelte';
	import ChevronRight from '@/components/icons/chevron-right.svelte';

	export let items: CardItem[];

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

<div class="card-list" data-current-index={activeIndex}>
	<button class="btn btn--left" on:click={prev}>
		<ChevronLeft />
	</button>

	<div class="wrapper">
		{#each items as item, index}
			{@const state =
				index === activeIndex
					? 'current'
					: index === nextIndex
					  ? 'next'
					  : index === prevIndex
					    ? 'previous'
					    : undefined}
			<Card {item} data-state={state} data-current={index === activeIndex || undefined} />
		{/each}
	</div>

	<button class="btn btn--right" on:click={next}>
		<ChevronRight />
	</button>
</div>

<style lang="postcss">
	.card-list {
		position: absolute;
		width: calc(3 * var(--card-width));
		height: auto;
	}

	.wrapper {
		position: relative;
		width: 100%;
		height: 100%;
		perspective: 1000px;
	}

	.btn {
		--size: 30px;

		width: var(--size);
		height: var(--size);
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		z-index: 100;
		opacity: 0.7;
		transition: opacity 250ms cubic-bezier(0.215, 0.61, 0.355, 1);

		&.btn--left {
			left: -8%;
		}
		&.btn--right {
			right: -8%;
		}

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
