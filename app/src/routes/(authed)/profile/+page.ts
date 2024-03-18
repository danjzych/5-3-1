import _531API from '$lib/api';

export async function load() {
	const exercises = await _531API.getExercises();

	return { exercises };
}
