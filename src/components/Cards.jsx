import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/usercontext';
import Forma from '../assets/formation.png';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { auth, db } from '../firebase-config';

const Cards = () => {
  const [formations, setFormations] = useState([]);
  const { user } = useContext(UserContext); // Importer le contexte utilisateur
  const history = useHistory();

  useEffect(() => {
    const getFormations = async () => {
      const q = query(collection(db, 'formation'), limit()); // Limiter la récupération à trois formations
      const querySnapshot = await getDocs(q);
      const formationsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFormations(formationsData);
    };

    getFormations();
  }, []);

  const handlePop = () => {
    if (user) {
      history.push('/caca'); // Rediriger vers la page "Caca" si l'utilisateur est connecté
    } else {
      window.scrollTo(0, 0); // Faire défiler vers le haut de la page
      history.push('/login'); // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
    }
  };

  return (
    <div className='debut bg-white mx-auto grid md:grid-cols-3 gap-8 '>
      {formations.map((formation) => (
        <div className='w-full py-[10rem] px-4 bg-white' key={formation.id}>
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
            <img className='w-20 mx-auto mt-[-3rem] bg-white' src={Forma} alt='/' />
            <h2 className='text-2xl font-bold text-center py-8'>{formation.titre}</h2>
            <p className='text-center text-4xl font-bold'>{formation.duree} mois</p>
            <p className='text-center text-4xl'>{formation.lieu}</p>
            <div className='text-center font-medium'>
              <p className='py-2 border-b mx-8 mt-8'>{formation.description}</p>
            </div>
            <button
              className='bg-[#a0f3d9] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'
              onClick={() => handlePop()}
            >
              S'inscrire à la formation
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
