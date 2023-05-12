import Link from 'next/link';

import { useAuthContext } from '../../context/auth.context';
import { useLocaleContext } from '../../context/locale.context';
import classes from './WelcomeHeader.module.css';
import Loader from '../LoaderMini/LoaderMini';

function WelcomeHeader() {
  const { authUser, isLoading } = useAuthContext();
  const [locale] = useLocaleContext();
  const {
    home: { signIn, signUp, graphiQL },
  } = locale;

  return (
    <div className={classes.welcomeHeader}>
      {isLoading && <Loader />}
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
