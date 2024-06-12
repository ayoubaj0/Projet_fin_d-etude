import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Title, Tooltip, Legend);

const Home = () => {
  const [clients, setClients] = useState([]);
  const [voitures, setVoitures] = useState([]);
  const [contrats, setContrats] = useState([]);
  const [factures, setFactures] = useState([]);
  const [totalPrixMois, setTotalPrixMois] = useState(0);
  const [monthlyTotals, setMonthlyTotals] = useState([]);
  const [contratsParMois, setContratsParMois] = useState([]);
  const [totalPrixVoitures, setTotalPrixVoitures] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const clientsResponse = await axios.get('http://127.0.0.1:8000/api/clients');
      setClients(clientsResponse.data);

      const voituresResponse = await axios.get('http://127.0.0.1:8000/api/voitures');
      setVoitures(voituresResponse.data);

      const contratsResponse = await axios.get('http://127.0.0.1:8000/api/contrats');
      setContrats(contratsResponse.data);

      const facturesResponse = await axios.get('http://127.0.0.1:8000/api/factures');
      setFactures(facturesResponse.data);

      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      const totalPrix = facturesResponse.data
        .filter(facture => {
          const factureDate = new Date(facture.date_facture);
          return factureDate.getMonth() + 1 === currentMonth && factureDate.getFullYear() === currentYear;
        })
        .reduce((sum, facture) => sum + parseFloat(facture.montant_total), 0);
      setTotalPrixMois(totalPrix);

      const monthlyTotals = calculateMonthlyTotals(facturesResponse.data);
      setMonthlyTotals(monthlyTotals);

      const contratsParMois = calculateContratsParMois(contratsResponse.data);
      setContratsParMois(contratsParMois);

      const totalPrixVoitures = calculateTotalPrixVoitures(voituresResponse.data, facturesResponse.data, contratsResponse.data);
      setTotalPrixVoitures(totalPrixVoitures);

      console.log('Total Prix Voitures:', totalPrixVoitures); // Debugging line

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const calculateMonthlyTotals = (factures) => {
    const totals = {};
    factures.forEach(facture => {
      const factureDate = new Date(facture.date_facture);
      const month = factureDate.getMonth() + 1;
      const year = factureDate.getFullYear();
      const key = `${year}-${month.toString().padStart(2, '0')}`;
      if (!totals[key]) {
        totals[key] = 0;
      }
      totals[key] += parseFloat(facture.montant_total);
    });
    return Object.entries(totals).sort(([a], [b]) => new Date(a) - new Date(b)).map(([key, total]) => ({ month: key, total }));
  };

  const calculateContratsParMois = (contrats) => {
    const counts = {};
    contrats.forEach(contrat => {
      const dateDebut = new Date(contrat.date_debut);
      const month = dateDebut.getMonth() + 1;
      const year = dateDebut.getFullYear();
      const key = `${year}-${month.toString().padStart(2, '0')}`;
      if (!counts[key]) {
        counts[key] = 0;
      }
      counts[key] += 1;
    });
    return Object.entries(counts).sort(([a], [b]) => new Date(a) - new Date(b)).map(([key, count]) => ({ month: key, count }));
  };

  const calculateTotalPrixVoitures = (voitures, factures, contrats) => {
    const totals = {};
    const contratsMap = {};

    // Create a map of contrats by their IDs for quick lookup
    contrats.forEach(contrat => {
      contratsMap[contrat.id] = contrat;
    });

    // Sum up total prices for each voiture
    factures.forEach(facture => {
      const contrat = contratsMap[facture.contrat_id];
      if (contrat) {
        const voitureId = contrat.voiture_id;
        if (!totals[voitureId]) {
          totals[voitureId] = 0;
        }
        totals[voitureId] += parseFloat(facture.montant_total);
      }
    });

    return voitures.map(voiture => ({
      voiture: voiture.matricule,
      total: totals[voiture.id] || 0
    }));
  };

  const lineChartData = {
    labels: monthlyTotals.map(item => item.month),
    datasets: [
      {
        label: 'Total Montant Par Mois',
        data: monthlyTotals.map(item => item.total),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const pieChartData = {
    labels: contratsParMois.map(item => item.month),
    datasets: [
      {
        label: 'Nombre de Contrats Par Mois',
        data: contratsParMois.map(item => item.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const barChartData = {
    labels: totalPrixVoitures.map(item => item.voiture),
    datasets: [
      {
        label: 'Total Prix Par Voiture',
        data: totalPrixVoitures.map(item => item.total),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div className='container'>
       <h1 className='title content'>Statistique : </h1>
      <div className="dashboard-stats">
        <div className="stat-box">
          <p>Nombre de clients:</p>
          <span>{clients.length} <i class="fa-solid fa-user-group"></i></span>
        </div>
        <div className="stat-box">
          <p>Nombre de voitures:</p> 
          <span>{voitures.length} <i class="fa-solid fa-car"></i></span>
        </div>
        <div className="stat-box">
          <p>Nombre de contrats:</p>
          <span>{contrats.length} <i class="fa-solid fa-file-contract"></i></span>
        </div>
        <div className="stat-box">
          <p>Total des prix pour le mois en cours:</p>
          <span>{totalPrixMois} <span className="badge green-badge">DH</span></span>
        </div>
      </div>
      
      <div>
        <h1 className='title content'>Graphiques : </h1>
        <div className="flex">
          <div className='content'>
            <h2 className="text-1xl text-emerald-500 font-semibold mb-4">Total Montant Par Mois</h2>
            <Line data={lineChartData} />
          </div>
          <div className='content1'>
            <h2 className="text-1xl text-emerald-500 font-semibold mb-4">Nombre de Contrats Par Mois</h2>
            <Pie data={pieChartData} />
          </div>
        </div>
        <div className='content'>
          <h2 className="text-1xl text-emerald-500 font-semibold mb-4">Total Montant Par Voiture</h2>
          <Bar data={barChartData} />
        </div>
      </div>
    </div>
  );
};

export default Home;
