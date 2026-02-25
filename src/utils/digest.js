function getTodayLocalDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getDigestStorageKey(dateString = getTodayLocalDateString()) {
  return `jobTrackerDigest_${dateString}`;
}

export function readDigestForDate(dateString = getTodayLocalDateString()) {
  try {
    const raw = window.localStorage.getItem(getDigestStorageKey(dateString));
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.jobs)) {
      return null;
    }

    return parsed;
  } catch (error) {
    return null;
  }
}

export function saveDigestForDate(digest, dateString = getTodayLocalDateString()) {
  window.localStorage.setItem(getDigestStorageKey(dateString), JSON.stringify(digest));
}

export function formatDigestText(digest) {
  const lines = [
    "Top 10 Jobs For You - 9AM Digest",
    `Date: ${digest.dateLabel}`,
    ""
  ];

  digest.jobs.forEach((job, index) => {
    lines.push(
      `${index + 1}. ${job.title} | ${job.company}`,
      `   Location: ${job.location}`,
      `   Experience: ${job.experience}`,
      `   Match Score: ${job.matchScore}`,
      `   Apply: ${job.applyUrl}`,
      ""
    );
  });

  lines.push("This digest was generated based on your preferences.");
  return lines.join("\n");
}
