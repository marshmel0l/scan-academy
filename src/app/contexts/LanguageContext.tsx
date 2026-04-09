// Language context — manages AR/EN toggle + RTL direction + font switching
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Lang } from '../i18n/translations';

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: <S extends keyof typeof translations['ar']>(section: S) => typeof translations['ar'][S];
  dir: 'rtl' | 'ltr';
  isAr: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'ar',
  setLang: () => {},
  t: (section) => translations['ar'][section] as any,
  dir: 'rtl',
  isAr: true,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ar');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('sa-lang') as Lang | null;
      if (saved === 'ar' || saved === 'en') setLangState(saved);
    } catch (_) {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem('sa-lang', l); } catch (_) {}
  };

  // t(section) returns the full translation object for a section
  const t = <S extends keyof typeof translations['ar']>(section: S) =>
    translations[lang][section] as typeof translations['ar'][S];

  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const isAr = lang === 'ar';

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir, isAr }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
