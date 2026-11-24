import { useState } from "react";
import { Link } from "react-router-dom";
import { getResources } from "../utils/resources";
import { getBookmarks, toggleBookmark } from "../utils/storage";

export default function Bookmarks() {
  const [resources] = useState(getResources());
  const [bookmarks, setBookmarks] = useState(getBookmarks());

  const saved = resources.filter((r) => bookmarks.includes(r.id));

  return (
    <section className="card">
      <h1>Saved Resources</h1>

      {saved.length === 0 ? (
        <p>
          You have not saved any resources yet.{" "}
          <Link to="/support">Find support</Link>
        </p>
      ) : (
        <ul className="resource-list">
          {saved.map((r) => (
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
                className="link-danger"
                onClick={() => setBookmarks(toggleBookmark(r.id))}
              >
                Remove from saved
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
