import type { DevTreeLink, SocialNetwork } from "../types/DevTreeLinks";

/**
 * Builds the stored links array from editor state, respecting order rules:
 * - Newly enabled links go to the first position
 * - Already-enabled links keep their current stored order
 * - Disabled links go after enabled ones
 * - Only links with non-empty URLs are included
 * - Each link gets id = name (stable for drag-and-drop)
 */
export function buildStoredLinks(
  editorState: DevTreeLink[],
  currentStored: SocialNetwork[],
): SocialNetwork[] {
  const withUrls = editorState.filter((l) => l.url.trim() !== "");

  const newlyEnabled: SocialNetwork[] = [];
  const existingEnabled: SocialNetwork[] = [];
  const disabled: SocialNetwork[] = [];

  for (const link of withUrls) {
    const asStored: SocialNetwork = { ...link, id: link.name };
    const prev = currentStored.find((s) => s.name === link.name);

    if (link.enabled) {
      if (!prev || !prev.enabled) {
        newlyEnabled.push(asStored);
      } else {
        existingEnabled.push(asStored);
      }
    } else {
      disabled.push(asStored);
    }
  }

  // Preserve the stored order for existing enabled links
  existingEnabled.sort((a, b) => {
    const ai = currentStored.findIndex((s) => s.name === a.name);
    const bi = currentStored.findIndex((s) => s.name === b.name);
    return ai - bi;
  });

  return [...newlyEnabled, ...existingEnabled, ...disabled];
}
