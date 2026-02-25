import { useCallback, useMemo, useState } from "react";
import FilterBar from "../components/jobs/FilterBar";
import JobCard from "../components/jobs/JobCard";
import JobModal from "../components/jobs/JobModal";
import { calculateMatchScore, extractSalaryValue } from "../utils/matchScore";

function DashboardPage({ jobs, savedJobIds, preferences, onToggleSave }) {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [mode, setMode] = useState("");
  const [experience, setExperience] = useState("");
  const [source, setSource] = useState("");
  const [sort, setSort] = useState("latest");
  const [showOnlyMatches, setShowOnlyMatches] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const locationOptions = useMemo(
    () => [...new Set(jobs.map((job) => job.location))].sort((a, b) => a.localeCompare(b)),
    [jobs]
  );

  const jobsWithScores = useMemo(
    () =>
      jobs.map((job) => ({
        ...job,
        matchScore: calculateMatchScore(job, preferences),
        salaryValue: extractSalaryValue(job.salaryRange)
      })),
    [jobs, preferences]
  );

  const filteredJobs = useMemo(() => {
    const searchTerm = keyword.trim().toLowerCase();

    const filtered = jobsWithScores.filter((job) => {
      const keywordMatch =
        searchTerm.length === 0 ||
        job.title.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm);

      const locationMatch = !location || job.location === location;
      const modeMatch = !mode || job.mode === mode;
      const experienceMatch = !experience || job.experience === experience;
      const sourceMatch = !source || job.source === source;
      const thresholdMatch = !showOnlyMatches || job.matchScore >= (preferences?.minMatchScore ?? 40);

      return keywordMatch && locationMatch && modeMatch && experienceMatch && sourceMatch && thresholdMatch;
    });

    return filtered.sort((a, b) => {
      if (sort === "matchScore") {
        return b.matchScore - a.matchScore || a.postedDaysAgo - b.postedDaysAgo;
      }

      if (sort === "salary") {
        return b.salaryValue - a.salaryValue || a.postedDaysAgo - b.postedDaysAgo;
      }

      return a.postedDaysAgo - b.postedDaysAgo;
    });
  }, [experience, jobsWithScores, keyword, location, mode, preferences?.minMatchScore, showOnlyMatches, sort, source]);

  const savedSet = useMemo(() => new Set(savedJobIds), [savedJobIds]);
  const handleView = useCallback((job) => setSelectedJob(job), []);
  const handleCloseModal = useCallback(() => setSelectedJob(null), []);

  return (
    <section className="jobs-page">
      <header className="jobs-page__header">
        <h1>Dashboard</h1>
        <p>Curated Indian tech opportunities with clean filters and quick actions.</p>
      </header>

      {!preferences && (
        <p className="jobs-banner">Set your preferences to activate intelligent matching.</p>
      )}

      <FilterBar
        keyword={keyword}
        location={location}
        mode={mode}
        experience={experience}
        source={source}
        sort={sort}
        showOnlyMatches={showOnlyMatches}
        locations={locationOptions}
        onKeywordChange={setKeyword}
        onLocationChange={setLocation}
        onModeChange={setMode}
        onExperienceChange={setExperience}
        onSourceChange={setSource}
        onSortChange={setSort}
        onShowOnlyMatchesChange={setShowOnlyMatches}
      />

      {filteredJobs.length === 0 ? (
        <section className="saved-empty-state">
          <h2>No roles match your criteria. Adjust filters or lower threshold.</h2>
        </section>
      ) : (
        <div className="jobs-grid">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} isSaved={savedSet.has(job.id)} onView={handleView} onSave={onToggleSave} />
          ))}
        </div>
      )}

      <JobModal job={selectedJob} onClose={handleCloseModal} />
    </section>
  );
}

export default DashboardPage;
