<script lang="ts">
	import _531API from '$lib/api';
	import LoginForm from './loginForm.svelte';
</script>

<div
	class="flex min-w-full flex-col items-center gap-3 px-3 py-4 text-center"
>
	<h2 class="text-lg font-medium">Welcome to the 5/3/1 tracking app!</h2>
	<p class="text-gray-500">Login to see your current training block</p>
	<LoginForm />
	<p class="text-gray-500">or</p>
	<button class="btn btn-info btn-md w-32">
		<a href="/signup">Sign up</a>
	</button>
</div>
