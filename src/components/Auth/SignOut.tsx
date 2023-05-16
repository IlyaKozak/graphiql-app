import { useAuthContext } from '../../context/auth.context';
import { useLocaleContext } from '../../context/locale.context';

function SingOut() {
  const { authUser, isLoading, signOutUser } = useAuthContext();
  const [locale] = useLocaleContext();
  const {
    home: { signOut },
  } = locale;

  return (
    <>
      {!isLoading && authUser && (
        <button type="button" onClick={() => signOutUser && signOutUser()}>
          {signOut}
        </button>
      )}
    </>
  );
}

export default SingOut;
