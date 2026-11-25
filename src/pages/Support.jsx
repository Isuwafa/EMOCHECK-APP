import { useState } from "react";
import { getResources } from "../utils/resources";
import { CATEGORIES } from "../data/resources";
import { getBookmarks, toggleBookmark } from "../utils/storage";
import Recommendations from "../components/Recommendations";
import { useLang } from "../i18n/LanguageContext";

export default function Support() {
  const { t } = useLang();
  const [resources] = useState(getResources());
  const [bookmarks, setBookmarks] = useState(getBookmarks());
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = resources.filter((r) => {
    const matchesCategory = category === "All" || r.category === category;
    const text = (r.name + " " + r.description + " " + r.location).toLowerCase();
    return matchesCategory && text.includes(search.toLowerCase());
  });

  return (
    <section>
      <div className="crisis-banner">
        <strong>{t("support.bannerTitle")}</strong>
        <p>{t("support.banner")}</p>
        <p>
          <a href="tel:912">912</a> &middot; <a href="tel:114">114</a>
        </p>
      </div>

      <div className="card">
        <h1>{t("support.title")}</h1>
        <Recommendations />

        <input
          className="search"
          type="text"
          placeholder={t("support.search")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="tag-row filters">
          {["All", ...CATEGORIES].map((c) => (
            <button
              key={c}
              className={category === c ? "tag active" : "tag"}
              onClick={() => setCategory(c)}
            >
              {t("cat." + c)}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p>{t("support.none")}</p>
        ) : (
          <ul className="resource-list">
            {filtered.map((r) => {
              const saved = bookmarks.includes(r.id);
              return (
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
                    className={saved ? "save-btn saved" : "save-btn"}
                    onClick={() => setBookmarks(toggleBookmark(r.id))}
                  >
                    {saved ? t("support.saved") : t("support.save")}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
