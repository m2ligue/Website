import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { collection, addDoc, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../firebase-config';
import { UserContext } from '../context/usercontext';

const Caca = () => {
  const { user, setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    location: '',
    selectedFormation: '',
  });

  const [formations, setFormations] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const q = query(collection(db, 'formation'), limit(3));
        const querySnapshot = await getDocs(q);
        const formationsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFormations(formationsData);
      } catch (error) {
        console.error('Erreur lors de la récupération des formations :', error);
      }
    };

    fetchFormations();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Formulaire soumis :', formData);

    // Vérifier si l'adresse e-mail correspond à l'utilisateur connecté
    if (user.email !== formData.email) {
      alert('L\'adresse e-mail doit être la même que celle utilisée pour la connexion.');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'inscriptions'), {
        formData,
      });
      console.log('Document inscriptions ajouté avec l\'ID :', docRef.id);

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        location: '',
        selectedFormation: '',
      });
      alert('Inscription réussie !');
      history.push('/');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des données d\'inscription :', error);
    }
  };
  return (
    <div className='flex justify-center items-center h-screen bg-white'>
      <div className='max-w-md bg-gray-100 p-8'>
        <h2 className='text-2xl font-bold mb-4'>Formulaire d'inscription</h2>
        <form onSubmit={handleSubmit} className='px-4'>
          <div className='mb-4'>
            <label htmlFor='firstName' className='block mb-2 text-sm font-medium text-gray-700'>
              Prénom:
            </label>
            <input
              type='text'
              id='firstName'
              name='firstName'
              value={formData.firstName}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='lastName' className='block mb-2 text-sm font-medium text-gray-700'>
              Nom:
            </label>
            <input
              type='text'
              id='lastName'
              name='lastName'
              value={formData.lastName}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-700'>
              Email:
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='phoneNumber' className='block mb-2 text-sm font-medium text-gray-700'>
              Numéro de téléphone:
            </label>
            <input
              type='text'
              id='phoneNumber'
              name='phoneNumber'
              value={formData.phoneNumber}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='location' className='block mb-2 text-sm font-medium text-gray-700'>
              Lieu de résidence:
            </label>
            <input
              type='text'
              id='location'
              name='location'
              value={formData.location}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='selectedFormation' className='block mb-2 text-sm font-medium text-gray-700'>
              Formation souhaitée:
            </label>
            <select
              id='selectedFormation'
              name='selectedFormation'
              value={formData.selectedFormation}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300'
            >
              <option value=''>Sélectionnez une formation</option>
              {formations.map((formation) => (
                <option key={formation.id} value={formation.id}>
                  {formation.id} - {formation.titre}
                </option>
              ))}
            </select>
          </div>

          <button type='submit' className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'>
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default Caca;
