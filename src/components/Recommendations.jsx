import { getRecommendations } from "../utils/recommend";

export default function Recommendations() {
  const { level, resources } = getRecommendations();
  if (level === "none") return null;

  const distress = level === "distress";

  return (
    <div className={distress ? "reco distress" : "reco"}>
      <h2>{distress ? "Support we recommend right now" : "Recommended for you"}</h2>
      <p>
        {distress
          ? "Your recent check-ins suggest things have been hard. You deserve support. Please reach out to one of these:"
          : "Based on your latest check-in, these may help:"}
      </p>
      <ul>
        {resources.map((r) => (
          <li key={r.id}>
            <strong>{r.name}</strong>
            {r.phone && <> &middot; <a href={"tel:" + r.phone}>Call {r.phone}</a></>}
            <br />
            <span className="resource-meta">{r.location}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
