<script lang="ts">
	import '../app.css';
	import { jwtDecode } from 'jwt-decode';
	import _531API from '$lib/api';
	import { onMount } from 'svelte';
	import { user } from '../stores';
	import { token } from './_stores';
	import Nav from './Nav.svelte';

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

<Nav />
<main class="posiion relative top-16">
	<slot />
</main>
