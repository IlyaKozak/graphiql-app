import Link from 'next/link';

import { useLocaleContext } from '../../context/locale.context';

function Welcome() {
  const [locale] = useLocaleContext();
  const {
    home: { h1 },
  } = locale;

  return (
    <>
      <h1>{h1}</h1>
      <Link href="/auth">SignIn / SignUp Page</Link>
    </>
  );
}

export default Welcome;
