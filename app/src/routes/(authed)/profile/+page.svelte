<script lang="ts">
	import type { PrimaryLiftName } from '../../../../../api/types';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';

	export let data: PageData;

	let exerciseChoices: { id: number; name: PrimaryLiftName }[] =
		data.exercises;
	let trainingMaxes: { id: number; weight: number }[] = [];

	let currentInputState: { id: number; weight: number } = {
		id: 1,
		weight: 0,
	};
	let trainingMaxValid = false;

	$: trainingMaxValid =
		currentInputState.id <= exerciseChoices.length &&
		currentInputState.id > 0 &&
		currentInputState.weight > 0 &&
		currentInputState.weight < 1000;

	function addTrainingMax() {
		if (trainingMaxValid) {
			trainingMaxes.push(currentInputState);
			trainingMaxes = trainingMaxes;

			currentInputState = {
				id: 1,
				weight: 0,
			};
		}
	}

	async function handleSubmit(evt: SubmitEvent) {
		console.debug('handleSubmit');

		evt.preventDefault();

		await goto('/dashboard/training-block');

		try {
			await goto('/dashboard/training-block');
		} catch (err) {
			console.error(err);
		}
	}
</script>

<form
	class="border-thunderbird-950 flex flex-col items-center gap-8 rounded-md border px-2 py-3 shadow-xl"
	on:submit={handleSubmit}
>
	<div>
		<h2 class="text-2xl">Generate Training Block</h2>
		<p>
			Select your exercises and training maxes to generate a training
			block. You must select between one and five exercises.
		</p>
	</div>
	<div class="flex flex-col items-center gap-1">
		<h3 class="text-xl">Add an Exercise:</h3>
		<div class="flex w-full justify-center gap-5">
			<select
				name="exerciseChoice"
				id="exerciseChoice"
				class="border-thunderbird-950 rounded-lg border"
				bind:value={currentInputState.id}
			>
				<!-- TODO: Add filtering so that it cannot have the same exercise twice -->
				{#each exerciseChoices as { id, name }}
					<option value={id}>{name}</option>
				{/each}
			</select>
			<input
				type="number"
				bind:value={currentInputState.weight}
				class="border-thunderbird-950 rounded-lg border pl-2"
			/>
			<button
				type="button"
				class="btn btn-sm bg-thunderbird-300"
				on:click={addTrainingMax}
				disabled={!trainingMaxValid}>Add Lift</button
			>
		</div>
	</div>
	<div class="flex flex-col items-center">
		<h3 class="text-xl">Selected Exercises</h3>
		{#if trainingMaxes.length === 0}
			<p class="font-light">Add some lifts to see them populate here</p>
		{:else}
			<ul>
				{#each trainingMaxes as { id, weight }}
					<li>
						{exerciseChoices.filter((e) => e.id === id)[0]['name']}, {weight}
						lb
					</li>
					<!-- TODO: add ability to remove -->
				{/each}
			</ul>
		{/if}
	</div>
	<button
		class="btn btn-md bg-thunderbird-400"
		disabled={trainingMaxes.length === 0}
	>
		Add Training Maxes
	</button>
</form>

<!-- FIXME: cannot get to this URL - redirects to /dashboard.
Something is going on with the  redirect / load / goto functions-->
