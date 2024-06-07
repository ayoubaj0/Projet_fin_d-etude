import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
function VoitureDetails({ match }) {
  const [voiture, setVoiture] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    fetchVoiture();
  }, []);

  const fetchVoiture = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/voitures/${id}`);
      setVoiture(response.data);
    } catch (error) {
      console.error('There was an error fetching the voiture details!', error);
    }
  };

  return (
    <div className="container"> 
      <h1 className="title">Voitures Details</h1>

      {voiture ? (
        <div>
          <h2>Voiture Details</h2>
          <p>ID: {voiture.id}</p>
          <p>Matricule: {voiture.matricule}</p>
          <p>Nbr Chevaux: {voiture.nbr_chevaux}</p>
          <p>Kilometrage: {voiture.kilometrage}</p>
          <p>Prix par Jour: {voiture.prix_par_jour}</p>
          <p>Carburant ID: {voiture.carburant_id}</p>
          <p>Marque ID: {voiture.marque_id}</p>
          <p>Disponible: {voiture.disponible}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default VoitureDetails;
