import { useEffect, useState } from "react";
import { DEFAULT_PREFERENCES, parseCommaSeparated } from "../utils/preferences";

function SettingsPage({ locations, preferences, onSavePreferences }) {
  const [roleKeywords, setRoleKeywords] = useState("");
  const [preferredLocations, setPreferredLocations] = useState([]);
  const [preferredMode, setPreferredMode] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState("");
  const [skills, setSkills] = useState("");
  const [minMatchScore, setMinMatchScore] = useState(DEFAULT_PREFERENCES.minMatchScore);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const source = preferences || DEFAULT_PREFERENCES;
    setRoleKeywords(source.roleKeywords.join(", "));
    setPreferredLocations(source.preferredLocations);
    setPreferredMode(source.preferredMode);
    setExperienceLevel(source.experienceLevel);
    setSkills(source.skills.join(", "));
    setMinMatchScore(source.minMatchScore);
  }, [preferences]);

  const handleLocationsChange = (event) => {
    const values = Array.from(event.target.selectedOptions, (option) => option.value);
    setPreferredLocations(values);
  };

  const handleModeToggle = (mode) => {
    setPreferredMode((current) => (current.includes(mode) ? current.filter((item) => item !== mode) : [...current, mode]));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSavePreferences({
      roleKeywords: parseCommaSeparated(roleKeywords),
      preferredLocations,
      preferredMode,
      experienceLevel,
      skills: parseCommaSeparated(skills),
      minMatchScore: Number(minMatchScore)
    });

    setSavedMessage("Preferences saved.");
  };

  return (
    <section className="jobs-page">
      <header className="jobs-page__header">
        <h1>Settings</h1>
        <p>Set your preferences to activate intelligent matching.</p>
      </header>

      <form className="settings-form" onSubmit={handleSubmit}>
        <label className="settings-field">
          <span>Role Keywords</span>
          <input
            className="filter-bar__input"
            type="text"
            placeholder="React Developer, Backend, Intern"
            value={roleKeywords}
            onChange={(event) => setRoleKeywords(event.target.value)}
          />
        </label>

        <label className="settings-field">
          <span>Preferred Locations</span>
          <select multiple className="settings-multi-select" value={preferredLocations} onChange={handleLocationsChange}>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </label>

        <fieldset className="settings-field settings-modes">
          <legend>Preferred Mode</legend>
          <label>
            <input
              type="checkbox"
              checked={preferredMode.includes("Remote")}
              onChange={() => handleModeToggle("Remote")}
            />
            <span>Remote</span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={preferredMode.includes("Hybrid")}
              onChange={() => handleModeToggle("Hybrid")}
            />
            <span>Hybrid</span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={preferredMode.includes("Onsite")}
              onChange={() => handleModeToggle("Onsite")}
            />
            <span>Onsite</span>
          </label>
        </fieldset>

        <label className="settings-field">
          <span>Experience Level</span>
          <select value={experienceLevel} onChange={(event) => setExperienceLevel(event.target.value)}>
            <option value="">Any</option>
            <option value="Fresher">Fresher</option>
            <option value="0-1">0-1</option>
            <option value="1-3">1-3</option>
            <option value="3-5">3-5</option>
          </select>
        </label>

        <label className="settings-field">
          <span>Skills</span>
          <input
            className="filter-bar__input"
            type="text"
            placeholder="React, SQL, Node.js"
            value={skills}
            onChange={(event) => setSkills(event.target.value)}
          />
        </label>

        <label className="settings-field">
          <span>Min Match Score: {minMatchScore}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={minMatchScore}
            onChange={(event) => setMinMatchScore(Number(event.target.value))}
          />
        </label>

        <div className="settings-actions">
          <button type="submit" className="jobs-button jobs-button--accent">
            Save Preferences
          </button>
          {savedMessage && <p className="settings-saved-text">{savedMessage}</p>}
        </div>
      </form>
    </section>
  );
}

export default SettingsPage;
