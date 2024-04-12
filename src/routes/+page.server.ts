import type { Actions, PageServerLoad } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		return { amount: +formData.get('amount')! };
	}
};
