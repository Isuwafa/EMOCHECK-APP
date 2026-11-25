import { NavLink } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";

const links = [
  { to: "/", key: "nav.home" },
  { to: "/checkin", key: "nav.checkin" },
  { to: "/history", key: "nav.history" },
  { to: "/support", key: "nav.support" },
  { to: "/bookmarks", key: "nav.saved" },
  { to: "/settings", key: "nav.data" },
  { to: "/admin", key: "nav.admin" },
];

export default function Navbar() {
  const { t, lang, setLang } = useLang();

  return (
    <nav className="navbar">
      <span className="brand">EmoCheck</span>
      <ul>
        {links.map((l) => (
          <li key={l.to}>
            <NavLink to={l.to} end={l.to === "/"}>
              {t(l.key)}
            </NavLink>
          </li>
        ))}
        <li className="lang">
          <button
            className={lang === "en" ? "lang-btn active" : "lang-btn"}
            onClick={() => setLang("en")}
          >
            EN
          </button>
          <button
            className={lang === "rw" ? "lang-btn active" : "lang-btn"}
            onClick={() => setLang("rw")}
          >
            RW
          </button>
        </li>
      </ul>
    </nav>
  );
}
