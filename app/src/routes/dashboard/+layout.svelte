<script lang="ts">
	import _531API from '$lib/api';
	import { user } from '../../stores';
	import { token } from '../_stores';
	import { goto } from '$app/navigation';
	import Nav from './Nav.svelte';

	function logout() {
		console.debug('logout');

		$user = null;
		$token = null;
		_531API.token = null;

		goto('/');
	}
</script>

<Nav {logout} />
<div class="position absolute top-16 min-w-full p-4">
	<slot />
</div>
