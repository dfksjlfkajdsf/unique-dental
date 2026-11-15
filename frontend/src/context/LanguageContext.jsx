import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Default to English ('en'), or read saved user preference from localStorage
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('unique_dental_lang') || 'en';
    } catch {
      return 'en';
    }
  });

  const toggle = () => {
    setLang((prev) => {
      const next = prev === 'en' ? 'np' : 'en';
      try {
        localStorage.setItem('unique_dental_lang', next);
      } catch {
        // Ignore localStorage error if blocked
      }
      return next;
    });
  };

  const setLanguage = (newLang) => {
    if (newLang === 'en' || newLang === 'np') {
      setLang(newLang);
      try {
        localStorage.setItem('unique_dental_lang', newLang);
      } catch {
        // Ignore localStorage error
      }
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, toggle, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
