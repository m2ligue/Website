import React, { useState } from "react";
import { db } from "../firebase-config";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = async () => {
    try {
      const querySnapshot = await db
        .collection("formation")
        .where("titre", "array-contains", searchQuery)
        .get();

      const results = querySnapshot.docs.map((doc) => doc.data().titre);
      setSearchResults(results);

      // Afficher les titres de formation dans la console
      console.log("Titres de formation :", results);
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchInputChange}
        placeholder="Rechercher..."
      />
      <button type="button" onClick={handleSearchClick}>
        Rechercher
      </button>

      <ul>
        {searchResults.map((title, index) => (
          <li key={index}>{title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
