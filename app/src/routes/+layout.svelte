<script lang="ts">
	import '../app.css';
	import { jwtDecode } from 'jwt-decode';
	import _531API from '$lib/api';
	import { onMount } from 'svelte';
	import { user } from '../stores';
	import { token } from './_stores';
	import { goto } from '$app/navigation';
	import Nav from './Nav.svelte';

	function logout() {
		console.debug('logout');

		$user = null;
		$token = null;
		_531API.token = null;

		goto('/');
	}

	let loadingUser: boolean = true;

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
		if ($token) setUser();
		loadingUser = false;
	});

	$: {
		if ($token) setUser();
	}

	$: {
		if ($user) goto('/home');
	}
</script>

<Nav {logout} />
<main class="posiion relative top-16">
	{#if loadingUser}
		<!-- ADD LOADER COMPONENT -->
		<p>loading...</p>
	{:else}
		<slot />
	{/if}
</main>
