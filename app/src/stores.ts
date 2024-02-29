import { writable } from 'svelte/store';

import type { iUser } from '../../api/types';

export const user = writable<iUser | null>(null);
