import Link from 'next/link';

import { useLocaleContext } from '../../context/locale.context';
import { useAuthContext } from '../../context/auth.context';

function Welcome() {
  const { authUser, signOutUser } = useAuthContext();
  const [locale] = useLocaleContext();
  const {
    home: { h1, authLink, mainLink },
  } = locale;

  return (
    <>
      <h1>{h1}</h1>
      {authUser ? (
        <>
          <Link href="/graphiql">{mainLink}</Link>
          <button type="button" onClick={() => signOutUser()}>
            Sign Out
          </button>
        </>
      ) : (
        <Link href="/auth">{authLink}</Link>
      )}
    </>
  );
}

export default Welcome;
