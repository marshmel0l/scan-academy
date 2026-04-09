/**
 * Module-level Set that persists across component remounts (page navigations).
 * Once a section ID is added here, it won't animate again for the session.
 */
const animatedSections = new Set<string>();

export function hasAnimated(id: string): boolean {
  return animatedSections.has(id);
}

export function markAnimated(id: string): void {
  animatedSections.add(id);
}
