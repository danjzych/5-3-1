<script lang="ts">
	import { user } from '../../stores';
	import { ensureLoggedIn } from '$lib/utils';

	ensureLoggedIn();
</script>

<h2 class="text-2xl">Home</h2>
{#if $user?.trainingBlock}
	You do have training maxes! Here is your training block!
{:else}
	<p>
		Looks like you don't have any training maxes yet. Set some to get your
		training block
	</p>
{/if}
