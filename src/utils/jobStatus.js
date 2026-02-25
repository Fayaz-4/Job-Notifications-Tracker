const STATUS_KEY = "jobTrackerStatus";
const STATUS_UPDATES_KEY = "jobTrackerStatusUpdates";

export const JOB_STATUSES = ["Not Applied", "Applied", "Rejected", "Selected"];

export function getDefaultStatus() {
  return "Not Applied";
}

export function normalizeStatus(value) {
  return JOB_STATUSES.includes(value) ? value : getDefaultStatus();
}

export function readStatusMap() {
  try {
    const raw = window.localStorage.getItem(STATUS_KEY);
    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }

    return Object.fromEntries(
      Object.entries(parsed).map(([jobId, status]) => [jobId, normalizeStatus(status)])
    );
  } catch (error) {
    return {};
  }
}

function writeStatusMap(statusMap) {
  window.localStorage.setItem(STATUS_KEY, JSON.stringify(statusMap));
}

export function getJobStatus(statusMap, jobId) {
  return normalizeStatus(statusMap[jobId]);
}

function readStatusUpdates() {
  try {
    const raw = window.localStorage.getItem(STATUS_UPDATES_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function writeStatusUpdates(updates) {
  window.localStorage.setItem(STATUS_UPDATES_KEY, JSON.stringify(updates));
}

export function getStatusUpdates(limit = 10) {
  return readStatusUpdates().slice(0, limit);
}

export function updateJobStatus({ statusMap, job, status }) {
  const nextStatus = normalizeStatus(status);
  const nextMap = { ...statusMap, [job.id]: nextStatus };
  writeStatusMap(nextMap);

  const updates = readStatusUpdates();
  const nowIso = new Date().toISOString();
  const entry = {
    id: `${job.id}-${nowIso}`,
    jobId: job.id,
    title: job.title,
    company: job.company,
    status: nextStatus,
    changedAt: nowIso
  };

  const nextUpdates = [entry, ...updates].slice(0, 50);
  writeStatusUpdates(nextUpdates);

  return { statusMap: nextMap, updates: nextUpdates };
}
