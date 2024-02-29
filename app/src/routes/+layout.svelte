<script lang="ts">
	import '../app.css';
	import { jwtDecode } from 'jwt-decode';
	import _531API from '$lib/api';
	import { onMount } from 'svelte';
	import { user } from '../stores';
	import { token } from './_stores';
	import { goto } from '$app/navigation';
	import Nav from './Nav.svelte';

	let loadingUser: boolean = true;

	function logout() {
		console.debug('logout');

		$user = null;
		$token = null;
		_531API.token = null;

		goto('/');
	}

	/** Get user from api based on token store. */
	async function setUser() {
		console.debug('setUser');

		_531API.token = $token;
		localStorage.setItem('token', $token!);

		const { username } = jwtDecode<{ username: string; password: string }>(
			$token as string,
		);

		loadingUser = true;
		$user = await _531API.getUser(username);
		loadingUser = false;
	}

	onMount(() => {
		$token = localStorage.getItem('token');
		loadingUser = false;
	});

	$: {
		if ($token) setUser();
	}

	$: {
		if ($user) goto('/dashboard');
	}
</script>

<Nav {logout} />
<main class="position relative top-16 min-w-full p-4">
	{#if loadingUser}
		<!-- ADD LOADER COMPONENT -->
		<p>loading...</p>
	{:else}
		<slot />
	{/if}
</main>
