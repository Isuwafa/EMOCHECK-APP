import { useState } from "react";
import { getResources } from "../utils/resources";
import { CATEGORIES } from "../data/resources";
import { getBookmarks, toggleBookmark } from "../utils/storage";

export default function Support() {
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
        <strong>Need help right now?</strong>
        <p>
          If you or someone else is in immediate danger, call{" "}
          <a href="tel:912">912</a> for an ambulance or{" "}
          <a href="tel:114">114</a> (toll free) and go to the nearest hospital.
          You do not have to face this alone.
        </p>
      </div>

      <div className="card">
        <h1>Find Support</h1>

        <input
          className="search"
          type="text"
          placeholder="Search by name, place or keyword"
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
              {c}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p>No resources match your search.</p>
        ) : (
          <ul className="resource-list">
            {filtered.map((r) => {
              const saved = bookmarks.includes(r.id);
              return (
                <li key={r.id} className="resource-item">
                  <div className="resource-top">
                    <h3>{r.name}</h3>
                    <span className="badge">{r.category}</span>
                  </div>
                  <p>{r.description}</p>
                  <p className="resource-meta">
                    {r.location}
                    {r.phone && (
                      <>
                        {" "}&middot; <a href={"tel:" + r.phone}>Call {r.phone}</a>
                      </>
                    )}
                  </p>
                  <button
                    className={saved ? "save-btn saved" : "save-btn"}
                    onClick={() => setBookmarks(toggleBookmark(r.id))}
                  >
                    {saved ? "Saved" : "Save"}
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
