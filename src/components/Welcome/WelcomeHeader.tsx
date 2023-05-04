import Link from 'next/link';

import { useAuthContext } from '../../context/auth.context';
import { useLocaleContext } from '../../context/locale.context';
import classes from './WelcomeHeader.module.css';

function WelcomeHeader() {
  const { authUser, isLoading } = useAuthContext();
  const [locale] = useLocaleContext();
  const {
    home: { signIn, signUp, graphiQL },
  } = locale;

  return (
    <div className={classes.welcomeHeader}>
      {!isLoading &&
        (authUser ? (
          <>
            <Link href="/graphiql">{graphiQL}</Link>
          </>
        ) : (
          <>
            <Link href="/auth?page=signin">{signIn}</Link>
            <Link href="/auth?page=signup">{signUp}</Link>
          </>
        ))}
    </div>
  );
}

export default WelcomeHeader;
