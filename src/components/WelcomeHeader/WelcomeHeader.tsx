import Link from 'next/link';

import { useAuthContext } from '../../context/auth.context';
import SwitchLocale from '../SwitchLocale/SwitchLocale';
import SingOut from '../SignOut/SignOut';
import classes from './WelcomeHeader.module.css';
import { useLocaleContext } from '../../context/locale.context';

function WelcomeHeader() {
  const { authUser } = useAuthContext();
  const [locale] = useLocaleContext();
  const {
    home: { signIn, signUp, graphiQL },
  } = locale;

  return (
    <div className={classes.welcomeHeader}>
      <SwitchLocale />
      {authUser ? (
        <>
          <Link href="/graphiql">{graphiQL}</Link>
          <SingOut />
        </>
      ) : (
        <>
          <Link href="/auth#signin">{signIn}</Link>
          <Link href="/auth#signup">{signUp}</Link>
        </>
      )}
    </div>
  );
}

export default WelcomeHeader;
