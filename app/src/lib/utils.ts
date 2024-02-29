import { get } from 'svelte/store';
import { user } from '../stores';
import { goto } from '$app/navigation';

export function ensureLoggedIn() {
	function checkUser() {
		if (!get(user)) goto('/');
	}
}
