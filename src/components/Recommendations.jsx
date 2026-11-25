import { getRecommendations } from "../utils/recommend";
import { useLang } from "../i18n/LanguageContext";

export default function Recommendations() {
  const { t } = useLang();
  const { level, resources } = getRecommendations();
  if (level === "none") return null;

  const distress = level === "distress";

  return (
    <div className={distress ? "reco distress" : "reco"}>
      <h2>{distress ? t("reco.distressTitle") : t("reco.title")}</h2>
      <p>{distress ? t("reco.distressText") : t("reco.text")}</p>
      <ul>
        {resources.map((r) => (
          <li key={r.id}>
            <strong>{r.name}</strong>
            {r.phone && (
              <> &middot; <a href={"tel:" + r.phone}>{t("support.call")} {r.phone}</a></>
            )}
            <br />
            <span className="resource-meta">{r.location}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
