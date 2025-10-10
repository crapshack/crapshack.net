export async function copyTextToClipboard(text: string): Promise<boolean> {
    try {
        if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
            await navigator.clipboard.writeText(text);
            return true;
        }
    } catch {
        // fall through to fallback
    }

    // Fallback approach using a temporary textarea element
    try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        // Avoid scrolling to bottom
        textarea.style.position = 'fixed';
        textarea.style.top = '0';
        textarea.style.left = '0';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textarea);
        return successful;
    } catch {
        return false;
    }
}

export function toAbsoluteUrl(maybeRelativeUrl: string): string {
    try {
        const url = new URL(maybeRelativeUrl, window.location.origin);
        // Strip query params and hash to return only the base path
        url.search = '';
        url.hash = '';
        return url.toString();
    } catch {
        return maybeRelativeUrl;
    }
}
