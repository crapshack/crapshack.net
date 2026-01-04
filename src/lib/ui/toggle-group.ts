/**
 * Toggle group initialization via event delegation.
 * Single listener handles all toggle groups on the page.
 */

let initialized = false;

export function initToggleGroups(): void {
	if (initialized) return;
	initialized = true;

	document.addEventListener('change', (e) => {
		const target = e.target;
		if (!(target instanceof HTMLInputElement)) return;
		if (target.type !== 'radio') return;
		if (!target.checked) return;

		const group = target.closest<HTMLElement>('[data-toggle-group]');
		if (!group) return;

		group.dispatchEvent(
			new CustomEvent('toggle-change', {
				detail: { value: target.value },
				bubbles: true,
			})
		);
	});
}
