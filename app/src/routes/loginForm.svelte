<script lang="ts">
	import _531API from '$lib/api';
	import { token } from './_stores';

	let username: string;
	let password: string;
	let error: any;

	/** 'Submit' form and make call to api for token*/
	async function login(evt: Event) {
		evt.preventDefault();

		console.debug('login');

		try {
			$token = await _531API.login(username, password);
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

<form
	class="my-2 flex min-w-full flex-col items-center gap-2 rounded-md border-2 p-3"
	on:submit={login}
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
	{#if error}
		{error}
	{/if}
	<button class="m-2 w-fit rounded-full border-2 px-4">Login</button>
</form>
