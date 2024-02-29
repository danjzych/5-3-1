<script lang="ts">
	import type { TrainingBlock } from '../../../../../api/types';

	export let trainingBlock: TrainingBlock;
</script>

<div class="join join-vertical my-4 w-full">
	{#each Object.entries(trainingBlock) as [exercise, block], i}
		<div class="collapse-arrow join-item border-base-950 collapse border">
			<input
				type="radio"
				name="training-block-accordion"
				checked={i === 0}
			/>
			<h4 class="collapse-title font-medium">
				{exercise}
			</h4>
			<div class="collapse-content grid grid-cols-4">
				{#each Object.entries(block) as [_, workout], i}
					<h5 class="col-span-1 text-center">Week {i + 1}</h5>
				{/each}
			</div>
		</div>
	{/each}
</div>
