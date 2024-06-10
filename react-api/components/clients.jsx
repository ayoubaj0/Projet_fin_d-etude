import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal';
import './modal.css';
import '../src/index.css';

function Clients() {
  const [clients, setClients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchCIN, setSearchCIN] = useState('');
  const [newClient, setNewClient] = useState({
    cin: '',
    n_passport: '',
    nom: '',
    prenom: '',
    email: '',
    telephone: ''
  });
  const [editClient, setEditClient] = useState({
    id: '',
    cin: '',
    n_passport: '',
    nom: '',
    prenom: '',
    email: '',
    telephone: ''
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/clients');
      setClients(response.data);
    } catch (error) {
      console.error('There was an error fetching the clients!', error);
    }
  };

  const handleDelete = async (clientId) => {
    try {
      // Display a confirmation dialog before deleting
      const confirmDelete = window.confirm("Are you sure you want to delete this client?");
      
      if (confirmDelete) {
        const response = await axios.delete(`http://127.0.0.1:8000/api/clients/${clientId}`);
        if (response.status === 200) {
          setClients(clients.filter(client => client.id !== clientId));
        } else {
          console.error('Unexpected response:', response);
        }
      }
    } catch (error) {
      console.error('There was an error deleting the client!', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClient({ ...newClient, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditClient({ ...editClient, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/clients', newClient);
      if (response.status === 201) {
        setClients([...clients, response.data]);
        setIsModalOpen(false);
        setNewClient({
          cin: '',
          n_passport: '',
          nom: '',
          prenom: '',
          email: '',
          telephone: ''
        });
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('There was an error adding the client!', error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/clients/${editClient.id}`, editClient);
      if (response.status === 200) {
        setClients(clients.map(client => (client.id === editClient.id ? response.data : client)));
        setIsEditModalOpen(false);
        setEditClient({
          id: '',
          cin: '',
          n_passport: '',
          nom: '',
          prenom: '',
          email: '',
          telephone: ''
        });
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('There was an error updating the client!', error);
    }
  };

  const openEditModal = (client) => {
    setEditClient(client);
    setIsEditModalOpen(true);
  };

  const filteredClients = clients.filter(client => {
    return client.cin.toLowerCase().includes(searchCIN.toLowerCase()) ||
           (client.n_passport && client.n_passport.toLowerCase().includes(searchCIN.toLowerCase()));
  });

  return (
    // <div className="p-6 bg-red min-h-screen flex flex-col items-center">
    //   <h1 className="text-3xl font-bold mb-4 text-gray-800 border-5">Clients</h1>
    //   <button onClick={() => setIsModalOpen(true)} className="bg-blue-900 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
    //     Ajouter Client
    //   </button>
      <div className="container">
  <h1 className="title content">Clients</h1>
  <div className="my-4">
        <input
          type="text"
          placeholder="Recherch par CIN ou passport"
          value={searchCIN}
          onChange={(e) => setSearchCIN(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>
  <button className="button" onClick={() => setIsModalOpen(true)}> <i className="fa-solid fa-plus"></i>Ajouter Client</button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl mb-4">Ajouter Client</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">CIN</label>
            <input
              type="text"
              name="cin"
              value={newClient.cin}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">N° Passport</label>
            <input
              type="text"
              name="n_passport"
              value={newClient.n_passport}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Nom</label>
            <input
              type="text"
              name="nom"
              value={newClient.nom}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Prenom</label>
            <input
              type="text"
              name="prenom"
              value={newClient.prenom}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={newClient.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Telephone</label>
            <input
              type="text"
              name="telephone"
              value={newClient.telephone}
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
        <h2 className="text-2xl mb-4">Modifier Client</h2>
        <form onSubmit={handleEditSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">CIN</label>
            <input
              type="text"
              name="cin"
              value={editClient.cin}
              onChange={handleEditChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">N° Passport</label>
            <input
              type="text"
              name="n_passport"
              value={editClient.n_passport}
              onChange={handleEditChange}
              className="mt-1 p-2 w-full border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Nom</label>
            <input
              type="text"
              name="nom"
              value={editClient.nom}
              onChange={handleEditChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Prenom</label>
            <input
              type="text"
              name="prenom"
              value={editClient.prenom}
              onChange={handleEditChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={editClient.email}
              onChange={handleEditChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Telephone</label>
            <input
              type="text"
              name="telephone"
              value={editClient.telephone}
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
        <table className="table min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">CIN</th>
              <th className="py-2 px-4 border-b text-left">N° Passport</th>
              <th className="py-2 px-4 border-b text-left">Nom</th>
              <th className="py-2 px-4 border-b text-left">Prenom</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Telephone</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map(client => (
              <tr key={client.id} className="hover:bg-gray-100 transition duration-200">
                <td className="py-2 px-4 border-b">{client.id}</td>
                <td className="py-2 px-4 border-b">{client.cin}</td>
                <td className="py-2 px-4 border-b">{client.n_passport}</td>
                <td className="py-2 px-4 border-b">{client.nom}</td>
                <td className="py-2 px-4 border-b">{client.prenom}</td>
                <td className="py-2 px-4 border-b">{client.email}</td>
                <td className="py-2 px-4 border-b">{client.telephone}</td>
                <td className="py-2 px-4 border-b flex space-x-2">
                  <button
                    onClick={() => openEditModal(client)}
                    className="edit-button bg-yellow-500 text-black py-1 px-3 rounded hover:bg-yellow-700"
                  >
                    <i className="fa-solid fa-pen-to-square"></i> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(client.id)}
                    className=" delete-button bg-red-500 text-black py-1 px-3 rounded hover:bg-red-700"
                  >
                    <i className="fa-solid fa-trash"></i> Delete
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

export default Clients;
