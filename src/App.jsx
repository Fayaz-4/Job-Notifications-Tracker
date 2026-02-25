import { useEffect, useMemo, useState } from "react";
import RoutePlaceholder from "./components/RoutePlaceholder";
import AppLayout from "./layouts/AppLayout";

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

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePathname(window.location.pathname));
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

  return (
    <AppLayout navLinks={NAV_LINKS} currentPath={currentPath} onNavigate={handleNavigate}>
      {isKnownRoute ? (
        <RoutePlaceholder title={ROUTE_TITLES[currentPath]} subtitle="This section will be built in the next step." />
      ) : (
        <RoutePlaceholder title="Page Not Found" subtitle="The page you are looking for does not exist." />
      )}
    </AppLayout>
  );
}

export default App;
