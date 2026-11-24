import { createContext, useContext, useState } from "react";
import { translations } from "./translations";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("emocheck_lang") || "en";
    } catch {
      return "en";
    }
  });

  function changeLang(next) {
    setLang(next);
    try {
      localStorage.setItem("emocheck_lang", next);
    } catch {
      // ignore storage errors
    }
  }

  function t(key) {
    return translations[lang]?.[key] ?? translations.en[key] ?? key;
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
