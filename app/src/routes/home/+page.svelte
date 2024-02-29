<script lang="ts">
	import { user } from '../../stores';
	import { ensureLoggedIn } from '$lib/utils';
	import TrainingBlockAccordion from './TrainingBlockAccordion.svelte';

	ensureLoggedIn();
</script>

<h2 class="text-2xl">Home</h2>
{#if $user?.trainingBlock}
	<section class="min-w-full">
		<h3 class="my-4 text-center text-xl">Training Blocks</h3>
		<TrainingBlockAccordion trainingBlock={$user?.trainingBlock} />
	</section>
{:else}
	<p>
		Looks like you don't have any training maxes yet. Set some to get your
		training block
	</p>
{/if}
