<script lang="ts">
	import { page } from '$app/stores';
	export let logout: () => void;

	const links = [
		{ name: 'Overview', path: '/dashboard' },
		{ name: 'Training Block', path: '/dashboard/training-block' },
		{ name: 'Training History', path: '/dashboard/history' },
	];
</script>

<nav
	class="from-thunderbird-100 position fixed flex h-16 min-w-full items-center justify-between bg-gradient-to-b to-transparent px-4 py-2"
>
	<a href="/dashboard"
		><h1 class="text-thunderbird-700 text-3xl font-extrabold">5/3/1</h1></a
	>
	<div class="flex gap-4">
		{#each links as link}
			<a
				href={link.path}
				class={$page.url.pathname === link.path
					? 'text-thunderbird-700'
					: ''}>{link.name}</a
			>
		{/each}
		<!-- TODO: add pop up modal to confirm logout -->
		<button on:click={logout}> Logout </button>
	</div>
</nav>
