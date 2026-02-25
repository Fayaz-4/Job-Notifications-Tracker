import { TEST_ITEMS, getPassedCount } from "../utils/testChecklist";

function TestChecklistPage({ testStatus, onToggleItem, onReset }) {
  const passedCount = getPassedCount(testStatus);

  return (
    <section className="jobs-page">
      <header className="jobs-page__header">
        <h1>Test Checklist</h1>
        <p>Tests Passed: {passedCount} / 10</p>
      </header>

      {passedCount < TEST_ITEMS.length && (
        <p className="jobs-banner">Resolve all issues before shipping.</p>
      )}

      <section className="test-checklist">
        {TEST_ITEMS.map((item) => (
          <label key={item.id} className="test-checklist__item">
            <input
              type="checkbox"
              checked={Boolean(testStatus[item.id])}
              onChange={() => onToggleItem(item.id)}
            />
            <span>{item.label}</span>
            <button type="button" className="test-checklist__hint" title="How to test">
              How to test
            </button>
          </label>
        ))}
      </section>

      <div className="settings-actions">
        <button type="button" className="jobs-button jobs-button--ghost" onClick={onReset}>
          Reset Test Status
        </button>
      </div>
    </section>
  );
}

export default TestChecklistPage;
