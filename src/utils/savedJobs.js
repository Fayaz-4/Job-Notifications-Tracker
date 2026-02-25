const STORAGE_KEY = "job-tracker:saved-jobs";

export function getSavedJobIds() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

export function setSavedJobIds(jobIds) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(jobIds));
}

export function toggleSavedJob(jobId) {
  const saved = new Set(getSavedJobIds());
  if (saved.has(jobId)) {
    saved.delete(jobId);
  } else {
    saved.add(jobId);
  }

  const result = [...saved];
  setSavedJobIds(result);
  return result;
}
