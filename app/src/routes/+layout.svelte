<script lang="ts">
	import '../app.css';
	import { jwtDecode } from 'jwt-decode';
	import _531API from '$lib/api';
	import { onMount } from 'svelte';
	import { user } from '../stores';
	import { token } from './_stores';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Nav from './Nav.svelte';

	let loadingUser: boolean = true;

	/** Get user from api based on token store. */
	async function setUser() {
		console.debug('setUser');

		_531API.token = $token;

		const { username } = jwtDecode<{ username: string; password: string }>(
			$token as string,
		);

		$user = await _531API.getUser(username);
	}

	function logout() {
		console.debug('logout');

		$user = null;
		$token = null;
		_531API.token = null;
		localStorage.removeItem('token');

		goto('/');
	}

	onMount(async () => {
		console.log('mount');
		//TODO: add error handling for if there is a token in memory, but that token does not correspond to a user and returns a 404
		$token = localStorage.getItem('token');

		if ($token) {
			await setUser();

			const pathToFollow =
				$page.url.pathname === '/' || $page.url.pathname === '/signup'
					? '/dashboard'
					: $page.url.pathname;

			await goto(pathToFollow);
		}
		loadingUser = false;
	});

	$: if ($token) setUser();

	$: {
		const pathToFollow =
			$page.url.pathname === '/' || $page.url.pathname === '/signup'
				? '/dashboard'
				: $page.url.pathname;

		if ($user) goto(pathToFollow);
	}
</script>

<Nav {logout} />
<main class="position absolute top-16 min-w-full p-4">
	{#if loadingUser}
		<!-- TODO: ADD LOADER COMPONENT -->
		<p>loading...</p>
	{:else}
		<slot />
	{/if}
</main>
