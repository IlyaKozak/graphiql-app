import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useAuthContext } from '../../context/auth.context';
import { useLocaleContext } from '../../context/locale.context';
import Loader from '../Loader/Loader';
import { validateEmail, validatePassword } from '../../utils/validation';
import classes from './Auth.module.css';

const defaultFormFields = {
  email: '',
  password: '',
  confirmPassword: '',
};

type ValidationFields = {
  isValidEmail: boolean;
  isValidPassword: boolean;
  isValidConfirmPassword: boolean;
};

const defaultValidationFields: ValidationFields = {
  isValidEmail: true,
  isValidPassword: true,
  isValidConfirmPassword: true,
};

function Auth() {
  const router = useRouter();
  const isSignUp = router.query.page === 'signup';
  const { createUser, signInUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);
  const [validationFields, setValidationFields] = useState(defaultValidationFields);
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
      notValidEmail,
      notValidPassword,
      notValidConfirmPassword,
    },
  } = locale;

  useEffect(() => {
    setFirebaseError(null);
    setValidationFields(defaultValidationFields);
  }, [isSignUp]);

  const formSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password);
    const isValidConfirmPassword = !isSignUp || password === confirmPassword;

    if (!isValidEmail || !isValidPassword || !isValidConfirmPassword) {
      setValidationFields({
        isValidEmail,
        isValidPassword,
        isValidConfirmPassword,
      });
      return;
    }

    setFirebaseError(null);
    setValidationFields(defaultValidationFields);
    setLoading(true);
    try {
      const response = await (isSignUp ? createUser(email, password) : signInUser(email, password));

      if (!response) return;

      resetFormFields();
    } catch (error) {
      if (error instanceof Error) {
        setFirebaseError(error.message);
      }
    }
    setLoading(false);
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

      <form onSubmit={formSubmitHandler} className={classes.authForm} noValidate>
        <label htmlFor="email">
          Email:
          {!validationFields.isValidEmail && <p className={classes.errorText}>{notValidEmail}</p>}
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
          {!validationFields.isValidPassword && (
            <p className={classes.errorText}>{notValidPassword}</p>
          )}
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
            {!validationFields.isValidConfirmPassword && (
              <p className={classes.errorText}>{notValidConfirmPassword}</p>
            )}
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
        {loading && (
          <div className={classes.alignCenter}>
            <Loader />
          </div>
        )}
        {firebaseError && <p className={classes.errorText}>{firebaseError}</p>}
        <button type="submit">{isSignUp ? <>{signUp}</> : <>{signIn}</>}</button>
      </form>
    </>
  );
}

export default Auth;
