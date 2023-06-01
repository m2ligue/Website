import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/usercontext';
import { 
  createUserWithEmailAndPassword,
  onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";

const Register = () => {
  const [email, setEmail] = useState(''); // État pour stocker l'email
  const [password, setPassword] = useState(''); // État pour stocker le mot de passe
  const [confirmPassword, setConfirmPassword] = useState(''); // État pour stocker la confirmation du mot de passe
  const { register } = useContext(UserContext); // Importer la fonction de contexte utilisateur appropriée
  const history = useHistory(); // Utilitaire de l'historique de navigation

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // L'utilisateur est connecté
        // Effectuez les actions nécessaires, telles que la mise à jour du contexte utilisateur
        register(user); // Mise à jour du contexte utilisateur avec les données de l'utilisateur connecté
        history.push("/private/private-acceuil"); // Rediriger vers la page du tableau de bord ou une autre page protégée
      } else {
        // L'utilisateur n'est pas connecté
        // Effectuez les actions nécessaires, telles que la mise à jour du contexte utilisateur à null
        register(null); // Mise à jour du contexte utilisateur à null pour indiquer que personne n'est connecté
      }
    });

    // Retourne une fonction de nettoyage pour arrêter l'écoute de l'état d'authentification
    return () => unsubscribe();
  }, [register, history]); 

  const handleEmailChange = (event) => {
    setEmail(event.target.value); // Mettre à jour l'état de l'email lorsqu'il y a un changement dans l'entrée
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value); // Mettre à jour l'état du mot de passe lorsqu'il y a un changement dans l'entrée
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value); // Mettre à jour l'état de la confirmation du mot de passe lorsqu'il y a un changement dans l'entrée
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêcher le comportement par défaut du formulaire

    // Vérifier si les mots de passe correspondent
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    // Créer l'objet de données de l'utilisateur
    const userData = {
      email,
      password,
    };

    try {
      // Appeler la fonction d'inscription du contexte utilisateur pour envoyer les données au serveur
      await createUserWithEmailAndPassword(auth, email, password);
      await register(userData);
      

      // Réinitialiser les champs du formulaire
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      // Afficher un message de succès ou rediriger l'utilisateur vers une autre page
      alert('Inscription réussie !');
      history.push('/'); // Rediriger vers la page d'accueil après l'inscription

    } catch (error) {
      // Afficher une erreur en cas de problème lors de l'inscription
      console.error('Erreur lors de l\'inscription :', error);
      alert('Une erreur est survenue lors de l\'inscription. Veuillez réessayer plus tard.');
    }
  };

  const handleClose = () => {
    // Rediriger l'utilisateur vers une autre page lors de la fermeture du formulaire d'inscription
    history.push('/'); // Remplacez '/accueil' par le chemin de la page souhaitée
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-blue-400 to-green-200">
      <div className="bg-white w-full max-w-md rounded shadow-md">
        <div className="flex justify-between items-center bg-blue-500 px-4 py-2 rounded-t">
          <h5 className="text-white text-sm font-bold">Register</h5>
          <button className="text-white text-xl" onClick={() => handleClose()}>
            &times;
          </button>
        </div>
        <form className="px-8 pt-6 pb-8" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

/*

import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/usercontext';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register } = useContext(UserContext); // Assurez-vous d'importer la fonction correcte du contexte utilisateur
  const history = useHistory();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Vérifier si les mots de passe correspondent
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    // Créer l'objet de données de l'utilisateur
    const userData = {
      email,
      password,
    };

    try {
      // Appeler la fonction d'inscription du contexte utilisateur pour envoyer les données au serveur
      await register(userData);

      // Réinitialiser les champs du formulaire
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      // Afficher un message de succès ou rediriger l'utilisateur vers une autre page
      alert('Inscription réussie !');
      history.push('/accueil'); // Rediriger vers la page d'accueil après l'inscription

    } catch (error) {
      // Afficher une erreur en cas de problème lors de l'inscription
      console.error('Erreur lors de l\'inscription :', error);
      alert('Une erreur est survenue lors de l\'inscription. Veuillez réessayer plus tard.');
    }
  };

  const handleClose = () => {
    // Rediriger l'utilisateur vers une autre page lors de la fermeture du formulaire d'inscription
    history.push('/accueil'); // Remplacez '/accueil' par le chemin de la page souhaitée
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-blue-400 to-green-200">
      <div className="bg-white w-full max-w-md rounded shadow-md">
        <div className="flex justify-between items-center bg-blue-500 px-4 py-2 rounded-t">
          <h5 className="text-white text-sm font-bold">Register</h5>
          <button className="text-white text-xl" onClick={() => handleClose()}>
            &times;
          </button>
        </div>
        <form className="px-8 pt-6 pb-8" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
*/