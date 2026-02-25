function includesAny(haystack, needles) {
  if (!haystack || needles.length === 0) {
    return false;
  }

  const normalized = haystack.toLowerCase();
  return needles.some((needle) => normalized.includes(needle.toLowerCase()));
}

export function calculateMatchScore(job, preferences) {
  const safePreferences = preferences || {
    roleKeywords: [],
    preferredLocations: [],
    preferredMode: [],
    experienceLevel: "",
    skills: []
  };

  let score = 0;

  if (includesAny(job.title, safePreferences.roleKeywords)) {
    score += 25;
  }

  if (includesAny(job.description, safePreferences.roleKeywords)) {
    score += 15;
  }

  if (safePreferences.preferredLocations.includes(job.location)) {
    score += 15;
  }

  if (safePreferences.preferredMode.includes(job.mode)) {
    score += 10;
  }

  if (safePreferences.experienceLevel && safePreferences.experienceLevel === job.experience) {
    score += 10;
  }

  const skillOverlap = job.skills.some((skill) =>
    safePreferences.skills.some((preferredSkill) => preferredSkill.toLowerCase() === skill.toLowerCase())
  );
  if (skillOverlap) {
    score += 15;
  }

  if (job.postedDaysAgo <= 2) {
    score += 5;
  }

  if (job.source === "LinkedIn") {
    score += 5;
  }

  return Math.min(100, score);
}

export function getScoreBand(score) {
  if (score >= 80) {
    return "high";
  }

  if (score >= 60) {
    return "mid";
  }

  if (score >= 40) {
    return "base";
  }

  return "low";
}

export function extractSalaryValue(salaryRange) {
  if (!salaryRange || typeof salaryRange !== "string") {
    return 0;
  }

  const compact = salaryRange.toLowerCase();
  const numericValues = compact.match(/\d+(?:\.\d+)?/g);
  if (!numericValues || numericValues.length === 0) {
    return 0;
  }

  if (compact.includes("lpa")) {
    return Number(numericValues[numericValues.length - 1]);
  }

  if (compact.includes("/month")) {
    const maxValue = Number(numericValues[numericValues.length - 1]);
    const maxMonthly = compact.includes("k") ? maxValue * 1000 : maxValue;
    return (maxMonthly * 12) / 100000;
  }

  return 0;
}
