export const DEFAULT_SCROLL_OFFSET = 92;
export const STICKY_SUMMARY_SCROLL_OFFSET = 150;

export function scrollToAnchor(targetId: string, offset = DEFAULT_SCROLL_OFFSET) {
  if (typeof window === 'undefined') return;

  const target = document.getElementById(targetId);
  if (!target) return;

  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  window.history.replaceState(null, '', `#${targetId}`);
  window.scrollTo({ top, behavior: 'smooth' });
}
