import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/checkin", label: "Check-In" },
  { to: "/history", label: "History" },
  { to: "/support", label: "Find Support" },
  { to: "/bookmarks", label: "Saved" },
  { to: "/settings", label: "My Data" },
  { to: "/admin", label: "Admin" },
];

export default function Navbar() {
  return (
    <nav className="navbar">
      <span className="brand">EmoCheck</span>
      <ul>
        {links.map((l) => (
          <li key={l.to}>
            <NavLink to={l.to} end={l.to === "/"}>
              {l.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
