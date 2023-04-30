import Link from 'next/link';

import { useLocaleContext } from '../../context/locale.context';
import { useAuthContext } from '../../context/auth.context';

function Welcome() {
  const { authUser, isLoading } = useAuthContext();
  const [locale] = useLocaleContext();
  const {
    home: { h1, authLink, mainLink },
  } = locale;

  return (
    <>
      <h1>{h1}</h1>
      {!isLoading &&
        (authUser ? (
          <>
            <Link href="/graphiql">{mainLink}</Link>
          </>
        ) : (
          <Link href="/auth">{authLink}</Link>
        ))}
    </>
  );
}

export default Welcome;
