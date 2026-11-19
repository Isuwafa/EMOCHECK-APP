import { useState } from "react";
import { Link } from "react-router-dom";
import { getCheckIns, deleteCheckIn } from "../utils/storage";

const MOOD_LABELS = {
  1: "Very low",
  2: "Low",
  3: "Okay",
  4: "Good",
  5: "Great",
};

function formatDate(iso) {
  return new Date(iso).toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function History() {
  const [entries, setEntries] = useState(getCheckIns());

  function handleDelete(id) {
    setEntries(deleteCheckIn(id));
  }

  const average =
    entries.length > 0
      ? (entries.reduce((sum, e) => sum + e.mood, 0) / entries.length).toFixed(1)
      : null;

  return (
    <section className="card">
      <h1>My Check-In History</h1>

      {entries.length === 0 ? (
        <p>
          You have no check-ins yet. <Link to="/checkin">Do your first check-in</Link>
        </p>
      ) : (
        <>
          <p className="summary">
            {entries.length} check-in{entries.length > 1 ? "s" : ""} &middot; average mood {average} / 5
          </p>

          <ul className="history-list">
            {entries.map((entry) => (
              <li key={entry.id} className="history-item">
                <div className="history-top">
                  <span className="history-date">{formatDate(entry.createdAt)}</span>
                  <span className="history-mood">
                    {entry.mood} / 5 &middot; {MOOD_LABELS[entry.mood]}
                  </span>
                </div>

                {entry.tags.length > 0 && (
                  <div className="tag-row">
                    {entry.tags.map((t) => (
                      <span key={t} className="tag static">{t}</span>
                    ))}
                  </div>
                )}

                {entry.reflection && <p className="history-reflection">{entry.reflection}</p>}

                <button className="link-danger" onClick={() => handleDelete(entry.id)}>
                  Delete this check-in
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
