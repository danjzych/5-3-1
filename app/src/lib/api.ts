const _531_BASE_URL = 'http://localhost:3000';

export default class _531API {
	static token = null;

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

		const body = JSON.stringify(data);

		const resp = await fetch(url, { method, headers, body });

		if (resp.status !== 200) {
			throw new Error('something went wrong');
		}

		return await resp.json();
	}

	static async login(username: string, password: string) {
		const data = { username, password };

		return await _531API.request('auth/token', data, 'POST');
	}
}
