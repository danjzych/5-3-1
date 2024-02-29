<script lang="ts">
	import _531API from '$lib/api';
	import { onMount } from 'svelte';
	import { user } from '../stores';
	import { token } from './_stores';
	import { jwtDecode } from 'jwt-decode';
	import '../app.css';

	async function setUser() {
		_531API.token = $token;

		const { username } = jwtDecode<{ username: string; password: string }>(
			$token as string,
		);

		$user = await _531API.getUser(username);
	}

	onMount(() => {
		$token = localStorage.getItem('token');
		if ($token) setUser();
	});

	$: {
		if ($token) setUser();
	}
</script>

<header class="flex min-w-full justify-center border-b-2 p-2 shadow-sm">
	<h1 class="text-3xl font-extrabold">5/3/1</h1>
</header>
<slot />
