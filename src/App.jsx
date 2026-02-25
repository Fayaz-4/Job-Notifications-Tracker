import { useEffect, useMemo, useState } from "react";
import RoutePlaceholder from "./components/RoutePlaceholder";
import { jobs } from "./data/jobs";
import AppLayout from "./layouts/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import SavedJobsPage from "./pages/SavedJobsPage";
import SettingsPage from "./pages/SettingsPage";
import { getPreferences, savePreferences } from "./utils/preferences";
import { getSavedJobIds, toggleSavedJob } from "./utils/savedJobs";

const NAV_LINKS = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Saved", path: "/saved" },
  { label: "Digest", path: "/digest" },
  { label: "Settings", path: "/settings" },
  { label: "Proof", path: "/proof" }
];

const ROUTE_TITLES = {
  "/": "Home",
  "/dashboard": "Dashboard",
  "/settings": "Settings",
  "/saved": "Saved",
  "/digest": "Digest",
  "/proof": "Proof"
};

function normalizePathname(pathname) {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

function App() {
  const [currentPath, setCurrentPath] = useState(() => normalizePathname(window.location.pathname));
  const [savedJobIds, setSavedJobIds] = useState([]);
  const [preferences, setPreferences] = useState(null);

  useEffect(() => {
    setSavedJobIds(getSavedJobIds());
    setPreferences(getPreferences());

    const handlePopState = () => {
      setCurrentPath(normalizePathname(window.location.pathname));
      setSavedJobIds(getSavedJobIds());
      setPreferences(getPreferences());
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const isKnownRoute = useMemo(() => Object.hasOwn(ROUTE_TITLES, currentPath), [currentPath]);

  const handleNavigate = (nextPath) => {
    if (nextPath === currentPath) {
      return;
    }

    window.history.pushState({}, "", nextPath);
    setCurrentPath(nextPath);
  };

  const handleToggleSave = (jobId) => {
    const nextSavedJobIds = toggleSavedJob(jobId);
    setSavedJobIds(nextSavedJobIds);
  };

  const handleSavePreferences = (nextPreferences) => {
    const saved = savePreferences(nextPreferences);
    setPreferences(saved);
  };

  const locationOptions = useMemo(
    () => [...new Set(jobs.map((job) => job.location))].sort((a, b) => a.localeCompare(b)),
    []
  );

  const routeContent = (() => {
    if (!isKnownRoute) {
      return <RoutePlaceholder title="Page Not Found" subtitle="The page you are looking for does not exist." />;
    }

    if (currentPath === "/dashboard") {
      return (
        <DashboardPage
          jobs={jobs}
          savedJobIds={savedJobIds}
          preferences={preferences}
          onToggleSave={handleToggleSave}
        />
      );
    }

    if (currentPath === "/saved") {
      return <SavedJobsPage jobs={jobs} savedJobIds={savedJobIds} onToggleSave={handleToggleSave} />;
    }

    if (currentPath === "/settings") {
      return (
        <SettingsPage
          locations={locationOptions}
          preferences={preferences}
          onSavePreferences={handleSavePreferences}
        />
      );
    }

    return <RoutePlaceholder title={ROUTE_TITLES[currentPath]} subtitle="This section will be built in the next step." />;
  })();

  return (
    <AppLayout navLinks={NAV_LINKS} currentPath={currentPath} onNavigate={handleNavigate}>
      {routeContent}
    </AppLayout>
  );
}

export default App;
