<script lang="ts">
	import { page } from '$app/stores';

	export let link: { name: string; path: string };
</script>

<a
	href={link.path}
	class={$page.url.pathname === link.path ? 'text-thunderbird-700' : ''}
	>{link.name}</a
>
