import { useState } from "react";
import { Link } from "react-router-dom";
import { getResources } from "../utils/resources";
import { getBookmarks, toggleBookmark } from "../utils/storage";
import { useLang } from "../i18n/LanguageContext";

export default function Bookmarks() {
  const { t } = useLang();
  const [resources] = useState(getResources());
  const [bookmarks, setBookmarks] = useState(getBookmarks());

  const saved = resources.filter((r) => bookmarks.includes(r.id));

  return (
    <section className="card">
      <h1>{t("saved.title")}</h1>

      {saved.length === 0 ? (
        <p>
          {t("saved.empty")} <Link to="/support">{t("saved.find")}</Link>
        </p>
      ) : (
        <ul className="resource-list">
          {saved.map((r) => (
            <li key={r.id} className="resource-item">
              <div className="resource-top">
                <h3>{r.name}</h3>
                <span className="badge">{t("cat." + r.category)}</span>
              </div>
              <p>{r.description}</p>
              <p className="resource-meta">
                {r.location}
                {r.phone && (
                  <>
                    {" "}&middot; <a href={"tel:" + r.phone}>{t("support.call")} {r.phone}</a>
                  </>
                )}
              </p>
              <button
                className="link-danger"
                onClick={() => setBookmarks(toggleBookmark(r.id))}
              >
                {t("saved.remove")}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
