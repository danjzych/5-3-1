export const ssr = false;

export async function load() {
	const token = localStorage.getItem('token');

	return {
		token,
	};
}
