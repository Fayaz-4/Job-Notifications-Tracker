function FilterBar({
  keyword,
  location,
  mode,
  experience,
  source,
  sort,
  showOnlyMatches,
  locations,
  onKeywordChange,
  onLocationChange,
  onModeChange,
  onExperienceChange,
  onSourceChange,
  onSortChange,
  onShowOnlyMatchesChange
}) {
  return (
    <section className="filter-bar" aria-label="Job filters">
      <label className="filter-bar__field">
        <span>Keyword</span>
        <input
          className="filter-bar__input"
          type="search"
          placeholder="Search title or company"
          value={keyword}
          onChange={(event) => onKeywordChange(event.target.value)}
        />
      </label>

      <label className="filter-bar__field">
        <span>Location</span>
        <select value={location} onChange={(event) => onLocationChange(event.target.value)}>
          <option value="">All locations</option>
          {locations.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label className="filter-bar__field">
        <span>Mode</span>
        <select value={mode} onChange={(event) => onModeChange(event.target.value)}>
          <option value="">All modes</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Onsite">Onsite</option>
        </select>
      </label>

      <label className="filter-bar__field">
        <span>Experience</span>
        <select value={experience} onChange={(event) => onExperienceChange(event.target.value)}>
          <option value="">All levels</option>
          <option value="Fresher">Fresher</option>
          <option value="0-1">0-1</option>
          <option value="1-3">1-3</option>
          <option value="3-5">3-5</option>
        </select>
      </label>

      <label className="filter-bar__field">
        <span>Source</span>
        <select value={source} onChange={(event) => onSourceChange(event.target.value)}>
          <option value="">All sources</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Naukri">Naukri</option>
          <option value="Indeed">Indeed</option>
        </select>
      </label>

      <label className="filter-bar__field">
        <span>Sort</span>
        <select value={sort} onChange={(event) => onSortChange(event.target.value)}>
          <option value="latest">Latest</option>
          <option value="matchScore">Match Score</option>
          <option value="salary">Salary</option>
        </select>
      </label>

      <label className="filter-bar__toggle">
        <input
          type="checkbox"
          checked={showOnlyMatches}
          onChange={(event) => onShowOnlyMatchesChange(event.target.checked)}
        />
        <span>Show only jobs above my threshold</span>
      </label>
    </section>
  );
}

export default FilterBar;
