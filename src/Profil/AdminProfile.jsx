import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/usercontext';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';

import { db } from '../firebase-config';

const AdminProfile = () => {
  const { user } = useContext(UserContext);
  const [formations, setFormations] = useState([]);
  const [newFormation, setNewFormation] = useState({
    titre: '',
    date: '',
    description: '',
    duree: '',
    id: '',
    lieu: '',
    nombre_place: '',
    prix: '',
    qualification: '',
    responsabilite: '',
  });

  useEffect(() => {
    const fetchFormations = async () => {
      const formationsCollection = collection(db, 'formation');
      const formationsSnapshot = await getDocs(formationsCollection);
      const formationsData = formationsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setFormations(formationsData);
    };

    fetchFormations();
  }, []);
  const selectFormation = (formation) => {
    setSelectedFormation(formation);
    setNewFormation(formation);
  };
  
  const handleInputChange = (event) => {
    if (selectedFormation) {
      setSelectedFormation((prevFormation) => ({
        ...prevFormation,
        [event.target.name]: event.target.value,
      }));
    } else {
      setNewFormation((prevFormation) => ({
        ...prevFormation,
        [event.target.name]: event.target.value,
      }));
    }
  };
  const [selectedFormation, setSelectedFormation] = useState(null);


  const addFormation = async () => {
    try {
      let formationRef;
      if (selectedFormation) {
        await updateDoc(doc(db, 'formation', selectedFormation.id), selectedFormation);
        formationRef = selectedFormation.id;
        setFormations((prevFormations) =>
          prevFormations.map((formation) => {
            if (formation.id === selectedFormation.id) {
              return { id: selectedFormation.id, ...selectedFormation };
            }
            return formation;
          })
        );
        console.log('Formation mise à jour avec succès');
      } else {
        formationRef = await addDoc(collection(db, 'formation'), newFormation);
        setFormations((prevFormations) => [
          ...prevFormations,
          { id: formationRef.id, ...newFormation },
        ]);
        console.log('Formation ajoutée avec succès');
      }
      setSelectedFormation(null);
      setNewFormation({
        titre: '',
        date: '',
        description: '',
        duree: '',
        id: '',
        lieu: '',
        nombre_place: '',
        prix: '',
        qualification: '',
        responsabilite: '',
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout ou de la mise à jour de la formation :', error);
    }
  };
  
  const deleteFormation = async (formationId) => {
    try {
      if (selectedFormation && selectedFormation.id === formationId) {
        setSelectedFormation(null);
      }
      await deleteDoc(doc(db, 'formation', formationId));
      setFormations((prevFormations) => prevFormations.filter((formation) => formation.id !== formationId));
      console.log('Formation supprimée avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression de la formation :', error);
    }
  };
  

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white shadow p-8">
          <h2 className="text-3xl font-bold mb-4">Profil de l'administrateur</h2>
          {user && (
            
            <div className="flex items-center mb-6">
              <img className="w-12 h-12 rounded-full mr-4" src={user.profileImage} alt="Profile" />
              <div>
                <p className="text-lg font-bold">{user.name}</p>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
          )}
          <div>
            <h3 className="text-xl font-bold mb-2">Formations existantes</h3>
            <ul className="list-disc pl-6">
              {formations.map((formation) => (
                <li key={formation.id}>
                  {formation.titre} (Titre: {formation.titre})
                  <button
                    className="text-red-500 ml-2"
                    onClick={() => deleteFormation(formation.id)}
                  >
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
  <h3 className="text-xl font-bold mb-2">
    {selectedFormation ? 'Modifier une formation' : 'Ajouter une formation'}
  </h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label htmlFor="titre" className="block font-medium mb-2">
                  Titre
                </label>
                <input
                  type="text"
                  id="titre"
                  name="titre"
                  value={newFormation.titre}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded py-2 px-3"
                />
              </div>
              <div className="mb-4">
  <label htmlFor="date" className="block font-medium mb-2">
    Date
  </label>
  <input
    type="text"
    id="date"
    name="date"
    value={newFormation.date}
    onChange={handleInputChange}
    className="w-full border border-gray-300 rounded py-2 px-3"
  />
</div>
<div className="mb-4">
  <label htmlFor="description" className="block font-medium mb-2">
    Description
  </label>
  <input
    type="text"
    id="description"
    name="description"
    value={newFormation.description}
    onChange={handleInputChange}
    className="w-full border border-gray-300 rounded py-2 px-3"
  />
</div>
<div className="mb-4">
  <label htmlFor="duree" className="block font-medium mb-2">
    Durée
  </label>
  <input
    type="text"
    id="duree"
    name="duree"
    value={newFormation.duree}
    onChange={handleInputChange}
    className="w-full border border-gray-300 rounded py-2 px-3"
  />
</div>
<div className="mb-4">
  <label htmlFor="id" className="block font-medium mb-2">
    ID
  </label>
  <input
    type="text"
    id="id"
    name="id"
    value={newFormation.id}
    onChange={handleInputChange}
    className="w-full border border-gray-300 rounded py-2 px-3"
  />
</div>
<div className="mb-4">
  <label htmlFor="lieu" className="block font-medium mb-2">
    Lieu
  </label>
  <input
    type="text"
    id="lieu"
    name="lieu"
    value={newFormation.lieu}
    onChange={handleInputChange}
    className="w-full border border-gray-300 rounded py-2 px-3"
  />
</div>
<div className="mb-4">
  <label htmlFor="nombre_place" className="block font-medium mb-2">
    Nombre de places
  </label>
  <input
    type="text"
    id="nombre_place"
    name="nombre_place"
    value={newFormation.nombre_place}
    onChange={handleInputChange}
    className="w-full border border-gray-300 rounded py-2 px-3"
  />
</div>
<div className="mb-4">
  <label htmlFor="prix" className="block font-medium mb-2">
    Prix
  </label>
  <input
    type="text"
    id="prix"
    name="prix"
    value={newFormation.prix}
    onChange={handleInputChange}
    className="w-full border border-gray-300 rounded py-2 px-3"
  />
</div>
<div className="mb-4">
  <label htmlFor="qualification" className="block font-medium mb-2">
    Qualification
  </label>
  <input
    type="text"
    id="qualification"
    name="qualification"
    value={newFormation.qualification}
    onChange={handleInputChange}
    className="w-full border border-gray-300 rounded py-2 px-3"
  />
</div>
<div className="mb-4">
  <label htmlFor="responsabilite" className="block font-medium mb-2">
    Responsabilité
  </label>
  <input
    type="text"
    id="responsabilite"
    name="responsabilite"
    value={newFormation.responsabilite}
    onChange={handleInputChange}
    className="w-full border border-gray-300 rounded py-2 px-3"
  />
</div>
<button
      type="submit"
      className="bg-[#a0f3d9] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3"
      onClick={addFormation}
    >
      {selectedFormation ? 'Modifier la formation' : 'Ajouter la formation'}
    </button>
    {selectedFormation && (
      <button
        className="bg-gray-200 text-red-500 w-[200px] rounded-md font-medium my-2 mx-auto px-6 py-3"
        onClick={() => setSelectedFormation(null)}
      >
        Annuler
      </button>
    )}
  </form>
</div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
