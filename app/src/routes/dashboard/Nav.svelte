<script lang="ts">
	export let logout: () => void;
</script>

<nav
	class="from-thunderbird-100 position fixed flex h-16 min-w-full items-center justify-between bg-gradient-to-b to-transparent px-4 py-2"
>
	<h1 class="text-thunderbird-700 text-3xl font-extrabold">5/3/1</h1>
	<button on:click={logout}> Logout </button>
</nav>
