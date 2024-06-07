import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal';
import { Link } from 'react-router-dom';
import './modal.css';
import '../src/index.css';
function Voitures() {
  const [voitures, setVoitures] = useState([]);
  const [marques, setMarques] = useState([]);
  const [carburants, setCarburants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newVoiture, setNewVoiture] = useState({
    matricule: '',
    nbr_chevaux: '',
    kilometrage: '',
    prix_par_jour: '',
    carburant_id: '',
    marque_id: '',
    disponible: ''
    
  });
  const [editVoiture, setEditVoiture] = useState({
    id: '',
    matricule: '',
    nbr_chevaux: '',
    kilometrage: '',
    prix_par_jour: '',
    carburant_id: '',
    marque_id: '',
    disponible: ''
  });
  const [filter, setFilter] = useState({
    carburant_id: '',
    marque_id: '',
    disponible: '',
    assurance_status: '',
    etat_location: ''

  });
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchVoitures();
    fetchMarques();
    fetchCarburants();
  }, []);
  const filteredVoitures = voitures.filter(voiture => {
    console.log("Days left:", voiture.days_left);
    console.log("Assurance status filter:", filter.assurance_status);
    return (
      (filter.carburant_id === '' || voiture.carburant_id === parseInt(filter.carburant_id)) &&
      (filter.marque_id === '' || voiture.marque_id === parseInt(filter.marque_id)) &&
      (filter.disponible === '' || voiture.disponible === filter.disponible) &&
      (filter.assurance_status === '' || 
      (filter.assurance_status === 'expiree' && parseInt(voiture.days_left) <= 0) ||
      (filter.assurance_status === 'expiree_bientot' && parseInt(voiture.days_left) > 0 && parseInt(voiture.days_left) <= 7) ||
      (filter.assurance_status === 'boon' && parseInt(voiture.days_left) > 7))&&
      (filter.etat_location === '' ||
        (filter.etat_location === 'en_cours' && voiture.contrats.some(contrat => new Date(contrat.date_debut) <= new Date() && new Date(contrat.date_fin) >= new Date())) ||
        (filter.etat_location === 'disponible' && voiture.contrats.every(contrat => !(new Date(contrat.date_debut) <= new Date() && new Date(contrat.date_fin) >= new Date()))))
    );
  });
  const resetFilters = () => {
    setFilter({
      carburant_id: '',
      marque_id: '',
      disponible: '',
      assurance_status: '',
      etat_location: ''
    });
  };

  const fetchVoitures = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/voitures');
      setVoitures(response.data);
    } catch (error) {
      console.error('There was an error fetching the voitures!', error);
    }
  };

  const fetchMarques = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/marques');
      setMarques(response.data);
    } catch (error) {
      console.error('There was an error fetching the marques!', error);
    }
  };

  const fetchCarburants = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/carburants');
      setCarburants(response.data);
    } catch (error) {
      console.error('There was an error fetching the carburants!', error);
    }
  };

  const handleDelete = async (voitureId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this voiture?");
      
      if (confirmDelete) {
        const response = await axios.delete(`http://127.0.0.1:8000/api/voitures/${voitureId}`);
        if (response.status === 200) {
          setVoitures(voitures.filter(voiture => voiture.id !== voitureId));
        } else {
          console.error('Unexpected response:', response);
        }
      }
    } catch (error) {
      console.error('There was an error deleting the voiture!', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewVoiture((prevState) => ({
      ...prevState,
      [name]: value,
    }));
};

const handleEditChange = (e) => {
  const { name, value } = e.target;
  setEditVoiture((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/voitures', newVoiture);
      if (response.status === 201) {
        setVoitures([...voitures, response.data]);
        setIsModalOpen(false);
        setNewVoiture({
          matricule: '',
          nbr_chevaux: '',
          kilometrage: '',
          prix_par_jour: '',
          carburant_id: '',
          marque_id: '',
          disponible: '1'
        });
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('There was an error adding the voiture!', error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/voitures/${editVoiture.id}`, editVoiture);
      if (response.status === 200) {
        setVoitures(voitures.map(voiture => (voiture.id === editVoiture.id ? response.data : voiture)));
        setIsEditModalOpen(false);
        setEditVoiture({
          id: '',
          matricule: '',
          nbr_chevaux: '',
          kilometrage: '',
          prix_par_jour: '',
          carburant_id: '',
          marque_id: '',
          disponible: ''
        });
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('There was an error updating the voiture!', error);
    }
  };

  const openEditModal = (voiture) => {
    setEditVoiture(voiture);
    setIsEditModalOpen(true);
  };
  

  return (
    <div className="container">
      <h1 className="title">Voitures</h1>
      <button className="button" onClick={() => setIsModalOpen(true)}>Ajouter Voiture</button>
      <div className="filter-container">
        <select name="carburant_id" value={filter.carburant_id} onChange={handleFilterChange} className="filter-select">
          <option value="">Tous les carburants</option>
          {carburants.map(carburant => (
            <option key={carburant.id} value={carburant.id}>{carburant.label}</option>
          ))}
        </select>
        <select name="marque_id" value={filter.marque_id} onChange={handleFilterChange} className="filter-select">
          <option value="">Toutes les marques</option>
          {marques.map(marque => (
            <option key={marque.id} value={marque.id}>{marque.label}</option>
          ))}
        </select>
        <select name="disponible" value={filter.disponible} onChange={handleFilterChange} className="filter-select">
          <option value="">Disponibilité</option>
          <option value="1">Oui</option>
          <option value="0">Non</option>
        </select>
        <select name="assurance_status" value={filter.assurance_status} onChange={handleFilterChange} className="filter-select">
          <option value="">Assurance</option>
          <option value="expiree">Expirée</option>
          <option value="expiree_bientot">Expire bientôt</option>
          <option value="boon">Bonne</option>
        </select>
        <select name="etat_location" value={filter.etat_location} onChange={handleFilterChange} className="filter-select">
        <option value="">État de la location</option>
        <option value="en_cours">En cours de location</option>
        <option value="disponible">Disponible à la location</option>
      </select>
      <button className="button" onClick={resetFilters}>Reset</button>

      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl mb-4">Ajouter Voiture</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Matricule</label>
            <input
              type="text"
              name="matricule"
              value={newVoiture.matricule}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Nbr Chevaux</label>
            <input type="number"
              name="nbr_chevaux"
              value={newVoiture.nbr_chevaux}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Kilometrage</label>
            <input
              type="number"
              name="kilometrage"
              value={newVoiture.kilometrage}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Prix par Jour</label>
            <input
              type="number"
              name="prix_par_jour"
              value={newVoiture.prix_par_jour}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Carburant</label>
            <select
              name="carburant_id"
              value={newVoiture.carburant_id}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              required
            >
              <option value="">Select</option>
              {carburants.map(carburant => (
                <option key={carburant.id} value={carburant.id}>{carburant.label}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Marque</label>
            <select
              name="marque_id"
              value={newVoiture.marque_id}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              required
            >
              <option value="">Select</option>
              {marques.map(marque => (
                <option key={marque.id} value={marque.id}>{marque.label}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
  <label className="block text-gray-700">Disponible</label>
  <select
    name="disponible"
    value={newVoiture.disponible ? "1" : "0"} // Convert boolean to string
    onChange={handleChange}
    className="mt-1 p-2 w-full border rounded"
    required
  >
    <option value="">Select</option>
    <option value="1">Oui</option>
    <option value="0">Non</option>
  </select>
  
</div>
{/* {typeof newVoiture.disponible} */}
          <button type="submit" className="bg-green-500 text-black py-2 px-4 rounded">
            Submit
          </button>
        </form>
      </Modal>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <h2 className="text-2xl mb-4">Modifier Voiture</h2>
        <form onSubmit={handleEditSubmit}>
          <div className ="mb-4">
            <label className="block text-gray-700">Matricule</label>
            <input
              type="text"
              name="matricule"
              value={editVoiture.matricule}
              onChange={handleEditChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Nbr Chevaux</label>
            <input
              type="number"
              name="nbr_chevaux"
              value={editVoiture.nbr_chevaux}
              onChange={handleEditChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Kilometrage</label>
            <input
              type="number"
              name="kilometrage"
              value={editVoiture.kilometrage}
              onChange={handleEditChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Prix par Jour</label>
            <input
              type="number"
              name="prix_par_jour"
              value={editVoiture.prix_par_jour}
              onChange={handleEditChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Carburant</label>
            <select
              name="carburant_id"
              value={editVoiture.carburant_id}
              onChange={handleEditChange}
              className="mt-1 p-2 w-full border rounded"
              required
            >
              <option value="">Select</option>
              {carburants.map(carburant => (
                <option key={carburant.id} value={carburant.id}>{carburant.label}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Marque</label>
            <select
              name="marque_id"
              value={editVoiture.marque_id}
              onChange={handleEditChange}
              className="mt-1 p-2 w-full border rounded"
              required
            >
              <option value="">Select</option>
              {marques.map(marque => (
                <option key={marque.id} value={marque.id}>{marque.label}</option>
              ))}
            </select>
          </div>
          {/* <div className="mb-4">
            <label className="block text-gray-700">Disponible</label>
            <select
              name="disponible"
              value={editVoiture.disponible ? "1" : "0"}
              onChange={handleEditChange}
              className="mt-1 p-2 w-full border rounded"
              required
            >
              <option value="">Select</option>
              <option value="1">Oui</option>
              <option value="0">Non</option>
            </select>
          </div> */}
          <div className="mb-4">
  <label className="block text-gray-700">Disponible</label>
  <select
    name="disponible"
    value={editVoiture.disponible}
    onChange={handleEditChange}
    className="mt-1 p-2 w-full border rounded"
    required
  >
    <option value="">Select</option>
    <option value="1">Oui</option>
    <option value="0">Non</option>
  </select>
</div>
          <button type="submit" className="bg-green-500 text-black py-2 px-4 rounded">
            Submit
          </button>
        </form>
      </Modal>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">Matricule</th>
              <th className="py-2 px-4 border-b text-left">Nbr Chevaux</th>
              <th className="py-2 px-4 border-b text-left">Kilometrage</th>
              <th className="py-2 px-4 border-b text-left">Prix par_Jour</th>
              <th className="py-2 px-4 border-b text-left">Carburant Type </th>
              <th className="py-2 px-4 border-b text-left">Marque </th>
              <th className="py-2 px-4 border-b text-left">Disponible</th>
              <th className="py-2 px-4 border-b text-left">Jours restants pour_l'assurance</th>
              <th className="py-2 px-4 border-b text-left">etat_de_voiture_location</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVoitures.map(voiture => (
              <tr key={voiture.id} className="hover:bg-gray-400 transition duration-200">
                <td className="py-2 px-4 border-b">{voiture.id}</td>
                <td className="py-2 px-4 border-b">{voiture.matricule}</td>
                <td className="py-2 px-4 border-b">{voiture.nbr_chevaux}</td>
                <td className="py-2 px-4 border-b">{voiture.kilometrage}</td>
                <td className="py-2 px-4 border-b">{voiture.prix_par_jour}</td>
                <td className="py-2 px-4 border-b">{voiture.carburant.label}</td>
                <td className="py-2 px-4 border-b">{voiture.marque.label}</td>
                <td className="py-2 px-4 border-b ">
                    <p className={`badge text-center ${voiture.disponible === "0" ? "red-badge" : "green-badge"}`}>
                      {voiture.disponible === "0" ? "non" : "oui"}
                    </p>                
                </td>
               
                <td className="py-2 px-4 border-b">
  {voiture.latest_assurance && (
    <div className='flex justify-center'>
   {/* <p className={{ color: voiture.days_left <= 0 ? 'badge red-badge' : voiture.days_left < 7 ? 'badge orange-badge' : 'badge green-badge' }}> */}

   {/* <p style={{ color: voiture.days_left <= 0 ? 'red' : voiture.days_left < 7 ? '#ff9900' : '#009900' }}>
   {voiture.days_left}
      </p> */}
      {voiture.days_left > 7 && (
        <p className="badge green-badge "> {voiture.days_left} jours</p>
      )}
      {voiture.days_left <= 0 && (
        <p className="badge red-badge "> Assurance expirée!</p>
      )}
      {voiture.days_left < 7 && voiture.days_left > 0 && (
        <p className="badge orange-badge "> {voiture.days_left} jours</p>
      )}
      {/* Assurance expirée! Assurance expire bientôt! */}
    </div>
  )}
</td>
<td className="py-2 px-4 border-b">
  <p>
    {voiture.contrats.length === 0 ? (
      <span className="badge green-badge">Disponible à la location</span>
    ) : (
      voiture.contrats.map((contrat, index) => (
        <p key={index}>
          {new Date(contrat.date_debut) <= new Date() && new Date(contrat.date_fin) >= new Date() ? (
            <span className="badge orange-badge">En cours de location</span>
          ) : (
            <span className="badge green-badge">Disponible à la location</span>
          )}
        </p>
      ))
    )}
  </p>
</td>
                <td className="py-2 px-4 border-b flex space-x-2">
                  <Link to={`/voiture-details/${voiture.id}`} className="button bg-blue-500 text-black py-1 px-3 rounded hover:bg-blue-700">
                    Details
                  </Link>
                  <button
                    onClick={() => openEditModal(voiture)}
                    className="edit-button bg-yellow-500 text-black py-1 px-3 rounded hover:bg-yellow-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(voiture.id)}
                    className="delete-button bg-red-500 text-black py-1 px-3 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Voitures;

