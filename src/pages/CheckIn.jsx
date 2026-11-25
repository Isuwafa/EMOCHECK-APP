import { useState } from "react";
import { saveCheckIn } from "../utils/storage";
import Recommendations from "../components/Recommendations";
import { useLang } from "../i18n/LanguageContext";

const MOODS = [1, 2, 3, 4, 5];

const TAGS = [
  "Happy", "Calm", "Hopeful", "Grateful",
  "Anxious", "Sad", "Angry", "Stressed",
  "Lonely", "Tired", "Overwhelmed", "Confused",
];

export default function CheckIn() {
  const { t } = useLang();
  const [mood, setMood] = useState(null);
  const [tags, setTags] = useState([]);
  const [reflection, setReflection] = useState("");
  const [message, setMessage] = useState("");
  const [justSaved, setJustSaved] = useState(false);
  const promptIndex = new Date().getDate() % 4;

  function toggleTag(tag) {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((x) => x !== tag) : [...prev, tag]
    );
  }

  function handleSave() {
    if (mood === null) {
      setMessage("checkin.needMood");
      return;
    }
    saveCheckIn({ mood, tags, reflection: reflection.trim() });
    setMood(null);
    setTags([]);
    setReflection("");
    setMessage("checkin.saved");
    setJustSaved(true);
  }

  return (
    <section className="card">
      <h1>{t("checkin.title")}</h1>

      <h2>{t("checkin.feeling")}</h2>
      <div className="mood-row">
        {MOODS.map((m) => (
          <button
            key={m}
            className={mood === m ? "mood active" : "mood"}
            onClick={() => setMood(m)}
          >
            <strong>{m}</strong>
            <span>{t("mood." + m)}</span>
          </button>
        ))}
      </div>

      <h2>{t("checkin.describe")}</h2>
      <div className="tag-row">
        {TAGS.map((tag) => (
          <button
            key={tag}
            className={tags.includes(tag) ? "tag active" : "tag"}
            onClick={() => toggleTag(tag)}
          >
            {t("tag." + tag)}
          </button>
        ))}
      </div>

      <h2>{t("checkin.reflection")}</h2>
      <p className="prompt">{t("prompt." + promptIndex)}</p>
      <textarea
        rows="4"
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
        placeholder={t("checkin.placeholder")}
      />

      <button className="primary" onClick={handleSave}>
        {t("checkin.save")}
      </button>
      {message && <p className="message">{t(message)}</p>}
      {justSaved && <Recommendations />}
    </section>
  );
}
