import React, { useContext } from 'react';
import Typed from 'react-typed';
import { UserContext } from '../usercontext';
import { useHistory } from 'react-router-dom';
import Cards from '../../components/Cards';
const Hero = () => {
  const { user } = useContext(UserContext); // Accéder au contexte utilisateur

  const history = useHistory();
 
  const handleMove = () => {
      window.scrollTo(0, 1300); // Faire défiler vers le haut de la page
      history.push(<Cards></Cards>); // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
    }

  return (
    <div className="bg-gradient-to-b from-blue-400 to-green-200 h-screen">
      <div className="text-white font-bold">
        <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
          <p className="text-[#a0f3d9] font-bold p-2">MAISON DES LIGUES</p>
          <h1 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-6">M2L</h1>
          <div className="flex justify-center items-center">
            <p className="font-bold py-4">
              {user ?  'TROUVER VOS FORMATION EN UN':'TROUVER VOS FORMATION EN UN' }
            </p>
            <Typed
              className="md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2"
              strings={['Click', 'COUP']}
              typeSpeed={120}
              backSpeed={140}
              loop
            />
          </div>
          <button className="bg-[#a0f3d9] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black"onClick={() => handleMove()}>
            Accéder au Formation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
