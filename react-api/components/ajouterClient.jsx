import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AjouterClient() {
    const [client, setClient] = useState({
        cin: '',
        n_passport: '',
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
    });

    const navigate = useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setClient({ ...client, [name]: value });
    };

    const saveClient = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://127.0.0.1:8000/clients', client);
            if (res.status === 200) {
                // Navigate to another page or show success message
                navigate('/clients'); // Adjust the path as needed
            }
        } catch (error) {
            console.error('There was an error saving the client!', error);
            // Handle error (e.g., show an error message)
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">Ajouter Client</h1>
            <form onSubmit={saveClient}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label htmlFor="cin" className="block text-sm font-medium text-gray-700">CIN</label>
                        <input type="text" name="cin" id="cin" value={client.cin} onChange={handleInput} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="n_passport" className="block text-sm font-medium text-gray-700">N° Passport</label>
                        <input type="text" name="n_passport" id="n_passport" value={client.n_passport} onChange={handleInput} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="nom" className="block text-sm font-medium text-gray-700">Nom</label>
                        <input type="text" name="nom" id="nom" value={client.nom} onChange={handleInput} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">Prenom</label>
                        <input type="text" name="prenom" id="prenom" value={client.prenom} onChange={handleInput} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" name="email" id="email" value={client.email} onChange={handleInput} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">Telephone</label>
                        <input type="text" name="telephone" id="telephone" value={client.telephone} onChange={handleInput} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                    </div>
                </div>
                <div className="mt-6">
                    <button type='submit' className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Ajouter Client
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AjouterClient;
