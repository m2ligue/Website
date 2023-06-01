import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/usercontext';

const AdminLogin = () => {
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
      // Vérifier si l'email et le mot de passe sont valides pour l'administrateur
      if (email.includes('@admin')) {
        // Appeler la fonction de connexion du contexte utilisateur pour envoyer les données au serveur
        await signIn(email, password);
        

        // Réinitialiser les champs du formulaire
        setEmail('');
        setPassword('');

        alert('Connexion réussie en tant qu\'administrateur !');
        history.push('/'); // Rediriger vers la page de l'administrateur ou une autre page protégée pour les administrateurs

      } else {
        alert('Erreur de connexion administrateur : Vérifiez votre email et votre mot de passe.');
      }

    } catch (error) {
      // Gérer les erreurs de connexion
      console.error('Erreur lors de la connexion :', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-blue-400 to-green-200">
      <div className="bg-white w-full max-w-md rounded shadow-md">
        <div className="flex justify-between items-center bg-blue-500 px-4 py-2 rounded-t">
          <h5 className="text-white text-sm font-bold">Admin Login</h5>
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
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
