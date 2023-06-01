import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/usercontext';

const Login = () => {
  const [email, setEmail] = useState(''); // État pour stocker l'email
  const [password, setPassword] = useState(''); // État pour stocker le mot de passe
  const { signIn } = useContext(UserContext); // Importer la fonction de contexte utilisateur appropriée
  const history = useHistory(); // Utilitaire de l'historique de navigation

  const handleEmailChange = (event) => {
    setEmail(event.target.value); // Mettre à jour l'état de l'email lorsqu'il y a un changement dans l'entrée
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value); // Mettre à jour l'état du mot de passe lorsqu'il y a un changement dans l'entrée
  };

  const handleClose = () => {
    history.push('/'); // Rediriger l'utilisateur vers une autre page lors de la fermeture du formulaire de connexion
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêcher le comportement par défaut du formulaire

    try {
      // Appeler la fonction de connexion du contexte utilisateur pour envoyer les données au serveur
      await signIn(email, password);

      // Réinitialiser les champs du formulaire
      setEmail('');
      setPassword('');

      alert('Connexion réussie !');
      history.push('/private/private-acceuil'); // Rediriger vers la page du tableau de bord ou une autre page protégée

    } catch (error) {
      // Gérer les erreurs de connexion
      console.error('Erreur lors de la connexion :', error);
    }
  };

  const handleAdminLogin = () => {
    history.push('/admin-login'); // Rediriger l'utilisateur vers le formulaire de connexion de l'administrateur
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-blue-400 to-green-200">
      <div className="bg-white w-full max-w-md rounded shadow-md">
        <div className="flex justify-between items-center bg-blue-500 px-4 py-2 rounded-t">
          <h5 className="text-white text-sm font-bold">Login</h5>
          <button className="text-white text-xl" onClick={handleClose}>
            &times;
          </button>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit}>
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
            <div className="mb-6">
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
            <div className="flex items-center justify-between">
              <p className="text-gray-700 text-sm">
                En cliquant sur "Login", vous acceptez les conditions d'utilisation.
              </p>
              <div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Login
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
                  type="button"
                  onClick={handleAdminLogin}
                >
                  Se connecter en mode administrateur
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
