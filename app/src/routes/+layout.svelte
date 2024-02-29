<script lang="ts">
	import '../app.css';
	import { jwtDecode } from 'jwt-decode';
	import _531API from '$lib/api';
	import { onMount } from 'svelte';
	import { user } from '../stores';
	import { token } from './_stores';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

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
		loadingUser = false;
	});

	$: {
		if ($token) setUser();
	}

	$: {
		const pathToFollow =
			$page.url.pathname === '/' ? '/dashboard' : $page.url.pathname;

		if ($user) goto(pathToFollow);
	}
</script>

<main class="min-w-full">
	{#if loadingUser}
		<!-- ADD LOADER COMPONENT -->
		<p>loading...</p>
	{:else}
		<slot />
	{/if}
</main>
