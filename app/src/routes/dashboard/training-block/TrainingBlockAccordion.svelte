<script lang="ts">
	import type { TrainingBlock } from '../../../../../api/types';

	export let trainingBlock: TrainingBlock;
</script>

<div class="join join-vertical my-4 w-full">
	{#each trainingBlock.primary as exercise, i}
		<div class="collapse-arrow join-item border-base-950 collapse border">
			<input
				type="radio"
				name="training-block-accordion"
				checked={i === 0}
			/>
			<h4 class="collapse-title font-medium">
				{exercise.exercise}
			</h4>
			<div class="collapse-content grid grid-cols-4">
				<div class="col-span-1 text-center">
					<h5>Week {i + 1}</h5>
					<ul>
						{#each exercise.weekOne as set}
							<li>
								1 x {set.minReps} @ {set.weight}, {set.percentage * 100}%
							</li>
						{/each}
					</ul>
				</div>
				<div class="col-span-1 text-center">
					<h5>Week {i + 2}</h5>
					<ul>
						{#each exercise.weekTwo as set}
							<li>
								1 x {set.minReps} @ {set.weight}, {set.percentage * 100}%
							</li>
						{/each}
					</ul>
				</div>
				<div class="col-span-1 text-center">
					<h5>Week {i + 3}</h5>
					<ul>
						{#each exercise.weekThree as set}
							<li>
								1 x {set.minReps} @ {set.weight}, {set.percentage * 100}%
							</li>
						{/each}
					</ul>
				</div>
				<div class="col-span-1 text-center">
					<h5>Deload</h5>
					<ul>
						{#each exercise.deload as set}
							<li>
								1 x {set.minReps} @ {set.weight}, {set.percentage * 100}%
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	{/each}
</div>
