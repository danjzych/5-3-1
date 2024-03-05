import { get } from 'svelte/store';
import { user } from '../../stores';
import { redirect } from '@sveltejs/kit';

export const load = () => {
	if (!get(user)) {
		redirect(307, '/');
	}
};
