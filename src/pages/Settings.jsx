import { useState } from "react";
import { getCheckIns, getDeviceId, deleteAllData } from "../utils/storage";
import { useLang } from "../i18n/LanguageContext";

export default function Settings() {
  const { t } = useLang();
  const [count, setCount] = useState(getCheckIns().length);
  const [confirming, setConfirming] = useState(false);
  const [done, setDone] = useState(false);
  const [deviceId, setDeviceId] = useState(getDeviceId());

  function handleDelete() {
    deleteAllData();
    setCount(0);
    setConfirming(false);
    setDeviceId("");
    setDone(true);
  }

  return (
    <section className="card">
      <h1>{t("data.title")}</h1>
      <p>{t("data.intro")}</p>

      <div className="data-box">
        <p>
          <strong>{t("data.id")}:</strong>{" "}
          {deviceId ? deviceId.slice(0, 8) + "..." : t("data.none")}
        </p>
        <p>
          <strong>{t("data.count")}:</strong> {count}
        </p>
      </div>

      <h2>{t("data.deleteTitle")}</h2>
      <p>{t("data.deleteText")}</p>

      {!confirming ? (
        <button className="danger" onClick={() => setConfirming(true)}>
          {t("data.deleteBtn")}
        </button>
      ) : (
        <div className="confirm-box">
          <p>{t("data.confirm")}</p>
          <button className="danger" onClick={handleDelete}>
            {t("data.yes")}
          </button>
          <button className="secondary" onClick={() => setConfirming(false)}>
            {t("data.cancel")}
          </button>
        </div>
      )}

      {done && <p className="message">{t("data.done")}</p>}
    </section>
  );
}
