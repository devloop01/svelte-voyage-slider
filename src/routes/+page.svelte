<script lang="ts">
	import CardList, { type CardItem } from '@/components/card-list.svelte';

	const modules = import.meta.glob('@/assets/images/*.jpg', {
		import: 'default',
		eager: true,
		query: { w: 200, h: 300, fit: 'cover', as: 'run' }
	});

	const images = Object.entries(modules).map((i) => i[1]) as string[];

	const items: CardItem[] = [
		{
			title: 'Highlands',
			subtitle: 'Scotland',
			description: 'The mountains are calling',
			image: images[0]
		},
		{
			title: 'The Alps',
			subtitle: 'Switzerland',
			description: 'The mountains are calling',
			image: images[1]
		},
		{
			title: 'Machu Picchu',
			subtitle: 'Peru',
			description: 'The mountains are calling',
			image: images[2]
		}
	];
</script>

<div class="app">
	<CardList {items} />
</div>
