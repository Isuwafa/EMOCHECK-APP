import { Link } from "react-router-dom";
import { useLang } from "../i18n/LanguageContext";

export default function Home() {
  const { t } = useLang();
  const tipIndex = new Date().getDate() % 6;

  return (
    <section>
      <div className="card">
        <h1>{t("home.title")}</h1>
        <p>{t("home.text")}</p>
        <div className="home-actions">
          <Link to="/checkin" className="btn-link primary-link">
            {t("home.start")}
          </Link>
          <Link to="/support" className="btn-link outline-link">
            {t("home.find")}
          </Link>
        </div>
      </div>

      <div className="card tip-card">
        <h2>{t("home.tipTitle")}</h2>
        <p className="tip-text">{t("home.tip." + tipIndex)}</p>
      </div>

      <p className="remember">{t("home.remember")}</p>
    </section>
  );
}
