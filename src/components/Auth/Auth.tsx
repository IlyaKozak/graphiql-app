import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/router';

import { useAuthContext } from '../../context/auth.context';
import { useLocaleContext } from '../../context/locale.context';
import classes from './Auth.module.css';
import Link from 'next/link';

const defaultFormFields = {
  email: '',
  password: '',
  confirmPassword: '',
};

function Auth() {
  const router = useRouter();
  const isSignUp = router.query.page === 'signup';
  const { createUser, signInUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password, confirmPassword } = formFields;
  const [locale] = useLocaleContext();
  const {
    home: { signIn, signUp },
    auth: {
      passwordText,
      confirmPasswordText,
      signUpText,
      signInText,
      goToSignUp,
      goToSignIn,
      isRegistered,
      isNotRegistered,
    },
  } = locale;

  const formSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError(null);

      const response = await (isSignUp ? createUser(email, password) : signInUser(email, password));
      setLoading(false);

      if (!response) return;
      router.push('/graphiql');
      resetFormFields();
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields((prevFormFields) => ({
      ...prevFormFields,
      [name]: value,
    }));
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  return (
    <>
      <h2>{isSignUp ? signUpText : signInText}:</h2>
      {isSignUp ? (
        <>
          {isRegistered}
          <Link href="/auth?page=signin">{goToSignIn}</Link>
        </>
      ) : (
        <>
          {isNotRegistered}
          <Link href="/auth?page=signup">{goToSignUp}</Link>
        </>
      )}
      {loading && <p>Loading...</p>}
      {error && <p className={classes.errorText}>{error}</p>}

      <form onSubmit={formSubmitHandler} className={classes.authForm}>
        <label htmlFor="email">
          Email:
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={changeHandler}
            autoComplete="on"
          />
        </label>
        <label htmlFor="password">
          {passwordText}:
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={changeHandler}
            autoComplete="on"
          />
        </label>
        {isSignUp && (
          <label htmlFor="confirmPassword">
            {confirmPasswordText}:
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={changeHandler}
              autoComplete="on"
            />
          </label>
        )}
        <button type="submit">{isSignUp ? <>{signUp}</> : <>{signIn}</>}</button>
      </form>
    </>
  );
}

export default Auth;
