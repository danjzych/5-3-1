<script lang="ts">
	import _531API from '$lib/api';

	let username: string;
	let password: string;
	let error: any;

	async function login() {
		try {
			const token = await _531API.login(username, password);
		} catch (err) {
			error = err;
		}
	}
</script>

<form
	class="my-2 flex min-w-full flex-col items-center gap-2 rounded-md border-2 p-3"
	on:submit={() => login()}
>
	<div>
		<label for="username" class="font-light">Username: </label>
		<input
			type="text"
			name="username"
			id="username"
			autocomplete="username"
			bind:value={username}
			class="rounded-md border-2 px-2"
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
			class="rounded-md border-2 px-2"
		/>
	</div>
	{#if error}
		{error}
	{/if}
	<button class="m-2 w-fit rounded-full border-2 px-4">Login</button>
</form>
