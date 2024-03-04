import { get } from 'svelte/store';
import { user } from '../../stores';
import { redirect } from '@sveltejs/kit';

export const load = () => {
	if (!get(user)) {
		console.warn('Redirected: User not logged in.');
		redirect(302, '/');
	}
};
