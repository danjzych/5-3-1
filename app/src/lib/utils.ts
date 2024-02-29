import { get } from 'svelte/store';
import { user } from '../stores';
import { goto } from '$app/navigation';
import { onMount } from 'svelte';

export function ensureLoggedIn() {
	console.debug('ensureLoggedIn');

	function checkUser() {
		if (!get(user)) goto('/');
	}

	onMount(() => {
		checkUser();
	});
}
