import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/svelte';
import LoginForm from './loginForm.svelte';

describe('LoginForm', () => {
	afterEach(() => cleanup());
	it('renders', () => {
		render(LoginForm);

		const btn = screen.getByRole('button');

		expect(btn).toBeInTheDocument();
	});
});
