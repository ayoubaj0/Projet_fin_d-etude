import React from "react";
import { Link } from "react-router-dom";
// import logo from "../logo192.png";

const Sidebar = () => {
  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        marginTop: "0px",
        marginLeft: "65px",
      }}
      className="container"
    >
      <nav
        style={{
          width: "78%",
          float: "right",
          marginTop: "0px",
          backgroundColor: "#28324f",
        }}
        
        className=""
      >
        <ul className="topnav" style={{ backgroundColor: "#28324f" }}>
          <li>
          <Link to="/" >
              <i className="fa fa-th-large mr-3  fa-fw"></i>
              Home
            </Link>
          </li>
          <li>
            <Link to="/absencesparstagiaires ">Absences par stagiaires</Link>
          </li>
          <li>
            <Link to="/absences">Gestions des Absences</Link>
          </li>
          <li>
            <Link to="/stagiaires">Gestions des Stagiaires</Link>
          </li>
          {/* <li>
            <Link to="/test"> i</Link>
          </li> */}
        </ul>
      </nav>
      <div
        className="vertical-nav "
        style={{ backgroundColor: "#28324f" }}
        
        id="sidebar"
      >
        <div className="py-2 px-1 mb-2 " style={{ backgroundColor: "#28324f" }}>
          <div className="media d-flex align-items-center">
            <img
              src={logo}
              alt="..."
              width="65"
              className="mr-1 rounded-circle img-thumbnail shadow-sm"
            />
            <div className="media-body">
              <h4 className="m-0 text-light">Ayoub Ajermoun</h4>
              <p className="font-weight-light text-white mb-0">Projet</p>
            </div>
          </div>
        </div>
        <ul
          className="nav flex-column  mb-0"
          style={{ backgroundColor: "#28324f" }}
        >
          <li className="nav-item">
            <Link
              to="/"
              className="nav-link  font-italic"
              style={{ color: "#a7abb7" }}
            >
              <i className="fa fa-th-large mr-3  fa-fw"></i>
              Home
            </Link>
          </li>
        </ul>
        <p className="text-info font-weight-bold text-uppercase px-3 small pt-4 pb-2 mb-0 border-bottom">
          <i className="fa fa-bar-chart" aria-hidden="true"></i>statistiques absence
        </p>
        <ul
          className="nav flex-column  mb-0"
          style={{ backgroundColor: "#28324f" }}
        >
           <li className="nav-item">
            <Link
              to="/"
              className="nav-link  font-italic"
              style={{ color: "#a7abb7" }}
            >
              <i className="fa fa-th-large mr-3  fa-fw"></i>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/absencesparstagiaires "
              className="nav-link  font-italic"
              style={{ color: "#a7abb7" }}
            >
              
              <i className="fa fa-pie-chart mr-3  fa-fw"></i>Absences par stagiaires
            </Link>
          </li>
        </ul>
        
        <p className="text-info font-weight-bold text-uppercase px-3 small pt-4 pb-2 mb-0 border-bottom ">
          
          <i className="fa fa-sliders" aria-hidden="true"></i> Gestions des
          Stagiaires
        </p>
        <ul
          className="nav flex-column  mb-0 "
          style={{ backgroundColor: "#28324f" }}
        >
          <li className="nav-item">
            <Link
              to="/stagiaires"
              className="nav-link  font-italic"
              style={{ color: "#a7abb7" }}
            >
              <i className="fa fa-address-card mr-3  fa-fw"></i> Liste des
              Stagiaires
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/stagiaires/add"
              className="nav-link  font-italic"
              style={{ color: "#a7abb7" }}
            >
              
              <i className="fa fa-user-plus mr-3  fa-fw"></i> Ajouter Stagiaire
            </Link>
          </li>
        </ul>
        <p className="text-info font-weight-bold text-uppercase px-3 small pt-4 pb-2 mb-0 border-bottom">
          
          <i className="fa fa-sliders" aria-hidden="true"></i> Gestions des Absences
        </p>
        <ul
          className="nav flex-column  mb-0"
          style={{ backgroundColor: "#28324f" }}
        >
          <li className="nav-item">
            <Link
              to="/absences"
              className="nav-link  font-italic"
              style={{ color: "#a7abb7" }}
            >
              
              <i className="fa fa-calendar mr-3  fa-fw"></i> Liste des Absences
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/absences/add"
              className="nav-link  font-italic"
              style={{ color: "#a7abb7" }}
            >
              <i className="fa fa-calendar-plus-o mr-3  fa-fw"></i> Ajouter Absence
            </Link>
          </li>
        </ul>
      </div>

    </div>
  );
};
export default Sidebar;
