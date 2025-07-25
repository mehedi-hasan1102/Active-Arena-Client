import React, { createContext, useEffect, useState, useContext } from 'react';
import app from '../firebase/firebase.config';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import axios from '../../api/axiosInstance.js';

export const AuthContext = createContext();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Firebase user
  const [loading, setLoading] = useState(true);

  // Firebase Auth functions
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const createUserWithLoginGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth).then(() => {
      axios.post('/logout').finally(() => {
        setLoading(false);
      });
    });
  };

  const profile = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const setJwtCookie = async () => {
          try {
            await axios.post('/jwt', { email: currentUser.email });
          } catch (error) {
            console.error("Error setting JWT cookie:", error);
          }
        };
        setJwtCookie();
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authData = {
    user,
    setUser,
    createUser,
    loginUser,
    logout,
    profile,
    loading,
    setLoading,
    createUserWithLoginGoogle,
  };

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
