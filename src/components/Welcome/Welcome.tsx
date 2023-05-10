import Link from 'next/link';
import classes from './Welcome.module.css';

import { useLocaleContext } from '../../context/locale.context';
import { useAuthContext } from '../../context/auth.context';
import WelcomeLogo from './WelcomeLogo';

function Welcome() {
  const { authUser, isLoading } = useAuthContext();
  const [locale] = useLocaleContext();
  const {
    home: { h1, authLink, mainLink },
  } = locale;

  return (
    <>
      <div className={classes.wrapper}>
        <h1>{h1}</h1>
        <WelcomeLogo />
        {!isLoading &&
          (authUser ? (
            <>
              <Link href="/graphiql">{mainLink}</Link>
            </>
          ) : (
            <Link href="/auth">{authLink}</Link>
          ))}
      </div>
    </>
  );
}

export default Welcome;
