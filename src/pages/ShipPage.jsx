function ShipPage({ isUnlocked }) {
  return (
    <section className="jobs-page">
      <header className="jobs-page__header">
        <h1>Ship</h1>
      </header>

      {isUnlocked ? (
        <section className="saved-empty-state">
          <h2>All tests completed. Ready to ship.</h2>
        </section>
      ) : (
        <section className="saved-empty-state">
          <h2>Complete all tests before shipping.</h2>
        </section>
      )}
    </section>
  );
}

export default ShipPage;
