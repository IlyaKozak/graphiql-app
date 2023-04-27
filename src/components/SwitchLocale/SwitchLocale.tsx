import { useLocaleContext } from '../../context/locale.context';

function SwitchLocale() {
  const [locale, switchLocale] = useLocaleContext();
  const { lang } = locale;

  return (
    <div>
      <button onClick={() => switchLocale()}>{lang}</button>
    </div>
  );
}

export default SwitchLocale;
