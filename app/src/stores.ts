import { writable } from 'svelte/store';

import User from '../../api/models/User';

export const user = writable<User>;
