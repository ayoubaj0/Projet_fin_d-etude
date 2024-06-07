import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
// import Sidebar from '../components/Sidebar'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> 
      {/* <Sidebar /> */}
      <App />
    </BrowserRouter>

  </React.StrictMode>,
)
