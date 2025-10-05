export type TypedTextOptions = {
  baseDelayMs?: number;
  jitterMs?: number;
  signal?: AbortSignal;
};

function getReducedMotionPreferred(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Reveal text inside an element character-by-character with light jitter.
 * - Respects user reduced motion preference by rendering instantly.
 * - Stops cleanly if the element is disconnected or the provided AbortSignal is aborted.
 */
export async function typedText(
  element: HTMLElement | null,
  text: string,
  options: TypedTextOptions = {}
): Promise<void> {
  if (!element) return;

  const baseDelayMs = options.baseDelayMs ?? 28;
  const jitterMs = options.jitterMs ?? 32;
  const signal = options.signal;

  // If user prefers reduced motion, render instantly
  if (getReducedMotionPreferred()) {
    element.textContent = text;
    return;
  }

  // If already aborted or element is gone, render final text and exit
  if (signal?.aborted || !element.isConnected) {
    element.textContent = text;
    return;
  }

  element.textContent = '';

  for (const ch of text) {
    if (signal?.aborted || !element.isConnected) {
      element.textContent = text;
      return;
    }

    element.textContent += ch;

    const delay = baseDelayMs + Math.floor(Math.random() * (jitterMs + 1));
    await sleep(delay);
  }
}

export default typedText;
