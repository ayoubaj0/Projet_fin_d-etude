import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';
import Modal from './Modal'; 
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './modal.css';
import '../src/index.css';

// gg
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


function VoitureDetails() {
  const [voiture, setVoiture] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isFactureModalOpen, setIsFactureModalOpen] = useState(false);
  const [isEditFactureModalOpen, setIsEditFactureModalOpen] = useState(false);
  const [isAssuranceModalOpen, setIsAssuranceModalOpen] = useState(false);
  const [isEditAssuranceModalOpen, setIsEditAssuranceModalOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const { id } = useParams();
  const [totalFactureAmount, setTotalFactureAmount] = useState(0); 
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
    date_facture: new Date().toISOString().split('T')[0],    
    montant_total: ''
  });
  const [editFacture, setEditFacture] = useState({
    id: '',
    contrat_id: '',
    date_facture: '',
    montant_total: ''
  });
  const [newAssurance, setNewAssurance] = useState({
    ref: '',
    voiture_id: id,
    date_debut: '',
    date_fin: '',
    
  });

  const [editAssurance, setEditAssurance] = useState({
    id: '',
    ref: '',
    voiture_id: id,
    date_debut: '',
    date_fin: '',
    
  });

  useEffect(() => {
    fetchVoiture();
    fetchClients();
  }, []);
  useEffect(() => {
    calculateTotalFactureAmount();
  }, [voiture]);

  
  const calculateTotalFactureAmount = () => {
    if (voiture && voiture.contrats) {
      const total = voiture.contrats.reduce((acc, contrat) => {
        return acc + (contrat.facture ? parseFloat(contrat.facture.montant_total) : 0);
      }, 0);
      setTotalFactureAmount(total);
    }
  };

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
  const handleAssuranceChange = (e) => {
    const { name, value } = e.target;
    setNewAssurance({ ...newAssurance, [name]: value });
  };

  const handleEditAssuranceChange = (e) => {
    const { name, value } = e.target;
    setEditAssurance({ ...editAssurance, [name]: value });
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
          date_facture: new Date().toISOString().split('T')[0],          
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

  const handleAssuranceSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/assurances', newAssurance);
      if (response.status === 201) {
        setVoiture({ ...voiture, assurances: [...voiture.assurances, response.data] });
        setIsAssuranceModalOpen(false);
        setNewAssurance({
          ref: '',
          voiture_id: voiture.id,
          date_debut: '',
          date_fin: '',
        });
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('There was an error adding the assurance!', error);
    }
  };

  const handleEditAssuranceSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/assurances/${editAssurance.id}`, editAssurance);
      if (response.status === 200) {
        setVoiture({
          ...voiture,
          assurances: voiture.assurances.map((assurance) => (assurance.id === editAssurance.id ? response.data : assurance))
        });
        fetchVoiture();
        setIsEditAssuranceModalOpen(false);
        setEditAssurance({
          id: '',
          ref: '',
          voiture_id: '',
          date_debut: '',
          date_fin: '',
          
        });
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('There was an error updating the assurance!', error);
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

  
  

// Use useEffect to log the state after it's set
// useEffect(() => {
//     console.log('newFacture state:', newFacture);
// }, [newFacture]);
// const handleAjouterFacture = (contratId) => {
//   setNewFacture({ ...newFacture, contrat_id: contratId });
//   setIsFactureModalOpen(true);
// };
  

  const handleEditAssuranceClick = (assurance) => {
    setEditAssurance(assurance);
    setIsEditAssuranceModalOpen(true);
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

  const handleAssuranceDelete = async (id) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/assurances/${id}`);
      if (response.status === 204) {
        setVoiture({ ...voiture, assurances: voiture.assurances.filter((assurance) => assurance.id !== id) });
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('There was an error deleting the assurance!', error);
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(voiture.contrats.map(contrat => ({
      'ID Contrat': contrat.id,
      'Client Nom': `${contrat.client.nom} ${contrat.client.prenom}`,
      'Date Début': contrat.date_debut,
      'Date Fin': contrat.date_fin,
      'Prix Contrat': `${contrat.prix_contrat} DH`,
      'Facture ID': contrat.facture ? contrat.facture.id : 'N/A',
      'Date Facture': contrat.facture ? contrat.facture.date_facture : 'N/A',
      'Montant Total': contrat.facture ? `${contrat.facture.montant_total} DH` : 'N/A'
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contrats");

    XLSX.writeFile(workbook, "Contrats.xlsx");
  };
  const generatePDF = (contrat, voiture) => {
    const doc = new jsPDF();
  
    // Set document properties
    doc.setProperties({
      title: `Facture_${contrat.facture.id}`,
      subject: 'Détails de la Facture',
      author: 'PFE_Ayoub_Ajermoun',
      keywords: 'contrat, véhicule, location',
      creator: 'PFE_Ayoub_Ajermoun'
    });
  
    // Add title with background color
    doc.setFillColor(0, 112, 192); // Dark blue
    doc.rect(10, 10, 190, 15, 'F');
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255); // White
    doc.text('Détails du Contrat et de la Facture', 15, 22);
  
    // Reset text color
    doc.setTextColor(0, 0, 0); // Black
  
    // Contract information header
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Informations du Contrat', 10, 40);
  
    // Contract information details
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`ID du Contrat: ${contrat.id}`, 10, 50);
    doc.text(`CIN du Client: ${contrat.client.cin}`, 10, 60);
    doc.text(`Nom du Client: ${contrat.client.nom} ${contrat.client.prenom}`, 10, 70);
    doc.text(`Email du Client: ${contrat.client.email}`, 10, 80);
    doc.text(`Téléphone du Client: ${contrat.client.telephone}`, 10, 90);
    doc.text(`Date de Début: ${contrat.date_debut}`, 10, 100);
    doc.text(`Date de Fin: ${contrat.date_fin}`, 10, 110);
    doc.text(`Prix du Contrat: ${contrat.prix_contrat} DH`, 10, 120);
  
    // Add horizontal line
    doc.setLineWidth(0.5);
    doc.line(10, 130, 200, 130);
  
    // Facture information header
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Informations de la Facture', 10, 140);
  
    // Facture information details
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    if (contrat.facture) {
      doc.text(`ID de la Facture: ${contrat.facture.id}`, 10, 150);
      doc.text(`Date de la Facture: ${contrat.facture.date_facture}`, 10, 160);
      doc.text(`Montant Total: ${contrat.facture.montant_total} DH`, 10, 170);
    } else {
      doc.text(`Aucune Facture Disponible`, 10, 150);
    }
  
    // Add horizontal line
    doc.line(10, 180, 200, 180);
  
    // Vehicle information header with background color
    doc.setFillColor(0, 112, 192); // Dark blue
    doc.rect(10, 190, 190, 10, 'F');
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255); // White
    doc.text('Détails du Véhicule', 15, 198);
  
    // Reset text color
    doc.setTextColor(0, 0, 0); // Black
  
    // Vehicle information details
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Matricule: ${voiture.matricule}`, 10, 210);
    doc.text(`Nombre de Chevaux: ${voiture.nbr_chevaux}`, 10, 220);
    doc.text(`Kilométrage: ${voiture.kilometrage}`, 10, 230);
    doc.text(`Prix par Jour: ${voiture.prix_par_jour} DH`, 10, 240);
    doc.text(`Type de Carburant: ${voiture.carburant.label}`, 10, 250);
    doc.text(`Marque: ${voiture.marque.label}`, 10, 260);
  
    // Save the PDF
    doc.save(`facture_${contrat.facture.id}.pdf`);
  };

  // const exportToPDF = () => {
  //   const doc = new jsPDF();
  //   const tableColumn = ["Client", "Date Début", "Date Fin", "Prix", "Facture Montant"];
  //   const tableRows = voiture.contrats.map(contrat => [
  //     clients.find(client => client.id === contrat.client_id)?.nom || '',
  //     contrat.date_debut,
  //     contrat.date_fin,
  //     contrat.prix_contrat,
  //     contrat.facture?.montant_total || ''
  //   ]);

  //   doc.autoTable({
  //     head: [tableColumn],
  //     body: tableRows,
  //   });

  //   doc.save('Contrats.pdf');
  // };


  const prepareChartData = (voiture) => {
    if (!voiture || !voiture.contrats) {
      return { labels: [], datasets: [] };
    }

    
    const facturesByMonth = voiture.contrats
      .flatMap(contrat => contrat.facture ? [{...contrat.facture, date: contrat.facture.date_facture}] : [])
      .reduce((acc, facture) => {
        const month = new Date(facture.date).toLocaleString('default', { month: 'long', year: 'numeric' });
        if (!acc[month]) {
          acc[month] = 0;
        }
        acc[month] += parseFloat(facture.montant_total);
        return acc;
      }, {});
  
    const labels = Object.keys(facturesByMonth).sort((a, b) => new Date(a) - new Date(b));
    const data = labels.map(label => facturesByMonth[label]);
  
    return {
      labels,
      datasets: [
        {
          label: 'Montant Total Factures',
          data,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
    };
  };

  const chartData = prepareChartData(voiture);
  

  return (
    <div className="container mx-auto ">
      <h1 className="title content text-3xl font-semibold text-center mt-8 mb-4">Voiture Details</h1>

      {voiture ? (
        <div className=" ">
           <div className='flex'>
          <div className="content">
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6 w-full max-w-lg">
            <h2 className="text-2xl font-semibold mb-4">Voiture info :</h2>
            <div className="grid grid-cols-1 gap-2 ">
              <p className='info'><span className="font-semibold">ID:</span> {voiture.id}</p>
              <p className='info'><span className="font-semibold">Matricule :</span> {voiture.matricule}</p>
              <p className='info'><span className="font-semibold">Nbr Chevaux :</span> {voiture.nbr_chevaux}</p>
              <p className='info'><span className="font-semibold">Kilometrage :</span> {voiture.kilometrage}</p>
              <p className='info'><span className="font-semibold">Prix par Jour :</span> {voiture.prix_par_jour}</p>
              <p className='info'><span className="font-semibold">Carburant type :</span> {voiture.carburant.label}</p>
              <p className='info'><span className="font-semibold">Marque :</span> {voiture.marque.label}</p>
              <p className='info'><span className="font-semibold">État du véhicule :</span> <span className={`badge text-center ${voiture.disponible === "0" ? "red-badge" : "green-badge"}`}>
                      {voiture.disponible === "0" ? "Endommagée" : "Bon état"}
                    </span>
              </p>
              <p className='info'> <span className="font-semibold"> État de la location : </span>
              {voiture.latest_contrat ? (
    <span>
      {new Date(voiture.latest_contrat.date_debut) <= new Date() && new Date(voiture.latest_contrat.date_fin) >= new Date() ? (
        <>
          <span className="badge orange-badge">En cours de location / {new Date(voiture.latest_contrat.date_fin).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}</span> 
        </>
      ) : (
        <span className="badge green-badge">Pas de location</span>
      )}
    </span>
  ) : (
    <span className="badge green-badge">Pas de location (0)</span>
  )}
              </p>
             
              {voiture.latest_assurance && (
    <p className='info'>
   <span className="font-semibold">Assurance : </span>
      {voiture.days_left > 7 && (
        <span className="badge green-badge "> {voiture.days_left} jours</span>
      )}
      {voiture.days_left <= 0 && (
        <span className="badge red-badge "> Assurance exspanirée!</span>
      )}
      {voiture.days_left < 7 && voiture.days_left > 0 && (
        <span className="badge orange-badge"> {voiture.days_left} jours</span>
      )}
      {/* Assurance expirée! Assurance expire bientôt! */}
    </p>
  )}
  
<div>
<div>
    {voiture.image && (
                  <img
                    src={`http://127.0.0.1:8000/storage/${voiture.image}`}
                    alt="Voiture"
                    className="w-20 h-20 object-cover"
                  />
                )}
  </div>
</div>
  </div>
  </div>
  </div>


  <div className="chart bg-red mt-8 w-full max-w-4xl">
  <h2 className="text-2xl font-semibold mb-4">Montant total par mois :</h2>

      <Line data={chartData} />
      <p>Montant Total des Factures:  <span className='badge green-badge'>{totalFactureAmount} DH</span></p>
    </div>
    
          </div>   
          

          {voiture.contrats.length > 0 ? (
            <div className=" bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
              <h2 className="content text-2xl font-semibold mb-4">Contrats</h2>
          <button className="button" onClick={() => setIsModalOpen(true)}><i className="fa-solid fa-plus"></i> Ajouter Contrat</button>

              <div className="overflow-x-auto mt-4">
              <button onClick={exportToExcel} className="button-g export-button bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
              <i class="fa-solid fa-file-excel"></i> Export to Excel
      </button>
      {/* <button onClick={exportToPDF}>Export to PDF</button> */}
                <table className="content table-auto w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">ID</th>
                      <th className="px-4 py-2">Client nom</th>
                      <th className="px-4 py-2">Date_Début</th>
                      <th className="px-4 py-2">_Date_Fin__</th>
                      <th className="px-4 py-2">Prix_Contrat_</th>
                      <th className="px-4 py-2">_____Actions_contrat_____</th>
                      <th className="px-4 py-2">Facture ID</th>
                      <th className="px-4 py-2">Date_Facture</th>
                      <th className="px-4 py-2">Montant_Total</th>
                      <th className="px-4 py-2">__________________________Actions_facture_________________________</th>
                    </tr>
                  </thead>
                  <tbody>
                    {voiture.contrats.map(contrat => (
                      <tr key={contrat.id}>
                        <td className="border px-4 py-2">{contrat.id}</td>
                        {/* <td className="border px-4 py-2">{contrat.client_id}</td> */}
                        <td className="border px-4 py-2">{contrat.client.nom} {contrat.client.prenom}</td>
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
                        <button
                              onClick={() => generatePDF(contrat, voiture)}
                              className="button-g bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-700"
                            >
                              <i className="fa-solid fa-file-pdf"></i> Export_to_PDF
                            </button>
                          
                          {!contrat.facture && (
                          <button
                          onClick={() => {
                            const dateDebut = new Date(contrat.date_debut);
                            const dateFin = new Date(contrat.date_fin);
                    
                            const differenceInTime = dateFin.getTime() - dateDebut.getTime(); 
                            const differenceInDays = differenceInTime / (1000 * 3600 * 24); 
                            const montantTotal = differenceInDays * parseFloat(contrat.prix_contrat);
                    
                            setNewFacture({
                              ...newFacture,
                              contrat_id: contrat.id,
                              date_facture: new Date().toISOString().split('T')[0],
                              montant_total: montantTotal
                            });
                    
                            setIsFactureModalOpen(true);
                          }}
                            className="button bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700"
                          >
                            <i className="fa-solid fa-plus"></i> Ajouter Facture
                          </button>)}
                          {contrat.facture && (
                            
                            <button
                              onClick={() => handleEditFacture(contrat.facture)}
                              className="edit-button "
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
            <p className='badge red-badge'>No contracts found for this car.</p>
          )}
          <div className=" bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
          <h2 className="content text-2xl font-semibold mb-4">Assurances</h2>
          <button onClick={() => setIsAssuranceModalOpen(true)} className=" button bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700"> <i className="fa-solid fa-plus"></i> Ajouter Assurance</button>
          <table className=" table table-auto w-full">
            <thead>
              <tr>
                <th>Assurance ID</th>
                <th>Ref</th>
                <th>Date de début</th>
                <th>Date de fin</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {voiture.assurances.map((assurance) => (
                <tr key={assurance.id}>
                  <td className="border px-4 py-2">{assurance.id}</td>
                  <td className="border px-4 py-2">{assurance.ref}</td>
                  <td className="border px-4 py-2">{assurance.date_debut}</td>
                  <td className="border px-4 py-2">{assurance.date_fin}</td>
                  {/* <td className="border px-4 py-2">{assurance.montant}</td> */}
                  <td className="border px-4 py-2">
                    <button  className="edit-button bg-yellow-500 text-black py-1 px-3 rounded hover:bg-yellow-700" onClick={() => handleEditAssuranceClick(assurance)}><i className="fa-solid fa-pen-to-square"></i>  Modifier</button>
                    <button onClick={() => handleAssuranceDelete(assurance.id)}  className="delete-button bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"><i className="fa-solid fa-trash"></i> Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
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
      <Modal isOpen={isAssuranceModalOpen} onClose={() => setIsAssuranceModalOpen(false)}>
            <form onSubmit={handleAssuranceSubmit}>
             <label>
                Ref
                <input type="text" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" name="ref" value={newAssurance.ref} onChange={handleAssuranceChange} />
              </label>
              <label>
                Date de début:
                <input type="date" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" name="date_debut" value={newAssurance.date_debut} onChange={handleAssuranceChange} />
              </label>
              <label>
                Date de fin:
                <input type="date" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" name="date_fin" value={newAssurance.date_fin} onChange={handleAssuranceChange} />
              </label>
              <button type="submit" className="button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" >Ajouter</button>
            </form>
          </Modal>
          <Modal isOpen={isEditAssuranceModalOpen} onClose={() => setIsEditAssuranceModalOpen(false)}>
            <form onSubmit={handleEditAssuranceSubmit}>
              <label>
                Ref
                <input type="text" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"  name="ref" value={editAssurance.ref} onChange={handleEditAssuranceChange} />
              </label>
              <label>
                Date de début:
                <input type="date" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"  name="date_debut" value={editAssurance.date_debut} onChange={handleEditAssuranceChange} />
              </label>
              <label>
                Date de fin:
                <input type="date" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"  name="date_fin" value={editAssurance.date_fin} onChange={handleEditAssuranceChange} />
              </label>
              <button type="submit" className="button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700" >Modifier</button>
            </form>
          </Modal>
    </div>
  );
}

export default VoitureDetails;
