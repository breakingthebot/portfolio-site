/*
 * src/components/NavBar.jsx
 * Site-wide navigation with active-link highlighting.
 * Connects to: src/App.jsx
 * Created: 2026-07-06
 */

import { NavLink } from "react-router-dom";

import "./NavBar.css";

const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/projects", label: "Projects" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

function NavBar() {
  return (
    <header className="nav-bar">
      <NavLink to="/" className="nav-brand" end>
        Your Name
      </NavLink>
      <nav>
        <ul className="nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) => (isActive ? "nav-link nav-link-active" : "nav-link")}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
