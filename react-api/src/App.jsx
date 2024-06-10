import React, { useState } from 'react';
import { Link, Routes, Route } from "react-router-dom";
import Home from '../components/Home';
import Register from '../components/Register';
import Login from '../components/Login';
import Voitures from '../components/Voitures';
import Contrats from '../components/contrats';
import Clients from '../components/clients';
// import AjouterClient from '../components/ajouterClient';
import AjouterClient from '../components/ajouterClient';
import VoitureDetails from '../components/VoitureDetails';


function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return ( <div className=' relative bg-slate-100 min-h-screen' >
    <nav className="text-gray-400 bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
      </a>
      <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <Link to="/login"
          
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          login
        </Link>
        <Link to="/register"
          
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          register
        </Link>
        <button
          onClick={handleToggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-sticky"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
      </div>
      <div className={`items-center justify-between ${isMenuOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 bg-gray-900 text-gray-400 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-gray-800 ">
          <li className='bg-gray-900 text-gray-400 '>
            <Link to="/home" className="flex items-center w-full h-12 px-3 mt-2 bg-gray-900 text-gray-400 hover:bg-gray-700 hover:text-gray-300 rounded" aria-current="page">Home</Link>
          </li>
          <li className='bg-white-900 text-gray-400 '>
            <Link to="/voitures" className="flex items-center w-full h-12 px-3 mt-2 bg-gray-900 text-gray-400 hover:bg-gray-700 hover:text-gray-300 rounded">Voitures</Link>
          </li>
          <li className='bg-gray-900 text-gray-400 '>
            <Link to="/clients" className="flex items-center w-full h-12 px-3 mt-2 bg-gray-900 text-gray-400 hover:bg-gray-700 hover:text-gray-300 rounded">Clients</Link>
          </li>
          <li className='bg-gray-900 text-gray-400 '>
            <Link to="/contrats" className="flex items-center w-full h-12 px-3 mt-2 bg-gray-900 text-gray-400 hover:bg-gray-700 hover:text-gray-300 rounded">Contrats</Link>
          </li>
          <li className='bg-gray-900 text-gray-400 '>
            <Link to="/ajouter-client" className="flex items-center w-full h-12 px-3 mt-2 bg-gray-900 text-gray-400 hover:bg-gray-700 hover:text-gray-300 rounded">Ajouter Client</Link>
          </li>
      {/* <Link to="/ajouter-client">Ajouter Client</Link> */}

         
        </ul>
      </div>
    </div>
  </nav>
	<div className="flex items-center justify-start  w-screen h-500  space-x-6 bg-gray-300">
	<div className=" absolute top-20 left-0   flex flex-col items-center w-1/6 h-full overflow-hidden text-gray-400 bg-gray-900 rounded">
		<a className="flex items-center w-full px-3 mt-3" href="#">
			<svg className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
				<path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
			</svg>
			<span className="ml-2 text-sm font-bold">The App</span>
		</a>
		<div className="w-full px-2">
			<div className="flex flex-col items-center w-full mt-3 border-t border-gray-700">
				<a className="flex items-center w-full h-12 px-3 mt-2 text-gray-200 bg-gray-700 rounded" href="#">
					<svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
					</svg>
					<span className="ml-2 text-sm font-medium">Dasboard</span>
				</a>
				<Link className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" to="/home">
					<svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
					<span className="ml-2 text-sm font-medium">Home</span>

				</Link>
				<Link className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" to="/voitures">
					<svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
					</svg>
					<span className="ml-2 text-sm font-medium">Voitures</span>

				</Link>
				<Link className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" to="/clients">
					<svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
					</svg>
					<span className="ml-2 text-sm font-medium">Clients</span>

				</Link>
			</div>
			<div className="flex flex-col items-center w-full mt-2 border-t border-gray-700">
				<Link className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" to="/contrats">
					<svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
					</svg>
					<span className="ml-2 text-sm font-medium">Contrats</span>

				</Link>
				<Link className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" to="/contrats">
					<svg className="w-6 h-6 stroke-current"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
					</svg>
					<span className="ml-2 text-sm font-medium">Settings</span>
				</Link>
				<Link className="relative flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300" to="/contrats">
					<svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
					</svg>
					<span className="ml-2 text-sm font-medium">Messages</span>
					<span className="absolute top-0 left-0 w-2 h-2 mt-2 ml-2 bg-indigo-500 rounded-full"></span>
				</Link>
			</div>
		</div>
		<Link className="flex items-center justify-center w-full h-16 mt-auto bg-gray-800 hover:bg-gray-700 hover:text-gray-300" href="#">
			<svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
			<span className="ml-2 text-sm font-medium">Account</span>
		</Link>
	</div>

  </div>
  <div className="pt-16  "> 
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/voitures" element={<Voitures/>} />
          <Route path="/contrats" element={<Contrats/>} />
          <Route path="/clients" element={<Clients/>} />
          <Route path="/ajouter-client" element={<AjouterClient/>}/>
          <Route path="/voiture-details/:id" element={<VoitureDetails />} />

        </Routes>
   </div>
  </div>

  )
}

export default App;
