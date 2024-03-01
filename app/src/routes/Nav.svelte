<script lang="ts">
	import { user } from '../stores';
	import NavLink from './NavLink.svelte';
	export let logout: () => void;

	const publicLinks = [
		{ name: 'About', path: '/about' },
		{ name: 'Sign Up', path: '/signup' },
	];

	const protectedLinks = [
		{ name: 'Overview', path: '/dashboard' },
		{ name: 'Training Block', path: '/dashboard/training-block' },
		{ name: 'Training History', path: '/dashboard/history' },
	];
</script>

<nav
	class="from-thunderbird-100 position fixed flex h-16 min-w-full items-center justify-between bg-gradient-to-b to-transparent px-4 py-2"
>
	<a href="/"
		><h1 class="text-thunderbird-700 text-3xl font-extrabold">5/3/1</h1></a
	>
	<div class="flex gap-4">
		{#if $user}
			{#each protectedLinks as link}
				<NavLink {link} />
			{/each}
			<!-- TODO: add pop up modal to confirm logout -->
			<button on:click={logout}> Logout </button>
		{:else}
			{#each publicLinks as link}
				<NavLink {link} />
			{/each}
		{/if}
	</div>
</nav>
