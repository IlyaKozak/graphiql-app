import { useRouter } from 'next/router';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

import en from '@/locales/en';
import ru from '@/locales/ru';
import { LocaleDictionary } from '@/types/localeDictionary';

type ILocaleContext = [LocaleDictionary, () => void];

const LocaleContext = createContext<ILocaleContext>([en, () => {}]);

export const LocaleProvider = ({ children }: PropsWithChildren) => {
  const { locale: defaultLocale } = useRouter();
  const [locale, setLocale] = useState(defaultLocale === 'ru' ? ru : en);

  const switchLocale = () => {
    setLocale((prevLocale) => (prevLocale.lang === 'ru' ? en : ru));
  };

  return <LocaleContext.Provider value={[locale, switchLocale]}>{children}</LocaleContext.Provider>;
};

export const useLocaleContext = () => {
  return useContext(LocaleContext);
};
