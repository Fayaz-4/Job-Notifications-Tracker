function JobModal({ job, onClose }) {
  if (!job) {
    return null;
  }

  return (
    <div className="job-modal-overlay" role="presentation" onClick={onClose}>
      <section
        className="job-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`${job.title} details`}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="job-modal__header">
          <div>
            <h3 className="job-modal__title">{job.title}</h3>
            <p className="job-modal__company">
              {job.company} | {job.location}
            </p>
          </div>
          <button type="button" className="jobs-button jobs-button--ghost" onClick={onClose}>
            Close
          </button>
        </header>

        <div className="job-modal__content">
          {job.description.split("\n").map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div className="job-modal__skills">
          {job.skills.map((skill) => (
            <span key={skill} className="job-skill">
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

export default JobModal;
