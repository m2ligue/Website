// usercontext.js
import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { signOut } from 'firebase/auth';

import { auth } from '../firebase-config';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const history = useHistory();

  const register = (userData) => {
    setUser(userData);
  };

  const updateProfile = (updatedData) => {
    setUser((prevUser) => ({
      ...prevUser,
      address: updatedData.address,
      phone: updatedData.phone,
    }));
  };

  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      history.push('/private/private-acceuil');
      console.log('Connexion réussie pour l\'utilisateur:', userCredential.user.uid);
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      throw error;
    }
  };

  const logout = () => {
    try {
      signOut(auth)
        .then(() => {
          history.push('/acceuil');
        });
    } catch {
      alert("Pour quelque raison vous ne pouvez pas vous déconnecter, s'il vous plaît vérifier votre connexion internet et réessayer");
    }
  };

  const authContextValue = {
    user,
    register,
    logout,
    signIn,
    updateProfile, // Ajouter la fonction updateProfile au contexte
  };

  return (
    <UserContext.Provider value={authContextValue}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
