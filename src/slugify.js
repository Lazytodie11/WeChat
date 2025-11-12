// Slugify utility for product and asset identifiers

/**
 * Convert an arbitrary string to a URL/ID-safe slug.
 * - Keep only a-z, 0-9 and hyphens
 * - Spaces and underscores to hyphens
 * - Collapse repeated hyphens
 * - Lowercase
 * - Non-latin scripts (e.g., Chinese) are removed (pinyin initials ignored)
 */
export function slugify(input) {
  const str = String(input ?? "");
  // Normalize to remove diacritics (é -> e)
  const normalized = str.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
  return normalized
    .replace(/[\s_]+/g, "-") // spaces/underscores -> hyphen
    .replace(/[^a-zA-Z0-9-]/g, "") // drop non a-z0-9 and hyphen
    .replace(/-+/g, "-") // collapse multiple hyphens
    .replace(/^-+|-+$/g, "") // trim edge hyphens
    .toLowerCase();
}

export default slugify;

