/**
 * Dialog utility functions for programmatic control
 */

/** Track the element that opened the dialog to return focus */
const triggerMap = new WeakMap<HTMLElement, HTMLElement>();

/** Track which dialogs have been initialized to avoid double-binding */
const initializedDialogs = new WeakSet<HTMLElement>();

/** Track currently focused element within dialog for focus trap */
function getFocusableElements(dialog: HTMLElement): HTMLElement[] {
	const selector = [
		'button:not([disabled])',
		'[href]',
		'input:not([disabled])',
		'select:not([disabled])',
		'textarea:not([disabled])',
		'[tabindex]:not([tabindex="-1"])',
	].join(', ');
	return Array.from(dialog.querySelectorAll<HTMLElement>(selector));
}

/**
 * Open a dialog by ID
 */
export function openDialog(id: string): void {
	const dialog = document.getElementById(id);
	if (!dialog) {
		console.warn(`Dialog with id "${id}" not found`);
		return;
	}

	// Store trigger element to return focus on close
	const activeElement = document.activeElement as HTMLElement;
	if (activeElement) {
		triggerMap.set(dialog, activeElement);
	}

	// Prevent body scroll
	document.body.style.overflow = 'hidden';

	// Open the dialog
	dialog.dataset.open = 'true';
	dialog.setAttribute('aria-hidden', 'false');

	// Focus the dialog container (not the close button) to avoid visible focus ring
	// The container has tabindex="-1" so it can receive focus without showing a ring
	requestAnimationFrame(() => {
		const container = dialog.querySelector<HTMLElement>('.dialog-container');
		container?.focus();
	});
}

/**
 * Close a dialog by ID
 */
export function closeDialog(id: string): void {
	const dialog = document.getElementById(id);
	if (!dialog) return;

	dialog.dataset.open = 'false';
	dialog.setAttribute('aria-hidden', 'true');

	// Restore body scroll
	document.body.style.overflow = '';

	// Return focus to trigger element
	const trigger = triggerMap.get(dialog);
	if (trigger && typeof trigger.focus === 'function') {
		trigger.focus();
		triggerMap.delete(dialog);
	}
}

/**
 * Initialize a dialog element with event handlers
 */
export function initDialog(dialog: HTMLElement): void {
	const id = dialog.id;
	if (!id) return;

	// Skip if already initialized
	if (initializedDialogs.has(dialog)) return;
	initializedDialogs.add(dialog);

	const backdrop = dialog.querySelector<HTMLElement>('[data-dialog-backdrop]');
	const closeBtn = dialog.querySelector<HTMLElement>('[data-dialog-close]');

	// Close on backdrop click
	backdrop?.addEventListener('click', () => closeDialog(id));

	// Close on close button click
	closeBtn?.addEventListener('click', () => closeDialog(id));

	// Global keyboard handling for Escape
	document.addEventListener('keydown', (e: KeyboardEvent) => {
		if (dialog.dataset.open !== 'true') return;

		// Escape to close
		if (e.key === 'Escape') {
			e.preventDefault();
			closeDialog(id);
			return;
		}
	});

	// Focus trap with Tab (on the dialog itself)
	dialog.addEventListener('keydown', (e: KeyboardEvent) => {
		if (dialog.dataset.open !== 'true') return;

		if (e.key === 'Tab') {
			const focusable = getFocusableElements(dialog);
			if (focusable.length === 0) return;

			const first = focusable[0];
			const last = focusable[focusable.length - 1];

			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault();
				first.focus();
			}
		}
	});
}

/**
 * Initialize all dialogs on the page
 */
export function initAllDialogs(): void {
	const dialogs = document.querySelectorAll<HTMLElement>('.dialog-root');
	dialogs.forEach((dialog) => initDialog(dialog));
}

