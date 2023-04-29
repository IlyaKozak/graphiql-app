import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

import { firebaseAuth } from '../utils/firebase';
import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

interface IAuthUser {
  uid: string;
  email: string | null;
}

interface IAuthContext {
  authUser: IAuthUser | null;
  createUser: (email: string, password: string) => Promise<UserCredential>;
  signInUser: (email: string, password: string) => Promise<UserCredential>;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext>({
  authUser: null,
  createUser: () => new Promise(() => {}),
  signInUser: () => new Promise(() => {}),
  signOutUser: () => new Promise(() => {}),
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [authUser, setAuthUser] = useState<IAuthUser | null>(firebaseAuth.currentUser);

  const authStateChangedHanlder = (user: User | null) => {
    if (user) {
      setAuthUser({
        uid: user.uid,
        email: user.email,
      });
    } else {
      setAuthUser(null);
    }
  };

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(authStateChangedHanlder);
    return unsubscribe;
  }, []);

  const authContextValue = {
    authUser,
    createUser: createUserWithEmailAndPassword.bind(null, firebaseAuth),
    signInUser: signInWithEmailAndPassword.bind(null, firebaseAuth),
    signOutUser: signOut.bind(null, firebaseAuth),
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
