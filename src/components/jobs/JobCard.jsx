import { memo } from "react";
import { getScoreBand } from "../../utils/matchScore";

function getStatusTone(status) {
  if (status === "Applied") {
    return "applied";
  }

  if (status === "Rejected") {
    return "rejected";
  }

  if (status === "Selected") {
    return "selected";
  }

  return "neutral";
}

function JobCard({ job, isSaved, status, onView, onSave, onStatusChange }) {
  const scoreBand = getScoreBand(job.matchScore || 0);
  const statusTone = getStatusTone(status);

  return (
    <article className="job-card">
      <header className="job-card__header">
        <div>
          <h2 className="job-card__title">{job.title}</h2>
          <p className="job-card__company">{job.company}</p>
        </div>
        <div className="job-card__header-badges">
          <span className={`job-score-badge job-score-badge--${scoreBand}`}>Match {job.matchScore || 0}</span>
          <span className="job-card__source">{job.source}</span>
        </div>
      </header>

      <div className="job-card__meta">
        <p>{job.location}</p>
        <p>{job.mode}</p>
        <p>{job.experience}</p>
        <p>{job.salaryRange}</p>
        <p>{job.postedDaysAgo === 0 ? "Today" : `${job.postedDaysAgo} days ago`}</p>
      </div>

      <div className="job-card__status-row">
        <span className={`job-status-badge job-status-badge--${statusTone}`}>{status}</span>
        <div className="job-status-group">
          <button type="button" className="job-status-action" onClick={() => onStatusChange(job, "Not Applied")}>
            Not Applied
          </button>
          <button type="button" className="job-status-action" onClick={() => onStatusChange(job, "Applied")}>
            Applied
          </button>
          <button type="button" className="job-status-action" onClick={() => onStatusChange(job, "Rejected")}>
            Rejected
          </button>
          <button type="button" className="job-status-action" onClick={() => onStatusChange(job, "Selected")}>
            Selected
          </button>
        </div>
      </div>

      <footer className="job-card__actions">
        <button type="button" className="jobs-button jobs-button--ghost" onClick={() => onView(job)}>
          View
        </button>
        <button type="button" className="jobs-button jobs-button--ghost" onClick={() => onSave(job.id)}>
          {isSaved ? "Saved" : "Save"}
        </button>
        <a className="jobs-button jobs-button--accent" href={job.applyUrl} target="_blank" rel="noreferrer noopener">
          Apply
        </a>
      </footer>
    </article>
  );
}

export default memo(JobCard);
