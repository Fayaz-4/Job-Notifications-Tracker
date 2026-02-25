import { useMemo, useState } from "react";
import FilterBar from "../components/jobs/FilterBar";
import JobCard from "../components/jobs/JobCard";
import JobModal from "../components/jobs/JobModal";

function DashboardPage({ jobs, savedJobIds, onToggleSave }) {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [mode, setMode] = useState("");
  const [experience, setExperience] = useState("");
  const [source, setSource] = useState("");
  const [sort, setSort] = useState("latest");
  const [selectedJob, setSelectedJob] = useState(null);

  const locationOptions = useMemo(
    () => [...new Set(jobs.map((job) => job.location))].sort((a, b) => a.localeCompare(b)),
    [jobs]
  );

  const filteredJobs = useMemo(() => {
    const searchTerm = keyword.trim().toLowerCase();

    const filtered = jobs.filter((job) => {
      const keywordMatch =
        searchTerm.length === 0 ||
        job.title.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm);

      const locationMatch = !location || job.location === location;
      const modeMatch = !mode || job.mode === mode;
      const experienceMatch = !experience || job.experience === experience;
      const sourceMatch = !source || job.source === source;

      return keywordMatch && locationMatch && modeMatch && experienceMatch && sourceMatch;
    });

    return filtered.sort((a, b) => {
      if (sort === "oldest") {
        return b.postedDaysAgo - a.postedDaysAgo;
      }

      if (sort === "company") {
        return a.company.localeCompare(b.company);
      }

      return a.postedDaysAgo - b.postedDaysAgo;
    });
  }, [experience, jobs, keyword, location, mode, sort, source]);

  const savedSet = useMemo(() => new Set(savedJobIds), [savedJobIds]);

  return (
    <section className="jobs-page">
      <header className="jobs-page__header">
        <h1>Dashboard</h1>
        <p>Curated Indian tech opportunities with clean filters and quick actions.</p>
      </header>

      <FilterBar
        keyword={keyword}
        location={location}
        mode={mode}
        experience={experience}
        source={source}
        sort={sort}
        locations={locationOptions}
        onKeywordChange={setKeyword}
        onLocationChange={setLocation}
        onModeChange={setMode}
        onExperienceChange={setExperience}
        onSourceChange={setSource}
        onSortChange={setSort}
      />

      {filteredJobs.length === 0 ? (
        <p className="jobs-empty-message">No jobs match your search.</p>
      ) : (
        <div className="jobs-grid">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={savedSet.has(job.id)}
              onView={setSelectedJob}
              onSave={onToggleSave}
            />
          ))}
        </div>
      )}

      <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
    </section>
  );
}

export default DashboardPage;
