import { useEffect, useState } from "react";

function TopNavigation({ navLinks, currentPath, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [currentPath]);

  const handleLinkClick = (event, path) => {
    event.preventDefault();

    if (path === currentPath) {
      return;
    }

    onNavigate(path);
  };

  return (
    <header className="route-nav">
      <div className="route-nav__row">
        <a className="route-nav__brand" href="/" onClick={(event) => handleLinkClick(event, "/")}>
          Job Notification App
        </a>

        <nav className="route-nav__desktop" aria-label="Primary">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;

            return (
              <a
                key={link.path}
                href={link.path}
                onClick={(event) => handleLinkClick(event, link.path)}
                className={`route-nav__link ${isActive ? "route-nav__link--active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <button
          type="button"
          className="route-nav__menu-button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-route-nav"
        >
          Menu
        </button>
      </div>

      {menuOpen && (
        <nav id="mobile-route-nav" className="route-nav__mobile-panel" aria-label="Mobile primary">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;

            return (
              <a
                key={link.path}
                href={link.path}
                onClick={(event) => handleLinkClick(event, link.path)}
                className={`route-nav__link ${isActive ? "route-nav__link--active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
      )}
    </header>
  );
}

export default TopNavigation;
