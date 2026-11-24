import { useState } from "react";
import { saveCheckIn } from "../utils/storage";
import Recommendations from "../components/Recommendations";

const MOODS = [
  { value: 1, label: "Very low" },
  { value: 2, label: "Low" },
  { value: 3, label: "Okay" },
  { value: 4, label: "Good" },
  { value: 5, label: "Great" },
];

const TAGS = [
  "Happy", "Calm", "Hopeful", "Grateful",
  "Anxious", "Sad", "Angry", "Stressed",
  "Lonely", "Tired", "Overwhelmed", "Confused",
];

const PROMPTS = [
  "What is one thing that affected your mood today?",
  "What is one small thing you can do to take care of yourself today?",
  "Who is someone you can talk to when things feel heavy?",
  "What is one thing you are proud of this week?",
];

export default function CheckIn() {
  const [mood, setMood] = useState(null);
  const [tags, setTags] = useState([]);
  const [reflection, setReflection] = useState("");
  const [message, setMessage] = useState("");
  const [justSaved, setJustSaved] = useState(false);
  const prompt = PROMPTS[new Date().getDate() % PROMPTS.length];

  function toggleTag(tag) {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  function handleSave() {
    if (mood === null) {
      setMessage("Please choose how you feel before saving.");
      return;
    }
    saveCheckIn({ mood, tags, reflection: reflection.trim() });
    setMood(null);
    setTags([]);
    setReflection("");
    setMessage("Check-in saved. Thank you for checking in today.");
    setJustSaved(true);
  }

  return (
    <section className="card">
      <h1>Daily Check-In</h1>

      <h2>How are you feeling?</h2>
      <div className="mood-row">
        {MOODS.map((m) => (
          <button
            key={m.value}
            className={mood === m.value ? "mood active" : "mood"}
            onClick={() => setMood(m.value)}
          >
            <strong>{m.value}</strong>
            <span>{m.label}</span>
          </button>
        ))}
      </div>

      <h2>What describes it best?</h2>
      <div className="tag-row">
        {TAGS.map((t) => (
          <button
            key={t}
            className={tags.includes(t) ? "tag active" : "tag"}
            onClick={() => toggleTag(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <h2>Reflection</h2>
      <p className="prompt">{prompt}</p>
      <textarea
        rows="4"
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
        placeholder="Write here (optional)"
      />

      <button className="primary" onClick={handleSave}>
        Save check-in
      </button>
      {message && <p className="message">{message}</p>}
      {justSaved && <Recommendations />}
    </section>
  );
}
