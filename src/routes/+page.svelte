<script lang="ts">
	import Slider, { type SlideItem } from '@/components/slider.svelte';

	let currentSlideIndex = 0;

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

		//

		// {
		// 	title: 'Highlands',
		// 	subtitle: 'Scotland',
		// 	description: 'The mountains are calling',
		// 	image: '/images/highlands.jpg'
		// },
		// {
		// 	title: 'The Alps',
		// 	subtitle: 'Switzerland',
		// 	description: 'The mountains are calling',
		// 	image: '/images/chamonix.jpg'
		// }
	];
</script>

<div class="app">
	<Slider {slides} bind:currentSlideIndex />
</div>

<style lang="postcss">
</style>
