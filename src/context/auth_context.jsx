import { PropTypes } from 'prop-types';
import { createContext, useContext } from 'react';

import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);

  const provider = new GoogleAuthProvider();

  const userSignIn = async () => {
    await signInWithPopup(auth, provider);
  };

  const userSignOut = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, userSignIn, userSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
