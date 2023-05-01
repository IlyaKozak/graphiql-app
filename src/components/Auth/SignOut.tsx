import { useAuthContext } from '../../context/auth.context';
import { useLocaleContext } from '../../context/locale.context';

function SingOut() {
  const { signOutUser } = useAuthContext();
  const [locale] = useLocaleContext();
  const {
    home: { signOut },
  } = locale;

  return (
    <button type="button" onClick={() => signOutUser()}>
      {signOut}
    </button>
  );
}

export default SingOut;
