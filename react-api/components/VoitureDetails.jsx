import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function VoitureDetails() {
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
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold text-center mt-8 mb-4">Voiture Details</h1>

      {voiture ? (
        <div>
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-semibold mb-4">Voiture Details</h2>
            <p className="mb-2"><span className="font-semibold">ID:</span> {voiture.id}</p>
            <p className="mb-2"><span className="font-semibold">Matricule:</span> {voiture.matricule}</p>
            <p className="mb-2"><span className="font-semibold">Nbr Chevaux:</span> {voiture.nbr_chevaux}</p>
            <p className="mb-2"><span className="font-semibold">Kilometrage:</span> {voiture.kilometrage}</p>
            <p className="mb-2"><span className="font-semibold">Prix par Jour:</span> {voiture.prix_par_jour}</p>
            <p className="mb-2"><span className="font-semibold">Carburant ID:</span> {voiture.carburant_id}</p>
            <p className="mb-2"><span className="font-semibold">Marque ID:</span> {voiture.marque_id}</p>
            <p className="mb-2"><span className="font-semibold">Disponible:</span> {voiture.disponible ? 'Yes' : 'No'}</p>
          </div>
          {voiture.contrats.length > 0 && (
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h2 className="text-2xl font-semibold mb-4">Contrats</h2>
              <table className="table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Client ID</th>
                    <th className="px-4 py-2">Date Début</th>
                    <th className="px-4 py-2">Date Fin</th>
                    <th className="px-4 py-2">Prix Contrat</th>
                  </tr>
                </thead>
                <tbody>
                  {voiture.contrats.map(contrat => (
                    <tr key={contrat.id}>
                      <td className="border px-4 py-2">{contrat.id}</td>
                      <td className="border px-4 py-2">{contrat.client_id}</td>
                      <td className="border px-4 py-2">{contrat.date_debut}</td>
                      <td className="border px-4 py-2">{contrat.date_fin}</td>
                      <td className="border px-4 py-2">{contrat.prix_contrat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {voiture.contrats.length === 0 && (
            <p className="text-center">No contracts available.</p>
          )}
        </div>
      ) : (
        <p className="text-center mt-4">Loading...</p>
      )}
    </div>
  );
}

export default VoitureDetails;
