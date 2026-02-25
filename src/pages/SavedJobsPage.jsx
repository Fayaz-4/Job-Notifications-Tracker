import { useMemo, useState } from "react";
import JobCard from "../components/jobs/JobCard";
import JobModal from "../components/jobs/JobModal";
import { getJobStatus } from "../utils/jobStatus";

function SavedJobsPage({ jobs, savedJobIds, statusMap, onToggleSave, onStatusChange }) {
  const [selectedJob, setSelectedJob] = useState(null);

  const savedJobs = useMemo(() => {
    const savedSet = new Set(savedJobIds);
    return jobs.filter((job) => savedSet.has(job.id));
  }, [jobs, savedJobIds]);

  const savedSet = useMemo(() => new Set(savedJobIds), [savedJobIds]);

  return (
    <section className="jobs-page">
      <header className="jobs-page__header">
        <h1>Saved Jobs</h1>
        <p>Your shortlisted opportunities stay available across reloads.</p>
      </header>

      {savedJobs.length === 0 ? (
        <section className="saved-empty-state">
          <h2>No saved jobs yet</h2>
          <p>Save roles from the dashboard to build your interview pipeline.</p>
        </section>
      ) : (
        <div className="jobs-grid">
          {savedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={savedSet.has(job.id)}
              status={getJobStatus(statusMap, job.id)}
              onView={setSelectedJob}
              onSave={onToggleSave}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      )}

      <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
    </section>
  );
}

export default SavedJobsPage;

