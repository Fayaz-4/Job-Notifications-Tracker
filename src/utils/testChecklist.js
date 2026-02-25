const TEST_STATUS_KEY = "jobTrackerTestStatus";

export const TEST_ITEMS = [
  { id: "preferences_persist", label: "Preferences persist after refresh" },
  { id: "match_score_correct", label: "Match score calculates correctly" },
  { id: "show_only_matches", label: "\"Show only matches\" toggle works" },
  { id: "save_job_persist", label: "Save job persists after refresh" },
  { id: "apply_new_tab", label: "Apply opens in new tab" },
  { id: "status_persist", label: "Status update persists after refresh" },
  { id: "status_filter", label: "Status filter works correctly" },
  { id: "digest_top_10", label: "Digest generates top 10 by score" },
  { id: "digest_day_persist", label: "Digest persists for the day" },
  { id: "no_console_errors", label: "No console errors on main pages" }
];

export function createEmptyTestStatus() {
  return Object.fromEntries(TEST_ITEMS.map((item) => [item.id, false]));
}

export function readTestStatus() {
  try {
    const raw = window.localStorage.getItem(TEST_STATUS_KEY);
    if (!raw) {
      return createEmptyTestStatus();
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return createEmptyTestStatus();
    }

    const empty = createEmptyTestStatus();
    return Object.fromEntries(
      Object.keys(empty).map((key) => [key, Boolean(parsed[key])])
    );
  } catch (error) {
    return createEmptyTestStatus();
  }
}

export function writeTestStatus(statusMap) {
  window.localStorage.setItem(TEST_STATUS_KEY, JSON.stringify(statusMap));
}

export function resetTestStatus() {
  const empty = createEmptyTestStatus();
  writeTestStatus(empty);
  return empty;
}

export function getPassedCount(statusMap) {
  return TEST_ITEMS.reduce((count, item) => count + (statusMap[item.id] ? 1 : 0), 0);
}
