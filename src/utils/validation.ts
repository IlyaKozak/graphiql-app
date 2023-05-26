const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const validateEmail = (email: string) => {
  return EMAIL_REGEX.test(email);
};

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/i;

export const validatePassword = (password: string) => {
  return PASSWORD_REGEX.test(password);
};
