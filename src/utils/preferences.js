const PREFERENCES_KEY = "jobTrackerPreferences";

export const DEFAULT_PREFERENCES = {
  roleKeywords: [],
  preferredLocations: [],
  preferredMode: [],
  experienceLevel: "",
  skills: [],
  minMatchScore: 40
};

function normalizeList(input) {
  if (!Array.isArray(input)) {
    return [];
  }

  return input
    .map((item) => String(item).trim())
    .filter(Boolean);
}

function normalizePreferences(input) {
  if (!input || typeof input !== "object") {
    return { ...DEFAULT_PREFERENCES };
  }

  const minMatchScore = Number(input.minMatchScore);

  return {
    roleKeywords: normalizeList(input.roleKeywords),
    preferredLocations: normalizeList(input.preferredLocations),
    preferredMode: normalizeList(input.preferredMode),
    experienceLevel: typeof input.experienceLevel === "string" ? input.experienceLevel : "",
    skills: normalizeList(input.skills),
    minMatchScore: Number.isFinite(minMatchScore) ? Math.max(0, Math.min(100, minMatchScore)) : 40
  };
}

export function parseCommaSeparated(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function getPreferences() {
  try {
    const raw = window.localStorage.getItem(PREFERENCES_KEY);
    if (!raw) {
      return null;
    }

    return normalizePreferences(JSON.parse(raw));
  } catch (error) {
    return null;
  }
}

export function savePreferences(preferences) {
  const normalized = normalizePreferences(preferences);
  window.localStorage.setItem(PREFERENCES_KEY, JSON.stringify(normalized));
  return normalized;
}
