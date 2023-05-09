import Link from 'next/link';

import { useLocaleContext } from '../../context/locale.context';
import classes from './Custom404.module.css';

export default function Custom404() {
  const [locale] = useLocaleContext();
  const {
    404: { h2, goHome },
  } = locale;

  return (
    <main className={classes.main}>
      <div className={classes.headers}>
        <h1 className={classes.errorCode}>404</h1>
        <h2 className={classes.errorMessage}>{h2}</h2>
      </div>
      <Link href="/">{goHome}</Link>
    </main>
  );
}
