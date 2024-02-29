<script lang="ts">
	import { user } from '../../stores';
	import { ensureLoggedIn } from '$lib/utils';
</script>

<h2 class="text-2xl">Home</h2>
{#if $user?.trainingBlock}
	<ul>Your current training maxes are:</ul>
	{#each Object.keys($user.trainingBlock) as lift}
		<li>{lift} : {$user.trainingBlock[lift].trainingMax}</li>
	{/each}
{/if}
