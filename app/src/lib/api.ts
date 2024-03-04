import type { iUser } from '../../../api/types';

const _531_BASE_URL = 'http://localhost:3000';

export default class _531API {
	static token: string | null = null;

	static async request(
		endpoint: string,
		data: Record<string, any> | {} = {},
		method: string = 'GET',
	) {
		const url = `${_531_BASE_URL}/${endpoint}`;

		const headers = {
			authorization: `Bearer ${_531API.token}`,
			'content-type': 'application/json',
		};

		const body = method !== 'GET' ? JSON.stringify(data) : undefined;

		const resp = await fetch(url, { method, headers, body });

		if (!resp.ok) {
			console.error(`API ERROR: ${resp.status} ${resp.statusText}`);
			const { error } = await resp.json();
			throw new Error(error.message);
		}

		return await resp.json();
	}

	static async login(username: string, password: string): Promise<string> {
		const data = { username, password };

		const resp = await _531API.request('auth/token', data, 'POST');

		return resp.token;
	}

	static async signup(
		username: string,
		password: string,
		email: string,
	): Promise<string> {
		const data = { username, password, email };

		const resp = await _531API.request('auth/register', data, 'POST');

		return resp.token;
	}

	static async getUser(username: string): Promise<iUser> {
		const resp = await _531API.request(`users/${username}`);

		return resp.user;
	}
}
