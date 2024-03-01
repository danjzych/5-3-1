import { get } from 'svelte/store';
import { user } from '../../stores';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = () => {
	if (!get(user)) {
		console.warn('Redirected: User not logged in.');
		redirect(302, '/');
	}
};
