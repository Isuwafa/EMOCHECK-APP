import { useLang } from "../i18n/LanguageContext";

export default function Home() {
  const { t } = useLang();
  return (
    <section>
      <h1>{t("home.title")}</h1>
      <p>{t("home.text")}</p>
    </section>
  );
}
