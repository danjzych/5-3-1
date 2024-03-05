<script lang="ts">
	import _531API from '$lib/api';
	import { token } from '../_stores';

	let username: string;
	let password: string;
	let email: string;
	let error: string;

	/** 'Submit' form and make call to api to register*/
	async function signup(evt: Event) {
		evt.preventDefault();

		console.debug('signup');

		try {
			$token = await _531API.signup(username, password, email);
		} catch (err) {
			let message: string;

			if (err instanceof Error) {
				message = err.message;
			} else {
				message = String(err);
			}

			error = message;
			$token = null;
			console.error(message);
		}
	}
</script>

<h2>Signup</h2>
<form
	class="my-2 flex min-w-full flex-col items-center gap-2 rounded-md border-2 p-3"
	on:submit={signup}
>
	<div>
		<label for="username" class="font-light">Username: </label>
		<input
			type="text"
			name="username"
			id="username"
			autocomplete="username"
			bind:value={username}
			class="border-thunderbird-950 rounded-md border px-2"
		/>
	</div>
	<div>
		<label for="password" class="font-light">Password: </label>
		<input
			type="password"
			name="password"
			id="password"
			autocomplete="current-password"
			bind:value={password}
			class="border-thunderbird-950 rounded-md border px-2"
		/>
	</div>
	<div>
		<label for="email" class="font-light">Email: </label>
		<input
			type="email"
			name="email"
			id="email"
			autocomplete="email"
			bind:value={email}
			class="border-thunderbird-950 rounded-md border px-2"
		/>
	</div>
	{#if error}
		{error}
	{/if}
	<button
		class="btn btn-sm disabled:btn-disabled"
		disabled={!username || !password}>Signup</button
	>
</form>
