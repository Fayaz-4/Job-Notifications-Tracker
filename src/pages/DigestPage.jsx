import { useEffect, useMemo, useState } from "react";
import { calculateMatchScore } from "../utils/matchScore";
import { formatDigestText, readDigestForDate, saveDigestForDate } from "../utils/digest";

function getTodayLabel() {
  return new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function DigestPage({ jobs, preferences, statusUpdates }) {
  const [digest, setDigest] = useState(null);
  const [copyStatus, setCopyStatus] = useState("");

  useEffect(() => {
    const todayDigest = readDigestForDate();
    if (todayDigest) {
      setDigest(todayDigest);
    }
  }, []);

  const rankedJobs = useMemo(() => {
    if (!preferences) {
      return [];
    }

    return jobs
      .map((job) => ({
        ...job,
        matchScore: calculateMatchScore(job, preferences)
      }))
      .filter((job) => job.matchScore >= preferences.minMatchScore)
      .sort((a, b) => b.matchScore - a.matchScore || a.postedDaysAgo - b.postedDaysAgo);
  }, [jobs, preferences]);

  const handleGenerateDigest = () => {
    const existing = readDigestForDate();
    if (existing) {
      setDigest(existing);
      return;
    }

    const jobsForDigest = rankedJobs.slice(0, 10).map((job) => ({
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      experience: job.experience,
      matchScore: job.matchScore,
      applyUrl: job.applyUrl
    }));

    const createdDigest = {
      generatedAt: new Date().toISOString(),
      dateLabel: getTodayLabel(),
      jobs: jobsForDigest
    };

    saveDigestForDate(createdDigest);
    setDigest(createdDigest);
  };

  const handleCopyDigest = async () => {
    if (!digest) {
      return;
    }

    try {
      await navigator.clipboard.writeText(formatDigestText(digest));
      setCopyStatus("Digest copied.");
    } catch (error) {
      setCopyStatus("Copy failed.");
    }
  };

  const digestText = digest ? formatDigestText(digest) : "";
  const mailtoHref = `mailto:?subject=${encodeURIComponent("My 9AM Job Digest")}&body=${encodeURIComponent(digestText)}`;

  return (
    <section className="jobs-page">
      <header className="jobs-page__header">
        <h1>Digest</h1>
        <p className="digest-note">Demo Mode: Daily 9AM trigger simulated manually.</p>
      </header>

      {!preferences ? (
        <section className="saved-empty-state">
          <h2>Set preferences to generate a personalized digest.</h2>
        </section>
      ) : (
        <>
          <div className="digest-actions">
            <button type="button" className="jobs-button jobs-button--accent" onClick={handleGenerateDigest}>
              Generate Today's 9AM Digest (Simulated)
            </button>
            {digest && (
              <>
                <button type="button" className="jobs-button jobs-button--ghost" onClick={handleCopyDigest}>
                  Copy Digest to Clipboard
                </button>
                <a className="jobs-button jobs-button--ghost" href={mailtoHref}>
                  Create Email Draft
                </a>
              </>
            )}
            {copyStatus && <p className="settings-saved-text">{copyStatus}</p>}
          </div>

          {digest ? (
            digest.jobs.length === 0 ? (
              <section className="saved-empty-state">
                <h2>No matching roles today. Check again tomorrow.</h2>
              </section>
            ) : (
              <article className="digest-card">
                <header className="digest-card__header">
                  <h2>Top 10 Jobs For You - 9AM Digest</h2>
                  <p>{digest.dateLabel}</p>
                </header>

                <div className="digest-list">
                  {digest.jobs.map((job) => (
                    <section key={job.id} className="digest-item">
                      <h3>{job.title}</h3>
                      <p>{job.company}</p>
                      <p>
                        {job.location} | {job.experience}
                      </p>
                      <p>Match Score: {job.matchScore}</p>
                      <a className="jobs-button jobs-button--accent" href={job.applyUrl} target="_blank" rel="noreferrer noopener">
                        Apply
                      </a>
                    </section>
                  ))}
                </div>

                <footer className="digest-card__footer">
                  <p>This digest was generated based on your preferences.</p>
                </footer>
              </article>
            )
          ) : null}
        </>
      )}

      <article className="digest-card">
        <header className="digest-card__header">
          <h2>Recent Status Updates</h2>
        </header>
        {statusUpdates.length === 0 ? (
          <p className="digest-empty-update">No recent status updates.</p>
        ) : (
          <div className="digest-list">
            {statusUpdates.map((update) => (
              <section key={update.id} className="digest-item">
                <h3>{update.title}</h3>
                <p>{update.company}</p>
                <p>Status: {update.status}</p>
                <p>{new Date(update.changedAt).toLocaleString()}</p>
              </section>
            ))}
          </div>
        )}
      </article>
    </section>
  );
}

export default DigestPage;
