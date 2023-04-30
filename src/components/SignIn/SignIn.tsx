import { ChangeEvent, FormEvent, useState } from 'react';

import { useAuthContext } from '../../context/auth.context';

const defaultFormFields = {
  email: '',
  password: '',
  confirmPassword: '',
};

function SignIn() {
  const { signInUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password, confirmPassword } = formFields;

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
      <h2>Sign In with your email and password:</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <form onSubmit={formSubmitHandler}>
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
        <button type="submit">Sign In</button>
      </form>
    </>
  );
}

export default SignIn;
