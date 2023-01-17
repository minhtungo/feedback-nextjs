// @ts-nocheck

import { useState, useEffect, useContext, createContext } from 'react';
import { useRouter } from 'next/router';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  getAdditionalUserInfo,
} from 'firebase/auth';
import { createUser } from './firestore';
import { auth } from './firebase';
import Cookies from 'js-cookie';

const AuthContext = createContext({
  user: null,
  loading: false,
  signInWithGitHub: () => {},
  signInWithGoogle: () => {},
  signOutUser: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

const formatUser = (user: User) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoURL: user.photoURL,
    token: user.accessToken,
  };
};

export function AuthProvider({ children }: AuthProviderProps) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleUser = (rawUser, isNewUser = false) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      const { token, ...userWithoutToken } = user;
      if (isNewUser) {
        createUser(user.uid, userWithoutToken);
      }
      setUser(user);
      Cookies.set('authed', true, { expires: 3 });
      return user;
    } else {
      router.push('/');
      setUser(null);
      Cookies.remove('authed');
      return null;
    }
  };

  const signInWithGitHub = async () => {
    router.push('/dashboard');

    try {
      const result = await signInWithPopup(auth, new GithubAuthProvider());
      const { isNewUser } = getAdditionalUserInfo(result);
      handleUser(result.user, isNewUser);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithGoogle = async () => {
    router.push('/dashboard');
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const { isNewUser } = getAdditionalUserInfo(result);
      handleUser(result.user, isNewUser);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const signOutUser = async () => {
    await signOut(auth);
    handleUser(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        handleUser(user);
        setLoading(false);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    signInWithGitHub,
    signInWithGoogle,
    signOutUser,
  };
};
