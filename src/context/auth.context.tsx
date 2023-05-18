import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import {
  Auth,
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import firebaseApp from '@/utils/firebase';
import { regexToExtractFirebaseError } from '@/constants/firebaseRegex';

interface IAuthUser {
  uid: string;
  email: string | null;
}

interface IAuthContext {
  authUser: IAuthUser | null;
  isLoading: boolean;
  authErrorMessage: string | null;
  createUser: null | ((email: string, password: string) => Promise<UserCredential>);
  signInUser: null | ((email: string, password: string) => Promise<UserCredential>);
  signOutUser: null | (() => Promise<void>);
}

const AuthContext = createContext<IAuthContext>({
  authUser: null,
  isLoading: true,
  authErrorMessage: null,
  createUser: null,
  signInUser: null,
  signOutUser: null,
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [firebaseAuth, setFirebaseAuth] = useState<Auth | null>(null);
  const [authUser, setAuthUser] = useState<IAuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authErrorMessage, setErrorMessage] = useState<string | null>(null);

  const authStateChangedHandler = (user: User | null) => {
    if (user) {
      setAuthUser({
        uid: user.uid,
        email: user.email,
      });
    } else {
      setAuthUser(null);
    }
    setIsLoading(false);
  };

  const authContextValue = {
    authUser,
    isLoading,
    authErrorMessage,
    createUser: firebaseAuth ? createUserWithEmailAndPassword.bind(null, firebaseAuth) : null,
    signInUser: firebaseAuth ? signInWithEmailAndPassword.bind(null, firebaseAuth) : null,
    signOutUser: firebaseAuth ? signOut.bind(null, firebaseAuth) : null,
  };

  useEffect(() => {
    try {
      const firebaseAuth = getAuth(firebaseApp);
      setFirebaseAuth(firebaseAuth);
      setAuthUser(firebaseAuth?.currentUser);
      const unsubscribe = firebaseAuth.onAuthStateChanged(authStateChangedHandler);
      return unsubscribe;
    } catch (error: unknown) {
      const firebaseError = ((error as Error).message.match(regexToExtractFirebaseError) || [])[0];
      setErrorMessage(firebaseError || (error as Error).message);
    }
  }, []);

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
