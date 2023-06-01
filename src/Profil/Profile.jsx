// Profile.js
import React, { useContext, useState } from 'react';
import { UserContext } from '../context/usercontext';

const Profile = () => {
  const { user, updateProfile } = useContext(UserContext);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [address, setAddress] = useState(user.address);
  const [phone, setPhone] = useState(user.phone);
  const [residence, setResidence] = useState(user.residence);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleResidenceChange = (event) => {
    setResidence(event.target.value);
  };

  const handleSave = () => {
    updateProfile({ firstName, lastName, address, phone, residence });
  };

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <img
          src="chemin/vers/image.jpg"
          alt="Photo de profil"
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          {firstName} {lastName}
        </h1>
        <p className="text-gray-600 mb-4">{user.role}</p>
        <ul className="text-gray-600 mb-2">
          <li className="flex items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              {/* ... */}
            </svg>
            <span className="border rounded-md px-2 py-1">
              Adresse : {user.address}
            </span>
          </li>
          <li className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              {/* ... */}
            </svg>
            <span className="border rounded-md px-2 py-1">
              Téléphone : {user.phone}
            </span>
          </li>
          <li className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              {/* ... */}
            </svg>
            <span className="border rounded-md px-2 py-1">
              Email : {user.email}
            </span>
          </li>
          <li className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              {/* ... */}
            </svg>
            <span className="border rounded-md px-2 py-1">
              Formation choisie : {user.selectedFormation}
            </span>
          </li>
          
        </ul>
        <div>
          <label htmlFor="firstName" className="text-gray-600">
            Prénom :
          </label>
          <input
            type="text"
            id="firstName"
            className="border rounded-md px-2 py-1 mb-2"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </div>
        <div>
          <label htmlFor="lastName" className="text-gray-600">
            Nom :
          </label>
          <input
            type="text"
            id="lastName"
            className="border rounded-md px-2 py-1 mb-2"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </div>
        <div>
          <label htmlFor="address" className="text-gray-600">
            Adresse :
          </label>
          <input
            type="text"
            id="address"
            className="border rounded-md px-2 py-1 mb-2"
            value={address}
            onChange={handleAddressChange}
          />
        </div>
        <div>
          <label htmlFor="phone" className="text-gray-600">
            Téléphone :
          </label>
          <input
            type="text"
            id="phone"
            className="border rounded-md px-2 py-1 mb-2"
            value={phone}
            onChange={handlePhoneChange}
          />
        </div>
    
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSave}
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
};

export default Profile;
