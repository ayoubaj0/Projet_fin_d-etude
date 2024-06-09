import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Modal from './Modal'; // Assuming you have a Modal component
import './modal.css';
import '../src/index.css';

function VoitureDetails() {
  const [voiture, setVoiture] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isFactureModalOpen, setIsFactureModalOpen] = useState(false);
  const [isEditFactureModalOpen, setIsEditFactureModalOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const { id } = useParams();
  const [newContrat, setNewContrat] = useState({
    client_id: '',
    voiture_id: id,
    date_debut: '',
    date_fin: '',
    prix_contrat: ''
  });
  const [editContrat, setEditContrat] = useState({
    id: '',
    client_id: '',
    voiture_id: id,
    date_debut: '',
    date_fin: '',
    prix_contrat: ''
  });
  const [newFacture, setNewFacture] = useState({
    contrat_id: '',
    date_facture: '',
    montant_total: ''
  });
  const [editFacture, setEditFacture] = useState({
    id: '',
    contrat_id: '',
    date_facture: '',
    montant_total: ''
  });

  useEffect(() => {
    fetchVoiture();
    fetchClients();
  }, []);

  const fetchVoiture = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/voitures/${id}`);
      setVoiture(response.data);
    } catch (error) {
      console.error('There was an error fetching the voiture details!', error);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/clients');
      setClients(response.data);
    } catch (error) {
      console.error('There was an error fetching the clients!', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewContrat({ ...newContrat, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditContrat({ ...editContrat, [name]: value });
  };

  const handleFactureChange = (e) => {
    const { name, value } = e.target;
    setNewFacture({ ...newFacture, [name]: value });
  };

  const handleEditFactureChange = (e) => {
    const { name, value } = e.target;
    setEditFacture({ ...editFacture, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/contrats', newContrat);
      if (response.status === 201) {
        setVoiture({ ...voiture, contrats: [...voiture.contrats, response.data] });
        setIsModalOpen(false);
        setNewContrat({
          client_id: '',
          voiture_id: voiture.id,
          date_debut: '',
          date_fin: '',
          prix_contrat: ''
        });
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('There was an error adding the contrat!', error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/contrats/${editContrat.id}`, editContrat);
      if (response.status === 200) {
        setVoiture({
          ...voiture,
          contrats: voiture.contrats.map((contrat) => (contrat.id === editContrat.id ? response.data : contrat))
        });
    fetchVoiture();

        setIsEditModalOpen(false);
        setEditContrat({
          id: '',
          client_id: '',
          voiture_id: '',
          date_debut: '',
          date_fin: '',
          prix_contrat: ''
        });
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('There was an error updating the contrat!', error);
    }
  };

  const handleFactureSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/factures', newFacture);
      if (response.status === 201) {
        setVoiture({
          ...voiture,
          contrats: voiture.contrats.map((contrat) =>
            contrat.id === newFacture.contrat_id ? { ...contrat, facture: response.data } : contrat
          )
        });
    fetchVoiture();

        setIsFactureModalOpen(false);
        setNewFacture({
          contrat_id: '',
          date_facture: '',
          montant_total: ''
        });
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('There was an error adding the facture!', error);
    }
  };

  const handleEditFactureSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/factures/${editFacture.id}`, editFacture);
      if (response.status === 200) {
        setVoiture({
          ...voiture,
          contrats: voiture.contrats.map((contrat) =>
            contrat.id === editFacture.contrat_id ? { ...contrat, facture: response.data } : contrat
          )
        });
    fetchVoiture();
        
        setIsEditFactureModalOpen(false);
        setEditFacture({
          id: '',
          contrat_id: '',
          date_facture: '',
          montant_total: ''
        });
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('There was an error updating the facture!', error);
    }
  };

  const handleEdit = (contrat) => {
    setEditContrat(contrat);
    setIsEditModalOpen(true);
  };

  const handleEditFacture = (facture) => {
    setEditFacture(facture);
    setIsEditFactureModalOpen(true);
  };


  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this contrat?");
      if (confirmDelete) {
        const response = await axios.delete(`http://127.0.0.1:8000/api/contrats/${id}`);
        if (response.status === 200) {
          setVoiture({ ...voiture, contrats: voiture.contrats.filter((contrat) => contrat.id !== id) });
        } else {
          console.error('Unexpected response:', response);
        }
      }
    } catch (error) {
      console.error('There was an error deleting the contrat!', error);
    }
  };
  const handleDeleteFacture = async (factureId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this facture?");
      if (confirmDelete) {
        const response = await axios.delete(`http://127.0.0.1:8000/api/factures/${factureId}`);
        if (response.status === 200) {
          setVoiture({
            ...voiture,
            contrats: voiture.contrats.map((contrat) =>
              contrat.facture && contrat.facture.id === factureId ? { ...contrat, facture: null } : contrat
            )
          });
        } else {
          console.error('Unexpected response:', response);
        }
      }
    } catch (error) {
      console.error('There was an error deleting the facture!', error);
    }
  };
  

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold text-center mt-8 mb-4">Voiture Details</h1>

      {voiture ? (
        <div className="flex flex-col items-center">
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6 w-full max-w-lg">
            <h2 className="text-2xl font-semibold mb-4">Voiture Details</h2>
            <div className="grid grid-cols-1 gap-2">
              <p><span className="font-semibold">ID:</span> {voiture.id}</p>
              <p><span className="font-semibold">Matricule:</span> {voiture.matricule}</p>
              <p><span className="font-semibold">Nbr Chevaux:</span> {voiture.nbr_chevaux}</p>
              <p><span className="font-semibold">Kilometrage:</span> {voiture.kilometrage}</p>
              <p><span className="font-semibold">Prix par Jour:</span> {voiture.prix_par_jour}</p>
              <p><span className="font-semibold">Carburant ID:</span> {voiture.carburant_id}</p>
              <p><span className="font-semibold">Marque ID:</span> {voiture.marque_id}</p>
              <p><span className="font-semibold">Disponible:</span> {voiture.disponible ? 'Yes' : 'No'}</p>
            </div>
          </div>
          <button className="button" onClick={() => setIsModalOpen(true)}><i className="fa-solid fa-plus"></i> Ajouter Contrat</button>
          {voiture.contrats.length > 0 ? (
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
              <h2 className="text-2xl font-semibold mb-4">Contrats</h2>
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">ID</th>
                      <th className="px-4 py-2">Client ID</th>
                      <th className="px-4 py-2">Date_Début</th>
                      <th className="px-4 py-2">_Date_Fin__</th>
                      <th className="px-4 py-2">Prix_Contrat_</th>
                      <th className="px-4 py-2">_____Actions_contrat_____</th>
                      <th className="px-4 py-2">Facture ID</th>
                      <th className="px-4 py-2">Date_Facture</th>
                      <th className="px-4 py-2">Montant_Total</th>
                      <th className="px-4 py-2">______________Actions_facture_____________</th>
                    </tr>
                  </thead>
                  <tbody>
                    {voiture.contrats.map(contrat => (
                      <tr key={contrat.id}>
                        <td className="border px-4 py-2">{contrat.id}</td>
                        <td className="border px-4 py-2">{contrat.client_id}</td>
                        <td className="border px-4 py-2">{contrat.date_debut}</td>
                        <td className="border px-4 py-2">{contrat.date_fin}</td>
                        <td className="border px-4 py-2">{contrat.prix_contrat} <span className='badge green-badge'>DH</span> </td>
                        <td className="border px-4 py-2 flex space-x-2">
                            <button
                              onClick={() => handleEdit(contrat)}
                              className="edit-button bg-yellow-500 text-black py-1 px-3 rounded hover:bg-yellow-700"
                            >
                             <i className="fa-solid fa-pen-to-square"></i> Edit
                            </button>
                            <button
                              onClick={() => handleDelete(contrat.id)}
                              className="delete-button bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
                            >
                              <i className="fa-solid fa-trash"></i> Delete
                            </button>
                        </td>
                        {contrat.facture ? (
                          <>
                            <td className="border px-4 py-2">{contrat.facture.id}</td>
                            <td className="border px-4 py-2">{contrat.facture.date_facture}</td>
                            <td className="border px-4 py-2">{contrat.facture.montant_total} <span className='badge green-badge'>DH</span> </td>
                          </>
                        ) : (
                          <td className="border px-4 py-2  " colSpan="3"><span className='badge red-badge'> No Facture Available </span></td>
                        )}
                        <td className="border px-4 py-2 flex space-x-2">
                          
                          {!contrat.facture && (
                          <button
                            onClick={() => {
                              setNewFacture({ ...newFacture, contrat_id: contrat.id });
                              setIsFactureModalOpen(true);
                            }}
                            className="button bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700"
                          >
                            <i className="fa-solid fa-plus"></i> Ajouter Facture
                          </button>)}
                          {contrat.facture && (
                            <button
                              onClick={() => handleEditFacture(contrat.facture)}
                              className="edit-button bg-green-500 text-white py-1 px-3 rounded hover:bg-green-700"
                            >
                              <i className="fa-solid fa-pen-to-square"></i> Edit_Facture
                            </button>
                            
                          )}
                          {contrat.facture && (

                            <button
                            onClick={() => handleDeleteFacture(contrat.facture.id)}
                            className="delete-button bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
                            >
                             <i className="fa-solid fa-trash"></i> Delete_Facture
                            </button>
                          )}

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p>No contracts found for this car.</p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold mb-4">Ajouter Contrat</h2>
          <div className="mb-4">
            <label htmlFor="client_id" className="block text-sm font-medium text-gray-700">Client:</label>
            <select
              id="client_id"
              name="client_id"
              value={newContrat.client_id}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              required
            >
              <option value="">Select a client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>{client.nom}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="date_debut" className="block text-sm font-medium text-gray-700">Date Début:</label>
            <input
              type="date"
              id="date_debut"
              name="date_debut"
              value={newContrat.date_debut}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date_fin" className="block text-sm font-medium text-gray-700">Date Fin:</label>
            <input
              type="date"
              id="date_fin"
              name="date_fin"
              value={newContrat.date_fin}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="prix_contrat" className="block text-sm font-medium text-gray-700">Prix Contrat:</label>
            <input
              type="number"
              id="prix_contrat"
              name="prix_contrat"
              value={newContrat.prix_contrat}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="add-button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Add</button>
            <button type="button" className="cancel-button ml-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700" onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <form onSubmit={handleEditSubmit}>
          <h2 className="text-xl font-semibold mb-4">Edit Contract</h2>
          <div className="mb-4">
            <label htmlFor="client_id" className="block text-sm font-medium text-gray-700">Client:</label>
            <select
              id="client_id"
              name="client_id"
              value={editContrat.client_id}
              onChange={handleEditChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              required
            >
              <option value="">Select a client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>{client.nom}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="date_debut" className="block text-sm font-medium text-gray-700">Date Début:</label>
            <input
              type="date"
              id="date_debut"
              name="date_debut"
              value={editContrat.date_debut}
              onChange={handleEditChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date_fin" className="block text-sm font-medium text-gray-700">Date Fin:</label>
            <input
              type="date"
              id="date_fin"
              name="date_fin"
              value={editContrat.date_fin}
              onChange={handleEditChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="prix_contrat" className="block text-sm font-medium text-gray-700">Prix Contrat:</label>
            <input
              type="number"
              id="prix_contrat"
              name="prix_contrat"
              value={editContrat.prix_contrat}
              onChange={handleEditChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="edit-button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Save</button>
            <button type="button" className="cancel-button ml-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isFactureModalOpen} onClose={() => setIsFactureModalOpen(false)}>
        <form onSubmit={handleFactureSubmit}>
          
          <h2 className="text-xl font-semibold mb-4">Add Invoice</h2>
          
          <div className="mb-4">
            <label htmlFor="date_facture" className="block text-sm font-medium text-gray-700">Invoice Date:</label>
            <input
              type="date"
              id="date_facture"
              name="date_facture"
              value={newFacture.date_facture}
              onChange={handleFactureChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="montant_total" className="block text-sm font-medium text-gray-700">Total Amount:</label>
            <input
              type="number"
              id="montant_total"
              name="montant_total"
              value={newFacture.montant_total}
              onChange={handleFactureChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="add-button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Add</button>
            <button type="button" className="cancel-button ml-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700" onClick={() => setIsFactureModalOpen(false)}>Cancel</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isEditFactureModalOpen} onClose={() => setIsEditFactureModalOpen(false)}>
        <form onSubmit={handleEditFactureSubmit}>
          <h2 className="text-xl font-semibold mb-4">Edit Invoice</h2>
          <div className="mb-4">
            <label htmlFor="date_facture" className="block text-sm font-medium text-gray-700">Invoice Date:</label>
            <input
              type="date"
              id="date_facture"
              name="date_facture"
              value={editFacture.date_facture}
              onChange={handleEditFactureChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="montant_total" className="block text-sm font-medium text-gray-700">Total Amount:</label>
            <input
              type="number"
              id="montant_total"
              name="montant_total"
              value={editFacture.montant_total}
              onChange={handleEditFactureChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="edit-button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Save</button>
            <button type="button" className="cancel-button ml-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700" onClick={() => setIsEditFactureModalOpen(false)}>Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default VoitureDetails;
