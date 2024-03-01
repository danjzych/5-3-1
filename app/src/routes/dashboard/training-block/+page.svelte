<script lang="ts">
	import { user } from '../../../stores';
	import TrainingBlockAccordion from './TrainingBlockAccordion.svelte';
</script>

{#if $user?.trainingBlock}
	<section class="min-w-full">
		<h3 class="my-4 text-center text-xl">Training Blocks</h3>
		<TrainingBlockAccordion trainingBlock={$user?.trainingBlock} />
	</section>
{:else}
	<h3>Time to set up your 5/3/1 programming!</h3>
	<p>
		Looks like you don't have any training maxes yet. Set some to get your
		training block
	</p>
{/if}
