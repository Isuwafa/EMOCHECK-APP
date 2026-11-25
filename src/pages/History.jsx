import { useState } from "react";
import { Link } from "react-router-dom";
import { getCheckIns, deleteCheckIn } from "../utils/storage";
import { useLang } from "../i18n/LanguageContext";

function formatDate(iso) {
  return new Date(iso).toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function History() {
  const { t } = useLang();
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
      <h1>{t("history.title")}</h1>

      {entries.length === 0 ? (
        <p>
          {t("history.empty")} <Link to="/checkin">{t("history.first")}</Link>
        </p>
      ) : (
        <>
          <p className="summary">
            {entries.length} {t("history.checkins")} &middot; {t("history.average")} {average} / 5
          </p>

          <ul className="history-list">
            {entries.map((entry) => (
              <li key={entry.id} className="history-item">
                <div className="history-top">
                  <span className="history-date">{formatDate(entry.createdAt)}</span>
                  <span className="history-mood">
                    {entry.mood} / 5 &middot; {t("mood." + entry.mood)}
                  </span>
                </div>

                {entry.tags.length > 0 && (
                  <div className="tag-row">
                    {entry.tags.map((tag) => (
                      <span key={tag} className="tag static">{t("tag." + tag)}</span>
                    ))}
                  </div>
                )}

                {entry.reflection && <p className="history-reflection">{entry.reflection}</p>}

                <button className="link-danger" onClick={() => handleDelete(entry.id)}>
                  {t("history.delete")}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
