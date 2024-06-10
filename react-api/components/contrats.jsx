import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal';
import './modal.css';
import '../src/index.css';

function Contrats() {
  const [contrats, setContrats] = useState([]);
  const [voitures, setVoitures] = useState([]);
  const [clients, setClients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    client_id: '',
    voiture_id: '',
    date_debut: '',
    date_fin: ''
  });
  const [newContrat, setNewContrat] = useState({
    client_id: '',
    voiture_id: '',
    date_debut: '',
    date_fin: '',
    prix_contrat: ''
  });
  const [editContrat, setEditContrat] = useState({
    id: '',
    client_id: '',
    voiture_id: '',
    date_debut: '',
    date_fin: '',
    prix_contrat: ''
  });

  useEffect(() => {
    fetchContrats();
    fetchClients();
    fetchVoitures();
  }, []);


  const fetchContrats = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/contrats');
      setContrats(response.data);
    } catch (error) {
      console.error('There was an error fetching the contrats!', error);
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
  const fetchVoitures = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/voitures');
      setVoitures(response.data);
    } catch (error) {
      console.error('There was an error fetching the voitures!', error);
    }
  };
  // const handleFilterChange = (e) => {
  //   const { name, value } = e.target;
  //   setFilters({ ...filters, [name]: value });
  // };
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewContrat({ ...newContrat, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditContrat({ ...editContrat, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/contrats', newContrat);
      if (response.status === 201) {
        setContrats([...contrats, response.data]);
        setIsModalOpen(false);
        setNewContrat({
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
      console.error('There was an error adding the contrat!', error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/contrats/${editContrat.id}`, editContrat);
      if (response.status === 200) {
        setContrats(contrats.map(contrat => (contrat.id === editContrat.id ? response.data : contrat)));
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

  const handleEdit = (contrat) => {
    setEditContrat(contrat);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this contrat?");
      if (confirmDelete) {
        const response = await axios.delete(`http://127.0.0.1:8000/api/contrats/${id}`);
        if (response.status === 200) {
          setContrats(contrats.filter(contrat => contrat.id !== id));
        } else {
          console.error('Unexpected response:', response);
        }
      }
    } catch (error) {
      console.error('There was an error deleting the contrat!', error);
    }
  };
  
    const filteredContrats = contrats.filter(contrat => {
      return (
        (filters.client_id === '' || contrat.client_id === parseInt(filters.client_id)) &&
        (filters.voiture_id === '' || contrat.voiture_id === parseInt(filters.voiture_id)) &&
        (filters.date_debut === '' || new Date(contrat.date_debut) >= new Date(filters.date_debut)) &&
        (filters.date_fin === '' || new Date(contrat.date_fin) <= new Date(filters.date_fin))
      );
    });
    // setFilteredContrats(filtered);
  

  return (
    <div className="container">
      <h1 className=" title content">Contrats</h1>
      <button className="button" onClick={() => setIsModalOpen(true)}>Ajouter Contrat</button>
      <div className='content'>
  <h2 className="title text-xl mb-4">Filtrer Contrats</h2>
  <div className=" flex justify-evenly  w-full mb-4">
  
    <div className=" m-8">
    
    
      <label className="  text-gray-700">Client ID</label>
      <br />
      <input
        type="text"
        name="client_id"
        value={filters.client_id}
        onChange={handleFilterChange}
        className="mt-1 p-2 w-10 text-center  border rounded"
      />
      
      <select
      name="client_id"
      value={filters.client_id}
      onChange={handleFilterChange}
      className="filter-select"
    >
      <option value="">Tous les clients</option>
      {clients.map(client => (
        <option key={client.id} value={client.id}>{client.nom}</option>
      ))}
    </select>
    </div>
    <div className=" m-8">
      <label className="  text-gray-700">Voiture ID</label>
      <br />

      <input
        type="text"
        name="voiture_id"
        value={filters.voiture_id}
        onChange={handleFilterChange}
        className="mt-1 p-2 w-10 text-center  border rounded"
      />
      <select
      name="voiture_id"
      value={filters.voiture_id}
      onChange={handleFilterChange}
      className="filter-select"
    >
      <option value="">Tous les voitures</option>
      {voitures.map(voiture => (
        <option  key={voiture.id} value={voiture.id}>
          {voiture.matricule}
        </option>
      ))}
    </select>
      
    </div>
    <div className="mb-4">
      <label className=" text-gray-700">Date de début</label>
      <input
        type="date"
        name="date_debut"
        value={filters.date_debut}
        onChange={handleFilterChange}
        className="mt-1 p-2 w-full border rounded"
      />
    </div>
    <div className="mb-4">
      <label className=" text-gray-700">Date de fin</label>
      <input
        type="date"
        name="date_fin"
        value={filters.date_fin}
        onChange={handleFilterChange}
        className="mt-1 p-2 w-full border rounded"
      />
    </div>

    </div>
</div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl mb-4">Ajouter Contrat</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
  <label className="block text-gray-700">Client ID</label>
  <select
    name="client_id"
    value={newContrat.client_id}
    onChange={handleChange}
    className="mt-1 p-2 w-full border rounded"
    required
  >
    <option value="">Select Client</option>
    {clients.map(client => (
      <option key={client.id} value={client.id}>
        {client.nom} {/* Assuming 'name' is the property that holds client names */}
      </option>
    ))}
  </select>
</div>
<div className="mb-4">
  <label className="block text-gray-700">Voiture ID</label>
  <select
    name="voiture_id"
    value={newContrat.voiture_id}
    onChange={handleChange}
    className="mt-1 p-2 w-full border rounded"
    required
  >
    <option value="">Select Voiture</option>
    {voitures.map(voiture => (
      <option key={voiture.id} value={voiture.id}>
        {voiture.matricule} {/* Assuming 'model' is the property that holds voiture models */}
      </option>
    ))}
  </select>
</div>

          <div className="mb-4">
            <label className="block text-gray-700">Date de début</label>
            <input
              type="date"
              name="date_debut"
              value={newContrat.date_debut}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Date de fin</label>
            <input
              type="date"
              name="date_fin"
              value={newContrat.date_fin}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Prix du contrat</label>
            <input
              type="text"
              name="prix_contrat"
              value={newContrat.prix_contrat}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <button type="submit" className="bg-green-500 text-black py-2 px-4 rounded">
            Submit
          </button>
        </form>
      </Modal>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <h2 className="text-2xl mb-4">Modifier Contrat</h2>
        <form onSubmit={handleEditSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Client ID</label>
            <input
              type="text"
              name="client_id"
              value={editContrat.client_id}
              onChange={handleEditChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Voiture ID</label>
           
            <input
  type="text"
  name="voiture_id"
  value={editContrat.voiture_id}
  onChange={handleEditChange}
  className="mt-1 p-2 w-full border rounded"
  required
/>
</div>
<div className="mb-4">
  <label className="block text-gray-700">Date de début</label>
  <input
    type="date"
    name="date_debut"
    value={editContrat.date_debut}
    onChange={handleEditChange}
    className="mt-1 p-2 w-full border rounded"
    required
  />
</div>
<div className="mb-4">
  <label className="block text-gray-700">Date de fin</label>
  <input
    type="date"
    name="date_fin"
    value={editContrat.date_fin}
    onChange={handleEditChange}
    className="mt-1 p-2 w-full border rounded"
    required
  />
</div>
<div className="mb-4">
  <label className="block text-gray-700">Prix du contrat</label>
  <input
    type="text"
    name="prix_contrat"
    value={editContrat.prix_contrat}
    onChange={handleEditChange}
    className="mt-1 p-2 w-full border rounded"
    required
  />
</div>
<button type="submit" className="bg-green-500 text-black py-2 px-4 rounded">
  Submit
</button>
</form>
</Modal>
<div className="overflow-x-auto">
<table className=" table min-w-full bg-white rounded-lg shadow-md">
  <thead className="bg-gray-200">
    <tr>
      <th className="py-2 px-4 border-b text-left">ID</th>
      <th className="py-2 px-4 border-b text-left">Client </th>
      <th className="py-2 px-4 border-b text-left">Voiture ID</th>
      <th className="py-2 px-4 border-b text-left">Date de début</th>
      <th className="py-2 px-4 border-b text-left">Date de fin</th>
      <th className="py-2 px-4 border-b text-left">Prix du contrat</th>
      <th className="py-2 px-4 border-b text-left">Actions</th>
    </tr>
  </thead>
  <tbody>
    {filteredContrats.map(contrat => (
      <tr key={contrat.id} className="hover:bg-gray-100 transition duration-200">
        <td className="py-2 px-4 border-b">{contrat.id}</td>
        <td className="py-2 px-4 border-b">{contrat.client.nom}</td>
        <td className="py-2 px-4 border-b">{contrat.voiture.matricule}</td>
        <td className="py-2 px-4 border-b">{contrat.date_debut}</td>
        <td className="py-2 px-4 border-b">{contrat.date_fin}</td>
        <td className="py-2 px-4 border-b">{contrat.prix_contrat}</td>
        <td className="py-2 px-4 border-b flex space-x-2">
          <button
            onClick={() => handleEdit(contrat)}
            className="edit-button bg-yellow-500 text-black py-1 px-3 rounded hover:bg-yellow-700"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(contrat.id)}
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

export default Contrats;
