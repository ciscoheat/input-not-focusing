<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types.js';

	let amount = $state(0);
	let errors: Record<string, string[] | undefined> = $state({ amount: undefined });
</script>

<div>
	<ol>
		<li>
			Submit the form, it should focus on the error field, but doesn't (min value should be 2)
		</li>
		<li>Submit again, it will focus on the error field now (as is expected the first time)</li>
		<li>
			Change the value to 2 and submit the form. No error and it should reset to zero, as expected
		</li>
		<li>Change the value to 1</li>
		<li>Submit the form, it will show error but it won't get focus again</li>
	</ol>

	<form
		method="POST"
		use:enhance={() => {
			return async ({ result }) => {
				if (result.type != 'success' && result.type != 'failure') return;
				const action = result.data as NonNullable<ActionData>;
				console.log(action);

				if (action.amount >= 2) {
					errors.amount = undefined;
					amount = 0;
				} else {
					errors.amount = ['Test error'];
					//setTimeout(() => { // Uncomment for a workaround
						document.querySelector<HTMLInputElement>('[aria-invalid="true"]')?.focus()
					//})
				}
			};
		}}
	>
		<input
			name="amount"
			type="number"
			class={errors.amount ? 'error' : ''}
			aria-invalid={errors.amount ? 'true' : undefined}
			bind:value={amount}
		/>
		<button>Submit</button>
	</form>

	<p>
		Sometimes, it will focus on the first submit. Other times, blurring the input element before
		submitting is required to reproduce.
	</p>
</div>

<style>
	:global(.error) {
		background-color: #fcc;
	}
</style>
