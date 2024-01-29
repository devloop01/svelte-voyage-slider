<script lang="ts">
	import Slider, { type SlideItem } from '@/components/slider.svelte';

	const slides: SlideItem[] = [
		{
			title: 'Highlands',
			subtitle: 'Scotland',
			description: 'The mountains are calling',
			image: '/images/highlands.jpg'
		},
		{
			title: 'The Alps',
			subtitle: 'Switzerland',
			description: 'The mountains are calling',
			image: '/images/chamonix.jpg'
		},
		{
			title: 'Machu Picchu',
			subtitle: 'Peru',
			description: 'The mountains are calling',
			image: '/images/machu-pichu.jpg'
		}
	];
</script>

<div class="app">
	<Slider {slides} />
</div>

<style lang="postcss">
</style>
