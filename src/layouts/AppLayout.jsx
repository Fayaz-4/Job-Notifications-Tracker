import TopNavigation from "../components/TopNavigation";

function AppLayout({ navLinks, currentPath, onNavigate, children }) {
  return (
    <main className="route-shell">
      <TopNavigation navLinks={navLinks} currentPath={currentPath} onNavigate={onNavigate} />
      <section className="route-content">{children}</section>
    </main>
  );
}

export default AppLayout;
