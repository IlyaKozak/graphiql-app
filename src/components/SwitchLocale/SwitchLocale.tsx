import { useLocaleContext } from '../../context/locale.context';

function SwitchLocale() {
  const [locale, switchLocale] = useLocaleContext();
  const { lang } = locale;

  return <button onClick={() => switchLocale()}>{lang}</button>;
}

export default SwitchLocale;
