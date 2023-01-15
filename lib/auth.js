import { useState, useEffect, useContext, createContext } from 'react';
import Router from 'next/router';
import {
  GithubAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  getAdditionalUserInfo,
} from 'firebase/auth';
import { createUser } from './firestore';
import { auth } from './firebase';

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoURL: user.photoURL,
  };
};

const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const provider = new GithubAuthProvider();

  const handleUser = (rawUser, isNewUser) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      if (isNewUser) {
        createUser(user.uid, user);
      }
      setUser(user);
      return user;
    } else {
      setUser(false);
      return false;
    }
  };

  const signInWithGitHub = async (redirect) => {
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const { isNewUser } = getAdditionalUserInfo(result);
      handleUser(result.user, isNewUser);
      setLoading(false);

      if (redirect) {
        Router.push(redirect);
      }
    } catch (error) {
      console.log(error);
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // // The email of the user's account used.
      // const email = error.customData.email;
      // // The AuthCredential type that was used.
      // const credential = GithubAuthProvider.credentialFromError(error);
      // ...
    }
  };

  const signout = () => {
    Router.push('/');

    return signOut(auth)
      .then(() => {
        setUser(false);
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    signInWithGitHub,
    signout,
  };
};
