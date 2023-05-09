import { LocaleDictionary } from '../types/localeDictionary';
import { firebaseErrorsEn } from './firebaseErrorsEn';

const en: LocaleDictionary = {
  lang: 'en',
  home: {
    title: 'GraphiQL Clone - NextFireTeam',
    h1: 'Welcome to GraphiQL Clone!',
    authLink: 'Please Authorize',
    mainLink: 'Go To GraphiQL Playground',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signOut: 'Sign Out',
    graphiQL: 'Go To GraphiQL',
  },
  main: {
    title: 'GraphiQL Clone - Main Page',
    endpointButton: 'Change endpoint',
    endpointText: 'Endpoint:',
    variablesPlaceholder: 'Variables',
    variablesLable: 'VARIABLES',
    headersPlaceholder: 'Headers',
    headersLable: 'HEADERS',
    docsLable: 'DOCS',
    queryPlaceholder: 'Query',
  },
  auth: {
    title: 'GraphiQL Clone - Auth Page',
    h1: 'Authorization Page',
    passwordText: 'Password',
    confirmPasswordText: 'Confirm Password',
    signUpText: 'Sign Up with your email and password',
    signInText: 'Sign In with your email and password',
    isRegistered: 'Already registered? ',
    isNotRegistered: 'Not registered? ',
    goToSignIn: 'Go To SignIn',
    goToSignUp: 'Go To SignUp',
    notValidEmail: 'Not valid Email',
    notValidPassword:
      'Not valid Password. It should be minimum 8 symbols, at least one letter, one digit, one special character',
    notValidConfirmPassword: 'Not valid Confirm Password. It should be equal to Password',
  },
  404: {
    title: 'GraphiQL Clone - Not Found - 404',
    h2: 'This page could not be found',
    goHome: 'Go Home',
  },
  firebaseErrors: firebaseErrorsEn,
};

export default en;
