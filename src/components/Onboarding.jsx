import { useState } from "react";
import { ONBOARDING } from "../data/onboarding";
import { useLang } from "../i18n/LanguageContext";

export default function Onboarding({ onDone }) {
  const { lang, setLang } = useLang();
  const [step, setStep] = useState(0);

  const content = ONBOARDING[lang];
  const last = content.steps.length - 1;
  const current = content.steps[step];

  return (
    <div className="onboarding">
      <div className="onboarding-card">
        <div className="onboarding-lang">
          <button
            className={lang === "en" ? "tag active" : "tag"}
            onClick={() => setLang("en")}
          >
            English
          </button>
          <button
            className={lang === "rw" ? "tag active" : "tag"}
            onClick={() => setLang("rw")}
          >
            Kinyarwanda
          </button>
        </div>

        <h1>{current.title}</h1>
        <p>{current.text}</p>

        <div className="dots">
          {content.steps.map((_, i) => (
            <span key={i} className={i === step ? "dot active" : "dot"} />
          ))}
        </div>

        <div className="onboarding-actions">
          {step > 0 ? (
            <button className="secondary" onClick={() => setStep(step - 1)}>
              {content.back}
            </button>
          ) : (
            <button className="secondary" onClick={onDone}>
              {content.skip}
            </button>
          )}
          {step < last ? (
            <button className="primary" onClick={() => setStep(step + 1)}>
              {content.next}
            </button>
          ) : (
            <button className="primary" onClick={onDone}>
              {content.start}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
