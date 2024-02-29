<script lang="ts">
	import { user } from '../../stores';
	import { goto } from '$app/navigation';

	if ($user) {
		goto('/dashboard');
	}
</script>

<h2>I am the signup form</h2>
