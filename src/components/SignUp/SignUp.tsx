import { ChangeEvent, FormEvent, useState } from 'react';

import { useAuthContext } from '../../context/auth.context';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function SignUp() {
  const { authUser, createUser, signInUser, signOutUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const formSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await signInUser(email, password);
      setLoading(false);
      setError(null);
      if (!response) return;
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
      <h2>Sign up with your email and password:</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {authUser && (
        <>
          <p>AuthUser: {authUser?.email}</p>
          <button type="button" onClick={() => signOutUser()}>
            Sign Out
          </button>
        </>
      )}
      <form onSubmit={formSubmitHandler}>
        <label htmlFor="displayName">
          Display Name:
          <input
            id="displayName"
            name="displayName"
            type="text"
            value={displayName}
            onChange={changeHandler}
          />
        </label>
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
          Password:
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={changeHandler}
            autoComplete="on"
          />
        </label>
        <label htmlFor="confirmPassword">
          Confirm Password:
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={changeHandler}
            autoComplete="on"
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignUp;
