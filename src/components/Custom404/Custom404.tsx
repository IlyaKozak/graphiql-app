import { useLocaleContext } from '../../context/locale.context';
import classes from './Custom404.module.css';
import { WELCOME_LINK } from '@/constants/links';
import ButtonWithLink from '../ButtonWithLink/ButtonWithLink';
import { PADDING_BUTTON_LEFT_RIGHT_404, PADDING_BUTTON_TOP_BOT_404 } from '@/constants/dimensions';

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
      <ButtonWithLink
        itemLink={WELCOME_LINK}
        itemText={goHome}
        paddingTopBottom={PADDING_BUTTON_TOP_BOT_404}
        paddingLeftRight={PADDING_BUTTON_LEFT_RIGHT_404}
      />
    </main>
  );
}
