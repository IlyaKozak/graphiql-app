import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useAuthContext } from '@/context/auth.context';
import { useLocaleContext } from '@/context/locale.context';
import Loader from '@/components/Loader/Loader';
import { validateEmail, validatePassword } from '@/utils/validation';
import { regexToExtractFirebaseError } from '@/constants/firebaseRegex';
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
    firebaseErrors,
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
      if (!createUser || !signInUser) return;
      const response = await (isSignUp ? createUser(email, password) : signInUser(email, password));

      if (!response) return;

      resetFormFields();
    } catch (error) {
      if (error instanceof Error) {
        const firebaseError = (error.message.match(regexToExtractFirebaseError) || [])[0];
        setFirebaseError(firebaseError || null);
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
      <div className={classes.wrapper}>
        <h3 className={classes.authFormTitle}>{isSignUp ? signUpText : signInText}:</h3>

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
          {firebaseError && (
            <p className={classes.errorText}>{firebaseErrors[firebaseError] || firebaseError}</p>
          )}
          <button type="submit" className={classes.button} disabled={loading}>
            {loading ? (
              <span className={classes.alignCenter}>
                <Loader />
              </span>
            ) : isSignUp ? (
              <>{signUp}</>
            ) : (
              <>{signIn}</>
            )}
          </button>
        </form>

        {isSignUp ? (
          <>
            <div className={classes.links}>
              {isRegistered}
              <Link href="/auth?page=signin">{goToSignIn}</Link>
            </div>
          </>
        ) : (
          <>
            <div className={classes.links}>
              {isNotRegistered}
              <Link href="/auth?page=signup">{goToSignUp}</Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Auth;
